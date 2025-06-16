const express = require('express');
const router = express.Router();
const Product = require('../models/products.js');

router.post('/products', async (req, res) => {

  try {

    const newProduct = new Product(req.body);

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);

  } catch (err) {

    res.status(400).json({ message: err.message });
  }
});

router.get('/products', async (req, res) => {

  try {
    const products = await Product.find();

    res.json(products);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }

});

module.exports = router;
