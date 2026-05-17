import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import Book from './models/Book.js';

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 3334;

app.get('/books', async (req, res, next) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
});

app.post('/books', async (req, res, next) => {
  try {
    const { title, author, year } = req.body;

    if (!title || !author || !year) {
      return res.status(400).json({ message: 'title, author or year is empty!' });
    }
    const newBook = await Book.create({
      title: title,
      author: author,
      year: year,
    });
    return res.send(newBook);
  } catch (error) {
    next(error);
  }
});

app.put('/books/:id', async (req, res) => {
  try {
    const bookId = Number(req.params.id);
    const { title, author, year } = req.body;
    if (!title || !author || !year) {
      return res.status(400).json({ message: 'title, author or year is empty!' });
    }

    const book = await Book.findByPk(bookId);
    if (!book) return res.status(404).json({ message: 'no such book' });

    await book.update({ title, author, year });
    return res.send(book);
  } catch (error) {
    next(error);
  }
});

app.delete('/books/:id', async (req, res, next) => {
  try {
    const bookId = Number(req.params.id);
    const book = await Book.findByPk(bookId);
    if (!book) return res.status(404).json({ message: 'no such book' });

    await book.destroy();
    return res.json({ message: 'book was deleted' });
  } catch (error) {
    next(error);
  }
});

app.use((req, res) => {
  res.status(404).json({ message: 'route not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'server error' });
});

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the databasa established successfully.');
    console.log(`Server is runnning at http://127.0.0.1:${port}`);
  } catch (error) {
    console.error('Unable to connect to the databasa:', error);
  }
});
