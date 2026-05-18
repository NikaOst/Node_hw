import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authenticateJWT from './middleware/auth.js';
import authorizeRole from './middleware/authorizeRole.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3334;

app.use(express.json());

const users = [
  {
    id: '1',
    username: 'Anna',
    email: 'user1@gmail.com',
    password: await bcrypt.hash('123456', 10),
    role: 'admin',
  },
  {
    id: '2',
    username: 'Max',
    email: 'user2@gmail.com',
    password: await bcrypt.hash('0000000', 10),
    role: 'manager',
  },
];

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = users.find((user) => user.email === email);
    if (!user) {
      return res.status(404).json({ message: 'Email or password is invalid' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(404).json({ message: 'Email or password is invalid' });

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      },
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/update-email', authenticateJWT, (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(401).json({ message: 'Email can not be empty' });

    const user = req.user;
    if (!user) return res.status(401).json({ message: 'User not found' });

    users.forEach((u) => {
      if (u.id === user.userId) {
        u.email = email;
      }
    });

    res.status(201).json({ message: 'User email was updated', data: users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/delete-account', authenticateJWT, (req, res) => {
  const user = users.find((user) => user.id === req.user.userId);
  if (!user) return res.status(401).json({ message: 'User not found' });

  const usersArray = users.filter((u) => u.id !== user.id);
  res.status(201).json({ message: 'User was deleted', data: usersArray });
});

app.put('/update-role', authenticateJWT, authorizeRole('admin'), (req, res) => {
  const { userId, role } = req.body;

  if (!userId || !role) return res.status(401).json({ message: 'Role or user id cannot be empty' });

  const user = users.find((u) => u.id === userId);
  if (!user) return res.status(401).json({ message: 'User not found' });

  users.forEach((u) => {
    if (u.id === userId) {
      u.role = role;
    }
  });
  res.status(201).json({ message: 'User was updated', data: users });
});

app.get('/refresh-token', authenticateJWT, (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
        const user = req.user;
        const token = jwt.sign(
          { userId: user.id, email: user.email, role: user.role, username: user.username },
          process.env.JWT_SECRET,
          {
            expiresIn: '1h',
          },
        );
        res.json({ token });
      });
    } else {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://127.0.0.1:${port}`);
});
