-- DB作成
CREATE DATABASE bank_db WITH ENCODING 'UTF-8';

-- 作成したDBに接続
\c bank_db;

-- 古いテーブルを削除
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS transactions;

-- 顧客テーブル作成
-- 顧客テーブル作成（平文パスワードを保存）
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(15),
    address TEXT,
    password VARCHAR(255) NOT NULL,  -- 平文のパスワードを保存
    created_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- 口座テーブル作成
CREATE TABLE accounts (
    account_id SERIAL PRIMARY KEY,
    account_number VARCHAR(20) UNIQUE NOT NULL,
    account_type VARCHAR(50) NOT NULL,
    balance DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    customer_id INT REFERENCES customers(customer_id),
    created_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 取引履歴テーブル作成
CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    account_id INT REFERENCES accounts(account_id),
    transaction_type VARCHAR(50) NOT NULL,  -- 例: 'deposit', 'withdrawal', 'transfer'
    amount DECIMAL(15, 2) NOT NULL,
    transaction_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    balance_after DECIMAL(15, 2) NOT NULL
);

-- 初期データ挿入
INSERT INTO customers (first_name, last_name, email, phone_number, address, password) 
VALUES 
    ('Admin', 'User', '', '123-456-7890', '123 Main St', 'admin123'),
    ('John', 'Doe', 'john.doe@example.com', '123-456-7890', '456 Elm St', 'password123');


-- 初期データ挿入: 口座
INSERT INTO accounts (account_number, account_type, balance, customer_id) 
VALUES 
    ('1001', 'Checking', 1000.00, 1),
    ('1002', 'Saving', 2000.00, 2),
    ('1003', 'Checking', 1500.00, 3),
    ('1004', 'Saving', 3000.00, 4);

-- 初期データ挿入: 取引履歴
INSERT INTO transactions (account_id, transaction_type, amount, balance_after) 
VALUES 
    (1, 'deposit', 500.00, 1500.00),
    (2, 'withdrawal', 200.00, 1800.00),
    (3, 'transfer', 300.00, 1200.00),
    (4, 'deposit', 1000.00, 4000.00);
