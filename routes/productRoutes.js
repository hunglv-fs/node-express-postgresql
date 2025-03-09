const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct } = require('../controllers/productController');

router.get('/products', getAllProducts);
router.post('/products', createProduct);

module.exports = router;
