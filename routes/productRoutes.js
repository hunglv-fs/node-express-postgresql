const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct } = require('../controllers/productController');
const { cache } = require('../middleware/cacheMiddleware');

// Apply cache middleware to GET routes with duration from env or default to 300 seconds
const cacheDuration = parseInt(process.env.CACHE_DURATION) || 300;
router.get('/products', cache(cacheDuration), getAllProducts);
router.post('/products', createProduct);

module.exports = router;