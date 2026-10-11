<?php
require __DIR__ . '/config.php';
require_post();

$in = read_json();

$name    = clean($in['name'] ?? '', 100);
$email   = clean($in['email'] ?? '', 150);
$message = clean($in['message'] ?? '', 2000);

if (mb_strlen($name) < 2) fail('Please enter your name.');
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) fail('Please enter a valid email address.');
if (mb_strlen($message) < 5) fail('Please write a message.');

try {
    db()->prepare('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)')
        ->execute([$name, $email, $message]);
    json_out(['success' => true]);
} catch (Throwable $e) {
    db_fail($e, 'save the message');
}
