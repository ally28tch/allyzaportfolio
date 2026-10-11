<?php
require __DIR__ . '/config.php';
require_post();

$in = read_json();

$name    = clean($in['customer_name'] ?? '', 100);
$email   = clean($in['email'] ?? '', 150);
$contact = clean($in['contact_number'] ?? '', 30);
$address = clean($in['address'] ?? '', 255);
$notes   = clean($in['notes'] ?? '', 500);
$method  = $in['payment_method'] ?? '';
$ref     = clean($in['payment_reference'] ?? '', 40);
$items   = $in['items'] ?? [];

if (mb_strlen($name) < 2) fail('Please enter your full name.');
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) fail('Please enter a valid email address.');
$digits = preg_replace('/\D/', '', $contact);
if (strlen($digits) < 10 || strlen($digits) > 13) fail('Please enter a valid contact number.');
if (!in_array($method, ['GCash', 'Maya', 'COD'], true)) fail('Please choose a mode of payment.');
if (!is_array($items) || count($items) < 1 || count($items) > 30) fail('Your order is empty.');

try {
    $pdo = db();
    $products = [];
    foreach ($pdo->query('SELECT * FROM products') as $row) {
        $products[(int)$row['id']] = $row;
    }

    $lines = [];
    $need = [];
    $total = 0;
    $hasPhysical = 0;
    $hasDigital = 0;

    foreach ($items as $item) {
        $pid = (int)($item['product_id'] ?? 0);
        $qty = (int)($item['quantity'] ?? 0);
        if (!isset($products[$pid])) fail('One of the products is no longer available.');
        $p = $products[$pid];
        if ((int)$p['sold_out'] === 1) fail($p['name'] . ' is sold out. Please remove it from your order.');

        if ($qty < 1 || $qty > (int)$p['max_qty']) fail('Invalid quantity for ' . $p['name'] . '.');

        $design = null;
        if ((int)$p['designs'] > 0) {
            $design = (int)($item['design'] ?? 0);
            if ($design < 1 || $design > (int)$p['designs']) fail('Please choose a design for ' . $p['name'] . '.');
        }

        $price = (float)$p['price'];
        $total += $price * $qty;
        if ($p['type'] === 'digital') $hasDigital = 1; else $hasPhysical = 1;

        $lines[] = [$pid, $p['name'], $design, $price, $qty];
        $need[$pid] = ($need[$pid] ?? 0) + $qty;
    }

    if ($hasDigital && $method === 'COD') fail('Digital products can only be paid through GCash / Maya.');
    if ($method !== 'COD' && !preg_match('/^[A-Za-z0-9 \-]{6,40}$/', $ref)) fail('Please enter a valid payment reference number.');
    if ($method === 'COD') $ref = '';
    if ($hasPhysical && mb_strlen($address) < 8) fail('Please enter your complete address.');
    if (!$hasPhysical) $address = '';

    $pdo->beginTransaction();

    $take = $pdo->prepare('UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?');
    foreach ($need as $pid => $qty) {
        $p = $products[$pid];
        if ($p['stock'] === null) continue;
        $take->execute([$qty, $pid, $qty]);
        if ($take->rowCount() < 1) {
            $pdo->rollBack();
            $left = max(0, (int)$p['stock']);
            fail($left > 0 ? 'Only ' . $left . ' left of ' . $p['name'] . '. Please lower the quantity.' : $p['name'] . ' is sold out. Please remove it from your order.');
        }
    }

    $stmt = $pdo->prepare(
        'INSERT INTO orders (order_code, customer_name, email, contact_number, address, notes,
                             payment_method, payment_reference, has_physical, has_digital, total)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute([
        'TMP' . bin2hex(random_bytes(8)), $name, $email, $contact, $address, $notes,
        $method, $ref, $hasPhysical, $hasDigital, $total,
    ]);
    $orderId = (int)$pdo->lastInsertId();
    $code = 'AA-' . str_pad((string)$orderId, 5, '0', STR_PAD_LEFT);
    $pdo->prepare('UPDATE orders SET order_code = ? WHERE id = ?')->execute([$code, $orderId]);

    $itemStmt = $pdo->prepare(
        'INSERT INTO order_items (order_id, product_id, product_name, design, unit_price, quantity)
         VALUES (?, ?, ?, ?, ?, ?)'
    );
    foreach ($lines as $l) {
        $itemStmt->execute([$orderId, $l[0], $l[1], $l[2], $l[3], $l[4]]);
    }

    $pdo->commit();
    json_out(['success' => true, 'order_code' => $code, 'total' => $total]);
} catch (Throwable $e) {
    if (isset($pdo) && $pdo->inTransaction()) $pdo->rollBack();
    db_fail($e, 'save the order');
}
