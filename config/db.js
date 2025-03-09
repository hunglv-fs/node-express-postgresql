const { Client } = require('pg');
require('dotenv').config();
const logger = require('../utils/logger');
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

client.connect()
  .then(() => logger.info('✅ PostgreSQL :: connected success!'))
  .catch(err => logger.error('❌ PostgreSQL:: connect error', err));

module.exports = client;
