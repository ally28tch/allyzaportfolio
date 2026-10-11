<?php
header('Content-Type: text/html; charset=utf-8');
ini_set('display_errors', '0');
require __DIR__ . '/config.php';
while (ob_get_level() > 0) ob_end_flush();

$rows = [];
function row(&$rows, $label, $ok, $detail) { $rows[] = [$label, $ok, $detail]; }

row($rows, 'PHP is running', true, 'PHP ' . PHP_VERSION);
row($rows, 'PDO MySQL extension', extension_loaded('pdo_mysql'), extension_loaded('pdo_mysql') ? 'Loaded' : 'Missing: enable extension=pdo_mysql in php.ini and restart Apache');
row($rows, 'mbstring extension', extension_loaded('mbstring'), extension_loaded('mbstring') ? 'Loaded' : 'Missing: enable extension=mbstring in php.ini and restart Apache');
row($rows, 'Opened through http://', true, (isset($_SERVER['HTTP_HOST']) ? 'http://' . $_SERVER['HTTP_HOST'] : '') . htmlspecialchars($_SERVER['REQUEST_URI'] ?? ''));

try {
    $pdo = db();
    row($rows, 'MySQL connection', true, 'Connected to "' . DB_NAME . '"');
    foreach (['products', 'orders', 'order_items', 'messages'] as $t) {
        try {
            $n = (int)$pdo->query("SELECT COUNT(*) FROM `$t`")->fetchColumn();
            row($rows, 'Table ' . $t, true, $n . ' row(s)');
        } catch (Throwable $e) {
            row($rows, 'Table ' . $t, false, 'Missing: import database.sql in phpMyAdmin');
        }
    }
} catch (Throwable $e) {
    row($rows, 'MySQL connection', false, $e instanceof DbSetupError ? $e->getMessage() : 'Could not connect: ' . $e->getMessage());
}

$root = dirname(__DIR__);
$home = file_exists($root . '/index.html') ? 'index.html' : (file_exists($root . '/index.htm') ? 'index.htm' : 'index.html');
$admin = file_exists($root . '/admin.html') ? 'admin.html' : (file_exists($root . '/admin.htm') ? 'admin.htm' : 'admin.html');
row($rows, 'Site page found', file_exists($root . '/' . $home), file_exists($root . '/' . $home) ? $home : 'index.html or index.htm is not in the folder next to php');
row($rows, 'Admin page found', file_exists($root . '/' . $admin), file_exists($root . '/' . $admin) ? $admin : 'admin.html or admin.htm is not in the folder next to php');

$stale = [
    ['script.js', 'loadAvailability'],
    ['style.css', 'soldout-badge'],
    ['admin.js', 'loadProducts'],
];
foreach ($stale as $s) {
    $f = $root . '/' . $s[0];
    $fresh = file_exists($f) && strpos((string)file_get_contents($f), $s[1]) !== false;
    row($rows, $s[0] . ' version', $fresh, $fresh ? 'Latest' : 'OLD VERSION. Replace ' . $s[0] . ' in this folder with the newest one');
}
row($rows, 'php/products.php', file_exists(__DIR__ . '/products.php'), file_exists(__DIR__ . '/products.php') ? 'Found' : 'Missing: add products.php to the php folder');

$allOk = true;
foreach ($rows as $r) if (!$r[1]) $allOk = false;
?><!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Setup Check</title>
<style>
body{font-family:system-ui,Segoe UI,Arial,sans-serif;background:#0B0F2A;color:#fff;margin:0;padding:2rem 1rem}
main{max-width:640px;margin:0 auto}
h1{margin:0 0 .3rem}
.banner{padding:.8rem 1rem;border-radius:10px;margin:1rem 0;font-weight:600}
.good{background:rgba(70,192,138,.2);border:1px solid #46c08a}
.bad{background:rgba(255,138,122,.18);border:1px solid #ff8a7a}
table{width:100%;border-collapse:collapse}
td{padding:.6rem .5rem;border-bottom:1px solid rgba(255,255,255,.15);vertical-align:top}
td:first-child{white-space:nowrap;font-weight:600}
.ok{color:#46c08a}.no{color:#ff8a7a}
a{color:#FFB257}
</style></head><body><main>
<h1>Setup Check</h1>
<p>Quick test that XAMPP, PHP and MySQL are working for this site.</p>
<div class="banner <?= $allOk ? 'good' : 'bad' ?>"><?= $allOk ? 'Everything is working. The shop, contact form and admin page are ready.' : 'Something needs fixing. Read the red lines below.' ?></div>
<table>
<?php foreach ($rows as $r): ?>
<tr><td><?= htmlspecialchars($r[0]) ?></td><td class="<?= $r[1] ? 'ok' : 'no' ?>"><?= $r[1] ? '&#10003; ' : '&#10007; ' ?><?= htmlspecialchars($r[2]) ?></td></tr>
<?php endforeach; ?>
</table>
<p style="margin-top:1.5rem"><a href="../<?= $home ?>">Open the site</a> &middot; <a href="../<?= $admin ?>">Open the admin page</a></p>
</main></body></html>
