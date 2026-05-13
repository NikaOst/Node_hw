import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import { where } from 'sequelize';
import User from './models/User.js';
import { use } from 'react';

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 3334;

app.get('/users', async (req, res, next) => {
  try {
    const { limit, offset, isActive } = req.query;

    const where = {};
    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    const users = await User.findAll({
      where,
      limit: Number(limit),
      offset: Number(offset),
    });

    res.send(users);
  } catch (error) {
    next(error);
  }
});

app.get('/users/:id', async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const user = await User.findByPk(userId);

    if (!user) return res.status(404).json({ message: 'No such user' });

    res.send(user);
  } catch (error) {
    next(error);
  }
});

app.post('/users', async (req, res, next) => {
  try {
    const { name, email, age } = req.body;

    if (!name || !email || !age) {
      return res.status(400).json({ message: 'name, email or age is empty!' });
    }

    const numAge = Number(age);
    if (!Number.isInteger(numAge) || numAge < 18 || numAge > 120) {
      return res.status(400).json({ message: 'age must be integer and from 18 to 120' });
    }
    const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regEmail.test(email)) {
      return res.status(400).json({ message: 'invalid type of email' });
    }

    const newUser = await User.create({
      name: name,
      email: email,
      age: numAge,
      isActive: false,
    });
    return res.send(newUser);
  } catch (error) {
    next(error);
  }
});

app.put('/users/:id', async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const { name, email, age } = req.body;
    if (!name || !email || !age) {
      return res.status(400).json({ message: 'name, email or age is empty!' });
    }

    const numAge = Number(age);
    if (!Number.isInteger(numAge) || numAge < 18 || numAge > 120) {
      return res.status(400).json({ message: 'age must be integer and from 18 to 120' });
    }
    const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regEmail.test(email)) {
      return res.status(400).json({ message: 'invalid type of email' });
    }
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'no such user' });

    user.name = name;
    user.email = email;
    user.age = age;
    await user.save();
    return res.send(user);
  } catch (error) {
    next(error);
  }
});

app.patch('/users/:id', (req, res) => {
  // PATCH /users/:id – частичное обновление
  const userId = req.params.id;
  // Обновляет только переданные поля
  res.send('Hello, Sequelize with Express!');
});

app.delete('/users/:id', (req, res) => {
  // DELETE /users/:id – удаление пользователя
  const userId = req.params.id;
  res.send('Hello, Sequelize with Express!');
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
