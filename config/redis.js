const redis = require('redis');
const { promisify } = require('util');
const logger = require('../utils/logger');

// Create Redis client
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || 'redis',
  port: process.env.REDIS_PORT || 6379,
  retry_strategy: function(options) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      logger.error('❌ Redis :: connection refused');
    }
    // Retry after 5 seconds
    return Math.min(options.attempt * 1000, 3000);
  },
});

redisClient.on('error', err => {
  logger.error('❌ Redis :: Client Error', err);
});

redisClient.on('connect', () => {
  logger.info('✅ Redis :: client connected');
});

// Promisify Redis commands
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);
const delAsync = promisify(redisClient.del).bind(redisClient);
const flushAllAsync = promisify(redisClient.flushall).bind(redisClient);

module.exports = {
  redisClient,
  getAsync,
  setAsync,
  delAsync,
  flushAllAsync,
};