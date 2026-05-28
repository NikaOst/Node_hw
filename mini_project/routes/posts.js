import express from 'express';
const postsRouter = express.Router();
import jwt from 'jsonwebtoken';
import authenticateJWT from '../middleware/auth.js';
import { getDB } from '../db/index.js';

// Fetch posts
// GET http://127.0.0.1:3333/posts/
postsRouter.get('/', async (req, res) => {
  try {
    const db = getDB();
    const posts = await db.collection('posts').find({}).toArray();
    res.status(200).json({ posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create post
// POST http://127.0.0.1:3333/posts/
postsRouter.post('/', authenticateJWT, async (req, res) => {
  try {
    const db = getDB();

    const { title, description } = req.body;
    if (!title) return res.status(401).json('Title is required!');

    const user = req.user;

    const post = await db
      .collection('posts')
      .insertOne({ author: user.userId, title, description });

    res.status(201).json({ message: `Post with id ${post.insertedId} was created!` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Fetch post by ID
// GET http://127.0.0.1:3333/posts/:id
postsRouter.get('/:id', (req, res) => {});

// Update post
// PUT http://127.0.0.1:3333/posts/:id
postsRouter.put('/:id', (req, res) => {});

// Delete post
// DELETE http://127.0.0.1:3333/posts/:id
postsRouter.delete('/:id', (req, res) => {});

export default postsRouter;
