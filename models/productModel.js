const client = require('../config/db');

const ProductModel = {
  getAll: async () => {
    const result = await client.query('SELECT * FROM products');
    return result.rows;
  },

  create: async (name, price) => {
    const result = await client.query(
      'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
      [name, price],
    );
    return result.rows[0];
  },
};

module.exports = ProductModel;
