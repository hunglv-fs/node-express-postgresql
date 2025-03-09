const logger = require('../utils/logger');

// Middleware to log all requests
const requestLogger = (req, res, next) => {
  const startTime = new Date();
  
  // Log when request comes in
  logger.info(`Incoming ${req.method} request to ${req.originalUrl}`);
  
  // Once request is finished
  res.on('finish', () => {
    const duration = new Date() - startTime;
    logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  
  next();
};

// Error handling middleware
const errorLogger = (err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  logger.error(err.stack);
  
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
};

module.exports = {
  requestLogger,
  errorLogger,
};