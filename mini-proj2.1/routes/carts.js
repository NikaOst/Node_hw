import express from 'express';
import Product from '../models/Product.js';

const cartRouter = express.Router();

// GET http://localhost:3333/api/cart
cartRouter.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Cannot fetch products', error: error.message });
  }
});

// POST http://localhost:5000/api/cart
cartRouter.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ product });
  } catch (error) {
    res.status(500).json({ message: 'Cannot create a new product', error: error.message });
  }
});

// PUT http://localhost:5000/api/cart/:id
cartRouter.put('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: 'Cannot update a product', error: error.message });
  }
});

// DELETE http://localhost:5000/api/cart/:id
cartRouter.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product was deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Cannot delete a product', error: error.message });
  }
});

export default cartRouter;
