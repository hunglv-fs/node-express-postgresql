const ProductModel = require('../models/productModel');
const validateProduct = require('../validations/productValidation');


const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.getAll();
    res.json(products);
  } catch (err) {
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
    res.status(201).json(newProduct);

  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: 'Add product is error' });
  }
};

module.exports = { getAllProducts, createProduct };
