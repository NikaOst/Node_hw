import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Category from './models/Category.js';
import Product from './models/Product.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const dbURI = process.env.MONGO_URI || 'uri';

app.use(express.json());

// Добавление категорий
app.post('/categories', async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.status(201).send(category);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Добавление продуктов
app.post('/products', async (req, res) => {
  try {
    const { category, name, price } = req.body;
    const product = await Product.create({ category, name, price });
    res.status(201).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Использование populate
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

startServer();
async function startServer() {
  try {
    await mongoose.connect(dbURI);
    console.log('Connected to DB!');
    app.listen(port, () => {
      console.log(`Server is running at http://127.0.0.1:${port}`);
    });
  } catch (error) {
    console.log('Error by connecting to server or DB!', error);
  }
}
