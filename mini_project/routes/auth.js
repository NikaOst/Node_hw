import express from 'express';
import { getDB } from '../db/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const authRouter = express.Router();

// Registration
// POST http://127.0.0.1:3333/auth/register
authRouter.post('/register', async (req, res) => {
  try {
    const db = getDB();
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json('Username, email and password are required!');
    }

    const existUser = await db.collection('users').findOne({ email });
    if (existUser) return res.status(409).json('User with this email already exist!');

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await db
      .collection('users')
      .insertOne({ username, email, password: hashPassword });
    res.status(201).json({ status: 'success', body: { id: user.insertedId, email } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: 'Internal server error' });
  }
});

// Authorithation
// POST http://127.0.0.1:3333/auth/login
authRouter.post('/login', async (req, res) => {
  try {
    const db = getDB();

    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json('Email and password are required!');

    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return res.status(401).json('Invalid email or password');
    }

    const equelPasswords = await bcrypt.compare(password, user.password);
    if (!equelPasswords) {
      return res.status(401).json('Invalid email or password');
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );

    res.status(200).json({ token: token });
  } catch (error) {
    res.status(500).json({ error, message: 'Internal server error' });
  }
});

export default authRouter;
