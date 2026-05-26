import express from 'express';
const postsRouter = express.Router();

// Fetch posts
// GET http://127.0.0.1:3333/posts/
postsRouter.get('/', (req, res) => {});

// Fetch post by ID
// GET http://127.0.0.1:3333/posts/:id
postsRouter.get('/:id', (req, res) => {});

// Create post
// POST http://127.0.0.1:3333/posts/
postsRouter.post('/', (req, res) => {});

// Update post
// PUT http://127.0.0.1:3333/posts/:id
postsRouter.put('/:id', (req, res) => {});

// Delete post
// DELETE http://127.0.0.1:3333/posts/:id
postsRouter.delete('/:id', (req, res) => {});

export default postsRouter;
