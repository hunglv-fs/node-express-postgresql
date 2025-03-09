const { delAsync } = require('../config/redis');
const logger = require('./logger');

/**
 * Invalidate cache for a specific API endpoint
 * @param {string} path - API path to invalidate (without the /api prefix)
 */
const invalidateCache = async path => {
  try {
    const key = `api:${path.startsWith('/') ? path : '/' + path}`;
    await delAsync(key);
    logger.info(`Cache invalidated for ${key}`);
    return true;
  } catch (error) {
    logger.error('Cache invalidation error:', error);
    return false;
  }
};

/**
 * Invalidate cache for multiple API endpoints that match a pattern
 * @param {string} pattern - Pattern to match API paths
 */
const invalidateCachePattern = async pattern => {
  try {
    // We need to manually find keys matching the pattern and delete them
    // This is a simple implementation - in real-world scenarios, consider using SCAN
    const { redisClient } = require('../config/redis');
    redisClient.keys(`api:${pattern}*`, async (err, keys) => {
      if (err) {
        logger.error('Error finding keys to invalidate:', err);
        return false;
      }
      
      if (keys && keys.length > 0) {
        await Promise.all(keys.map(key => delAsync(key)));
        logger.info(`Cache invalidated for ${keys.length} keys matching pattern: ${pattern}`);
        return true;
      }
      
      logger.info(`No keys found matching pattern: ${pattern}`);
      return true;
    });
  } catch (error) {
    logger.error('Cache pattern invalidation error:', error);
    return false;
  }
};

module.exports = {
  invalidateCache,
  invalidateCachePattern,
};