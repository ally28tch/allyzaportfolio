<?php
/* Database and admin settings (XAMPP defaults) */
const DB_HOST = '127.0.0.1';
const DB_NAME = 'allyza_portfolio';
const DB_USER = 'root';
const DB_PASS = '';

const ADMIN_USER = 'allyzaaclan';
const ADMIN_PASSWORD = 'allyza2006';

date_default_timezone_set('Asia/Manila');

/* Keep every response clean JSON: no PHP warnings printed into the page */
ob_start();
ini_set('display_errors', '0');
error_reporting(E_ALL);

class DbSetupError extends RuntimeException {}

function json_out($data, $status = 200) {
    while (ob_get_level() > 0) ob_end_clean();
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function fail($message, $status = 400) {
    json_out(['success' => false, 'message' => $message], $status);
}

set_exception_handler(function ($e) {
    error_log('Uncaught: ' . $e->getMessage());
    fail('Server error. Open http://localhost/allyza/php/check.php to see what is wrong.', 500);
});

register_shutdown_function(function () {
    $err = error_get_last();
    if ($err && in_array($err['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR], true)) {
        error_log('Fatal: ' . $err['message']);
        while (ob_get_level() > 0) ob_end_clean();
        if (!headers_sent()) {
            http_response_code(500);
            header('Content-Type: application/json; charset=utf-8');
        }
        echo json_encode(['success' => false, 'message' => 'Server error. Open http://localhost/allyza/php/check.php to see what is wrong.']);
    }
});

function db() {
    static $pdo = null;
    if ($pdo !== null) return $pdo;

    if (!extension_loaded('pdo_mysql')) {
        throw new DbSetupError('PHP is missing the pdo_mysql extension. Open XAMPP > Apache > Config > php.ini and make sure "extension=pdo_mysql" is not commented out, then restart Apache.');
    }

    try {
        $pdo = new PDO(
            'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]
        );
        $pdo->exec("SET time_zone = '+08:00'");
        ensure_schema($pdo);
    } catch (PDOException $e) {
        $code = (int)$e->getCode();
        if ($code === 1049) throw new DbSetupError('The database "' . DB_NAME . '" does not exist. Import database.sql in phpMyAdmin.');
        if ($code === 1045) throw new DbSetupError('MySQL refused the login. Check DB_USER and DB_PASS in php/config.php.');
        if ($code === 2002 || $code === 2006) throw new DbSetupError('MySQL is not running. Start MySQL in the XAMPP Control Panel.');
        throw $e;
    }
    return $pdo;
}

/* Keeps the products table complete: adds the stock columns to an older table and refills missing products */
function ensure_schema($pdo) {
    try {
        if (!$pdo->query("SHOW COLUMNS FROM products LIKE 'stock'")->fetch()) {
            $pdo->exec('ALTER TABLE products ADD COLUMN stock INT NULL DEFAULT NULL, ADD COLUMN sold_out TINYINT(1) NOT NULL DEFAULT 0');
            $pdo->exec("UPDATE products SET stock = 100 WHERE type = 'physical'");
        }
        if ((int)$pdo->query('SELECT COUNT(*) FROM products')->fetchColumn() < 6) {
            $pdo->exec("INSERT IGNORE INTO products (id, name, type, price, designs, max_qty, stock) VALUES
                (1, '32mm Button Pins', 'physical', 20.00, 32, 99, 100),
                (2, 'Cute Memo Pads', 'physical', 20.00, 0, 100, 100),
                (3, 'Phone Charms', 'physical', 45.00, 4, 100, 100),
                (4, 'Plushie Keychains', 'physical', 50.00, 9, 100, 100),
                (5, 'BT21 Coloring Book', 'digital', 150.00, 0, 99, NULL),
                (6, 'Ready-to-Print Button Pin Designs', 'digital', 10.00, 8, 99, NULL)");
        }
    } catch (PDOException $e) {
        if ($e->getCode() !== '42S02') throw $e;
    }
}

/* Turns a caught exception into a clear JSON error */
function db_fail($e, $what = 'save this') {
    if ($e instanceof DbSetupError) fail($e->getMessage(), 500);
    error_log($what . ': ' . $e->getMessage());
    if ($e instanceof PDOException && $e->getCode() === '42S02') {
        fail('The tables are missing. Import database.sql in phpMyAdmin.', 500);
    }
    fail('The server could not ' . $what . '. Open http://localhost/allyza/php/check.php to see what is wrong.', 500);
}

function read_json() {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function require_post() {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        fail('Method not allowed.', 405);
    }
}

function clean($value, $max) {
    $value = is_string($value) ? trim($value) : '';
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F]/', '', $value);
    return mb_substr($value, 0, $max);
}
