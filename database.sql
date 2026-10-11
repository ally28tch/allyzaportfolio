-- Allyza portfolio shop: import this file in phpMyAdmin (Import tab).
-- Safe to re-import: existing orders and messages are kept.

CREATE DATABASE IF NOT EXISTS allyza_portfolio
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE allyza_portfolio;

-- PRODUCTS (ids must match SHOP_PRODUCTS in script.js)
CREATE TABLE IF NOT EXISTS products (
  id        INT UNSIGNED NOT NULL PRIMARY KEY,
  name      VARCHAR(120) NOT NULL,
  type      ENUM('physical','digital') NOT NULL,
  price     DECIMAL(10,2) NOT NULL,
  designs   INT UNSIGNED NOT NULL DEFAULT 0,
  max_qty   INT UNSIGNED NOT NULL DEFAULT 99,
  stock     INT NULL DEFAULT NULL,
  sold_out  TINYINT(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB;

INSERT INTO products (id, name, type, price, designs, max_qty, stock) VALUES
  (1, '32mm Button Pins',                    'physical', 20.00,  32, 99,  100),
  (2, 'Cute Memo Pads',                      'physical', 20.00,   0, 100, 100),
  (3, 'Phone Charms',                        'physical', 45.00,   4, 100, 100),
  (4, 'Plushie Keychains',                   'physical', 50.00,   9, 100, 100),
  (5, 'BT21 Coloring Book',                  'digital', 150.00,   0, 99,  NULL),
  (6, 'Ready-to-Print Button Pin Designs',   'digital',  10.00,   8, 99,  NULL)
ON DUPLICATE KEY UPDATE
  name = VALUES(name), type = VALUES(type), price = VALUES(price),
  designs = VALUES(designs), max_qty = VALUES(max_qty);

-- ORDERS
CREATE TABLE IF NOT EXISTS orders (
  id                 INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  order_code         VARCHAR(24) NOT NULL UNIQUE,
  customer_name      VARCHAR(100) NOT NULL,
  email              VARCHAR(150) NOT NULL,
  contact_number     VARCHAR(30) NOT NULL,
  address            VARCHAR(255) NOT NULL DEFAULT '',
  notes              VARCHAR(500) NOT NULL DEFAULT '',
  payment_method     ENUM('GCash','Maya','COD') NOT NULL,
  payment_reference  VARCHAR(40) NOT NULL DEFAULT '',
  payment_status     ENUM('pending','paid') NOT NULL DEFAULT 'pending',
  order_status       ENUM('new','processing','completed','cancelled') NOT NULL DEFAULT 'new',
  has_physical       TINYINT(1) NOT NULL DEFAULT 0,
  has_digital        TINYINT(1) NOT NULL DEFAULT 0,
  total              DECIMAL(10,2) NOT NULL,
  is_seen            TINYINT(1) NOT NULL DEFAULT 0,
  admin_notes        TEXT NULL,
  created_at         DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at         DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (order_status),
  INDEX idx_created (created_at)
) ENGINE=InnoDB;

-- ORDER ITEMS
CREATE TABLE IF NOT EXISTS order_items (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  order_id      INT UNSIGNED NOT NULL,
  product_id    INT UNSIGNED NOT NULL,
  product_name  VARCHAR(120) NOT NULL,
  design        INT UNSIGNED NULL,
  unit_price    DECIMAL(10,2) NOT NULL,
  quantity      INT UNSIGNED NOT NULL,
  CONSTRAINT fk_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- CONTACT MESSAGES
CREATE TABLE IF NOT EXISTS messages (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(150) NOT NULL,
  message     TEXT NOT NULL,
  is_read     TINYINT(1) NOT NULL DEFAULT 0,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_read (is_read)
) ENGINE=InnoDB;
