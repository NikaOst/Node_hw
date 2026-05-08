import express, { json } from 'express';
import connection from './setup.js';

const app = express();
const port = 3334;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  try {
    res.send('Hello, World!');
  } catch (error) {
    next(error);
  }
});
app.post('/', (req, res) => {
  if (req.body) {
    const { email, username } = req.body;
    if (email && username) {
      return res.json({
        status: 'success',
        message: 'hello',
      });
    } else
      return res.json({
        status: 'unsuccess',
        message: 'Введите данные о пользователе',
      });
  } else {
    return res.json({
      status: 'unsuccess',
      message: 'Введите данные о пользователе',
    });
  }
});
app.get('/products', (req, res) => {
  const getAllProducts = `SELECT * FROM products;`;
  connection.query(getAllProducts, (err, results) => {
    if (err) {
      console.error('Error creating products table:', err.stack);
      return res.status(500).json({ status: 'error', message: 'Error by products fetching data' });
    }
    return res.json(results);
  });
});

app.post('/products', (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.json({ status: 'unsuccess', message: 'Введите данные о товаре' });
  }
  const sendProduct = `INSERT INTO products (name, price) VALUES (?, ?);`;
  connection.query(sendProduct, [name, price], (err, results) => {
    if (err) {
      console.error('Error inserting product:', err.stack);
      return res.status(500).json({ status: 'error', message: 'Error by sending product data' });
    }
    return res.json({
      status: 'success',
      message: 'Продукт создан',
      id: results.insertId,
    });
  });
});

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Маршрут не найден',
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://127.0.0.1:${port}`);
});
