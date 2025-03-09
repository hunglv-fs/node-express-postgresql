const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const productRoutes = require('./routes/productRoutes');
const logger = require('./utils/logger');
const { requestLogger, errorLogger } = require('./middleware/loggerMiddleware');

const app = express();

// Apply middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(requestLogger); // Log all incoming requests

// Routes
app.use('/api', productRoutes);

// Error handling middleware (should be after routes)
app.use(errorLogger);

// Uncaught exception handling
process.on('uncaughtException', err => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`🚀 Server running at http://localhost:${PORT}`);
});