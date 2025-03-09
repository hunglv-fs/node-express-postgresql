# Express API Logging System Documentation

This document explains the logging system implemented in this Express.js application.

## Overview

The application uses Winston, a versatile logging library for Node.js, to implement a comprehensive logging system that includes:

- Console logging (with colorized output)
- File-based logging (segregated by log levels)
- HTTP request logging
- Error logging
- Uncaught exception and unhandled promise rejection handling

## Logger Configuration

### Log Files

The logging system creates a `logs` directory with the following log files:

- `combined.log`: Contains all logs regardless of level
- `error.log`: Contains only error-level logs
- `exceptions.log`: Records uncaught exceptions
- `rejections.log`: Records unhandled promise rejections

### Log Levels

The application uses different log levels based on the environment:
- Production: 'info' level and above
- Development: 'debug' level and above

The available log levels (in order of severity) are:
- error
- warn
- info
- http
- verbose
- debug
- silly

## Components

### 1. Logger Module (`utils/logger.js`)

This is the core logger module configured with Winston. It:
- Creates the logs directory if it doesn't exist
- Defines log formats (with timestamps)
- Sets up transport mechanisms (console and files)
- Configures exception handlers

### 2. Logger Middleware (`middleware/loggerMiddleware.js`)

The middleware module provides:

- `requestLogger`: Logs HTTP request information
  - Logs when a request starts
  - Logs when a request completes (with duration and status code)

- `errorLogger`: Handles and logs errors
  - Captures error messages and stack traces
  - Returns appropriate HTTP response

### 3. Server Integration

The server integrates the logging system by:
- Adding the request logger middleware
- Adding the error logger middleware
- Setting up global exception handlers
- Using the logger instead of console.log

## Usage Examples

### Basic Usage

```javascript
const logger = require('./utils/logger');

// Log messages at different levels
logger.error('This is an error message');
logger.warn('This is a warning message');
logger.info('This is an informational message');
logger.debug('This is a debug message');
```

### Example Log Output

```
2023-05-25 14:30:45 [INFO]: 🚀 Server running at http://localhost:5000
2023-05-25 14:31:02 [INFO]: Incoming GET request to /api/products
2023-05-25 14:31:02 [INFO]: GET /api/products 200 - 45ms
2023-05-25 14:31:15 [ERROR]: Error: Product not found
```

## Benefits

- **Centralized Logging**: All logs are managed through a single system
- **Structured Format**: Logs include timestamps and severity levels
- **Performance Monitoring**: Request duration is tracked
- **Error Tracking**: All errors are captured with stack traces
- **Production-Ready**: Different log levels for different environments