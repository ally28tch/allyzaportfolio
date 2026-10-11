<?php
require __DIR__ . '/config.php';

try {
    $rows = db()->query('SELECT id, stock, sold_out FROM products')->fetchAll();
    $out = [];
    foreach ($rows as $r) {
        $out[] = [
            'id' => (int)$r['id'],
            'sold_out' => ((int)$r['sold_out'] === 1) || ($r['stock'] !== null && (int)$r['stock'] <= 0),
        ];
    }
    json_out(['success' => true, 'products' => $out]);
} catch (Throwable $e) {
    db_fail($e, 'load the products');
}
