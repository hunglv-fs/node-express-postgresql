CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

INSERT INTO products (name, price) VALUES ('iPhone 15', 999.99);
INSERT INTO products (name, price) VALUES ('MacBook Pro', 1999.99);
