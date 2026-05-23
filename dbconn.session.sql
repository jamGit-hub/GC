USE GCtables;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
     email VARCHAR(255) UNIQUE NOT NULL
);
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    platform VARCHAR(255),
    region VARCHAR(255),
    image_url TEXT
);
CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    quantity INT DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_price DECIMAL(10, 2) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
INSERT INTO products (name, price, platform, region, image_url)
VALUES (
        'Netflix SAR 10 Gift Card',
        100.00,
        'Netflix',
        'KSA',
        'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'
    ),
    (
        'Netflix SAR 150 Gift Card',
        150.00,
        'Netflix',
        'KSA',
        'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'
    ),
    (
        'Netflix SAR 300 Gift Card',
        300.00,
        'Netflix',
        'KSA',
        'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'
    ),
    (
        'Netflix $25 Gift Card',
        105.00,
        'Netflix',
        'USA',
        'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'
    ),
    (
        'Netflix AED 100 Gift Card',
        102.40,
        'Netflix',
        'UAE',
        'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'
    ),