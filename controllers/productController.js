const ProductModel = require('../models/productModel');
const validateProduct = require('../validations/productValidation');
const { invalidateCache } = require('../utils/cacheUtils');
const { getAsync, setAsync } = require('../config/redis');
const logger = require('../utils/logger');


const getAllProducts = async (req, res) => {
  try {
    const cacheKey = 'products:all';
    
    // Try to get data from Redis cache first
    const cachedProducts = await getAsync(cacheKey);
    
    if (cachedProducts) {
      logger.info('Retrieved products from Redis cache');
      return res.json(JSON.parse(cachedProducts));
    }
    
    // If not in cache, get from database
    const products = await ProductModel.getAll();
    
    // Store in Redis cache with expiration of 5 minutes (300 seconds)
    const cacheDuration = parseInt(process.env.CACHE_DURATION) || 300;
    await setAsync(cacheKey, JSON.stringify(products), 'EX', cacheDuration);
    logger.info(`Stored products in Redis cache for ${cacheDuration} seconds`);
    
    res.json(products);
  } catch (err) {
    logger.error('Error in getAllProducts:', err);
    res.status(500).json({ error: err.message });
  }
};

const createProduct = async (req, res) => {
  const lang = req.headers['accept-language'] || 'vi'; // Default 'vi'
  const { error } = validateProduct(req.body, lang);

  if (error) {
    return res.status(400).json({
      errors: error.details.map(err => err.message),
    });
  }

  const { name, price } = req.body;

  try { 
    const newProduct = await ProductModel.create(name, price);
    
    // Invalidate the products list cache after creating a new product
    await invalidateCache('/products');
    // Also invalidate our direct Redis cache key
    await invalidateCache('products:all');
    
    res.status(201).json(newProduct);

  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: 'Add product is error' });
  }
};

module.exports = { getAllProducts, createProduct };