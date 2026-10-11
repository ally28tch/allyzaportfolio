<?php
require __DIR__ . '/config.php';

session_set_cookie_params(['httponly' => true, 'samesite' => 'Lax']);
session_start();

$action = $_GET['action'] ?? '';
$isPost = $_SERVER['REQUEST_METHOD'] === 'POST';

if ($isPost && ($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '') !== 'fetch') {
    fail('Bad request.', 400);
}

/* AUTH */
if ($action === 'login' && $isPost) {
    $in = read_json();
    $okUser = hash_equals(ADMIN_USER, (string)($in['username'] ?? ''));
    $okPass = hash_equals(ADMIN_PASSWORD, (string)($in['password'] ?? ''));
    if ($okUser && $okPass) {
        session_regenerate_id(true);
        $_SESSION['admin'] = true;
        json_out(['success' => true]);
    }
    usleep(400000);
    fail('Incorrect username or password.', 401);
}

if ($action === 'logout' && $isPost) {
    $_SESSION = [];
    session_destroy();
    json_out(['success' => true]);
}

if ($action === 'me') {
    json_out(['success' => true, 'logged_in' => !empty($_SESSION['admin'])]);
}

if (empty($_SESSION['admin'])) {
    fail('Please log in.', 401);
}

try {
    $pdo = db();

    /* DASHBOARD COUNTS */
    if ($action === 'stats') {
        $row = $pdo->query(
            "SELECT
               COUNT(*) AS orders_total,
               COALESCE(SUM(is_seen = 0), 0) AS orders_new,
               COALESCE(SUM(has_digital = 1 AND order_status IN ('new','processing')), 0) AS digital_to_send,
               COALESCE(SUM(CASE WHEN order_status <> 'cancelled' THEN total END), 0) AS sales_total,
               COALESCE(SUM(CASE WHEN order_status <> 'cancelled' AND payment_status = 'paid' THEN total END), 0) AS sales_paid
             FROM orders"
        )->fetch();
        $by = ['new' => 0, 'processing' => 0, 'completed' => 0, 'cancelled' => 0];
        foreach ($pdo->query('SELECT order_status, COUNT(*) AS n FROM orders GROUP BY order_status') as $r) {
            $by[$r['order_status']] = (int)$r['n'];
        }
        $row['by_status'] = $by;
        $row['unread_messages'] = (int)$pdo->query('SELECT COUNT(*) FROM messages WHERE is_read = 0')->fetchColumn();
        $row['latest_order_id'] = (int)$pdo->query('SELECT COALESCE(MAX(id), 0) FROM orders')->fetchColumn();
        json_out(['success' => true, 'stats' => $row]);
    }

    /* ORDERS: list */
    if ($action === 'orders') {
        $where = [];
        $args = [];

        $status = $_GET['status'] ?? '';
        if (in_array($status, ['new', 'processing', 'completed', 'cancelled'], true)) {
            $where[] = 'o.order_status = ?';
            $args[] = $status;
        }
        $type = $_GET['type'] ?? '';
        if ($type === 'digital') $where[] = 'o.has_digital = 1';
        if ($type === 'physical') $where[] = 'o.has_physical = 1';
        if (($_GET['active'] ?? '') === '1') $where[] = "o.order_status IN ('new','processing')";
        if (($_GET['unseen'] ?? '') === '1') $where[] = 'o.is_seen = 0';
        if (($_GET['digital_pending'] ?? '') === '1') $where[] = "o.has_digital = 1 AND o.order_status IN ('new','processing')";

        $q = trim($_GET['q'] ?? '');
        if ($q !== '') {
            $where[] = '(o.order_code LIKE ? OR o.customer_name LIKE ? OR o.email LIKE ? OR o.contact_number LIKE ?)';
            $like = '%' . $q . '%';
            array_push($args, $like, $like, $like, $like);
        }

        $limit = max(1, min(200, (int)($_GET['limit'] ?? 100)));
        $sql = "SELECT o.id, o.order_code, o.customer_name, o.email, o.contact_number, o.payment_method,
                       o.payment_status, o.order_status, o.has_physical, o.has_digital, o.total, o.is_seen, o.created_at,
                       (SELECT GROUP_CONCAT(CONCAT(i.product_name, IF(i.design IS NULL, '', CONCAT(' (Design ', i.design, ')')), ' x', i.quantity) SEPARATOR ', ')
                          FROM order_items i WHERE i.order_id = o.id) AS items
                FROM orders o"
             . ($where ? ' WHERE ' . implode(' AND ', $where) : '')
             . ' ORDER BY o.id DESC LIMIT ' . $limit;
        $stmt = $pdo->prepare($sql);
        $stmt->execute($args);
        json_out(['success' => true, 'orders' => $stmt->fetchAll()]);
    }

    /* ORDERS: one order (marks it as seen) */
    if ($action === 'order') {
        $id = (int)($_GET['id'] ?? 0);
        $stmt = $pdo->prepare('SELECT * FROM orders WHERE id = ?');
        $stmt->execute([$id]);
        $order = $stmt->fetch();
        if (!$order) fail('Order not found.', 404);

        $pdo->prepare('UPDATE orders SET is_seen = 1 WHERE id = ?')->execute([$id]);
        $stmt = $pdo->prepare('SELECT product_id, product_name, design, unit_price, quantity FROM order_items WHERE order_id = ?');
        $stmt->execute([$id]);
        json_out(['success' => true, 'order' => $order, 'items' => $stmt->fetchAll()]);
    }

    /* ORDERS: update status */
    if ($action === 'order_update' && $isPost) {
        $in = read_json();
        $id = (int)($in['id'] ?? 0);
        $os = $in['order_status'] ?? '';
        $ps = $in['payment_status'] ?? '';
        if (!in_array($os, ['new', 'processing', 'completed', 'cancelled'], true)) fail('Invalid order status.');
        if (!in_array($ps, ['pending', 'paid'], true)) fail('Invalid payment status.');
        $notes = clean($in['admin_notes'] ?? '', 2000);

        $pdo->beginTransaction();
        $cur = $pdo->prepare('SELECT order_status FROM orders WHERE id = ?');
        $cur->execute([$id]);
        $old = $cur->fetchColumn();
        if ($old === false) { $pdo->rollBack(); fail('Order not found.', 404); }

        /* Cancelling puts the items back in stock; un-cancelling takes them out again */
        if (($old === 'cancelled') !== ($os === 'cancelled')) {
            $items = $pdo->prepare('SELECT product_id, quantity FROM order_items WHERE order_id = ?');
            $items->execute([$id]);
            $qtyBy = [];
            foreach ($items->fetchAll() as $it) {
                $qtyBy[(int)$it['product_id']] = ($qtyBy[(int)$it['product_id']] ?? 0) + (int)$it['quantity'];
            }
            foreach ($qtyBy as $pid => $q) {
                if ($os === 'cancelled') {
                    $pdo->prepare('UPDATE products SET stock = stock + ? WHERE id = ? AND stock IS NOT NULL')->execute([$q, $pid]);
                } else {
                    $take = $pdo->prepare('UPDATE products SET stock = stock - ? WHERE id = ? AND stock IS NOT NULL AND stock >= ?');
                    $take->execute([$q, $pid, $q]);
                    $has = $pdo->prepare('SELECT stock FROM products WHERE id = ?');
                    $has->execute([$pid]);
                    $stock = $has->fetchColumn();
                    if ($stock !== null && $take->rowCount() < 1) {
                        $pdo->rollBack();
                        fail('Not enough stock to re-open this order. Add stock in the Products tab first.');
                    }
                }
            }
        }

        $stmt = $pdo->prepare('UPDATE orders SET order_status = ?, payment_status = ?, admin_notes = ?, is_seen = 1 WHERE id = ?');
        $stmt->execute([$os, $ps, $notes, $id]);
        $pdo->commit();
        json_out(['success' => true]);
    }

    /* PRODUCTS: list */
    if ($action === 'products') {
        $rows = $pdo->query('SELECT id, name, type, price, designs, stock, sold_out FROM products ORDER BY type DESC, id ASC')->fetchAll();
        json_out(['success' => true, 'products' => $rows]);
    }

    /* PRODUCTS: sold-out toggle and stock changes */
    if ($action === 'product_update' && $isPost) {
        $in = read_json();
        $id = (int)($in['id'] ?? 0);
        $stmt = $pdo->prepare('SELECT id, type, stock FROM products WHERE id = ?');
        $stmt->execute([$id]);
        $p = $stmt->fetch();
        if (!$p) fail('Product not found.', 404);

        if (array_key_exists('sold_out', $in)) {
            $pdo->prepare('UPDATE products SET sold_out = ? WHERE id = ?')->execute([!empty($in['sold_out']) ? 1 : 0, $id]);
        }
        if (isset($in['stock_add']) || isset($in['stock_set'])) {
            if ($p['stock'] === null) fail('Digital products do not have stock.');
            if (isset($in['stock_set'])) {
                $n = (int)$in['stock_set'];
                if ($n < 0 || $n > 1000000) fail('Please enter a stock number from 0 to 1,000,000.');
                $pdo->prepare('UPDATE products SET stock = ? WHERE id = ?')->execute([$n, $id]);
            } else {
                $n = (int)$in['stock_add'];
                if ($n < 1 || $n > 1000000) fail('Please enter how many to add (1 or more).');
                $pdo->prepare('UPDATE products SET stock = stock + ? WHERE id = ?')->execute([$n, $id]);
            }
        }
        json_out(['success' => true]);
    }

    /* MESSAGES */
    if ($action === 'messages') {
        $where = ($_GET['filter'] ?? '') === 'unread' ? 'WHERE is_read = 0' : '';
        $rows = $pdo->query("SELECT id, name, email, message, is_read, created_at FROM messages $where ORDER BY id DESC LIMIT 200")->fetchAll();
        json_out(['success' => true, 'messages' => $rows]);
    }

    if ($action === 'message_update' && $isPost) {
        $in = read_json();
        $pdo->prepare('UPDATE messages SET is_read = ? WHERE id = ?')
            ->execute([!empty($in['is_read']) ? 1 : 0, (int)($in['id'] ?? 0)]);
        json_out(['success' => true]);
    }

    if ($action === 'message_delete' && $isPost) {
        $in = read_json();
        $pdo->prepare('DELETE FROM messages WHERE id = ?')->execute([(int)($in['id'] ?? 0)]);
        json_out(['success' => true]);
    }

    fail('Unknown action.', 404);
} catch (Throwable $e) {
    db_fail($e, 'load the data');
}
