const { getAsync, setAsync } = require('../config/redis');
const logger = require('../utils/logger');

/**
 * Middleware to cache API responses
 * @param {number} duration - Cache duration in seconds
 */
const cache = duration => {
  return async (req, res, next) => {
    // Skip caching for non-GET requests
    if (req.method !== 'GET') {
      return next();
    }

    // Create a cache key based on the URL path
    const key = `api:${req.originalUrl}`;
    
    try {
      // Check if the response exists in cache
      const cachedResponse = await getAsync(key);
      
      if (cachedResponse) {
        logger.info(`Cache hit for ${key}`);
        const parsedResponse = JSON.parse(cachedResponse);
        return res.json(parsedResponse);
      }
      
      // If not cached, modify res.json to cache the response before sending
      const originalJson = res.json;
      res.json = function(data) {
        // Store in cache
        setAsync(key, JSON.stringify(data), 'EX', duration)
          .then(() => {
            logger.info(`Cached ${key} for ${duration} seconds`);
          })
          .catch(err => {
            logger.error(`Error caching ${key}:`, err);
          });
          
        // Restore original json method and return response
        res.json = originalJson;
        return originalJson.call(this, data);
      };
      
      next();
    } catch (error) {
      logger.error('Cache error:', error);
      // Continue without caching if there's an error
      next();
    }
  };
};

module.exports = {
  cache,
};