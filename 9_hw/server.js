import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import User from './models/User.js';
import bcrypt from 'bcrypt';

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 3334;

app.post('/register', async (req, res, next) => {
  try {
    const { name, role, age, email, password, mustChangePassword } = req.body;
    if (!name || !role || !age || !email || !password) {
      return res.json({ message: 'name, role, age, email, password are required' });
    }
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      return res.status(400).json({ message: 'such user already exist' });
    }

    const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regEmail.test(email)) {
      return res.status(400).json({ message: 'invalid type of email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      role,
      age,
      email,
      mustChangePassword: mustChangePassword ? true : false,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next) => {
  req.user = { id: 6 };
  next();
});
const mustChangePasswordMiddleware = async (req, res, next) => {
  const userId = req.user.id;
  const user = await User.findByPk(userId);

  if (req.path === '/change-password') {
    return next();
  }

  if (user && user.mustChangePassword) {
    return res.status(403).json({ message: 'redirect to http://127.0.0.1:3333/change-password' });
  }
  next();
};
app.use(mustChangePasswordMiddleware);

app.post('/change-password', async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    user.password = hashedPassword;
    user.mustChangePassword = false;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

app.post('/delete-account', async (req, res, next) => {
  try {
    const { password } = req.body;
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      return res.status(401).json({ message: 'incorrect password' });
    }
    await user.destroy();
    res.status(200).json({ message: 'user was deleted' });
  } catch (error) {
    next(error);
  }
});

app.post('/change-email', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    const userByEmail = await User.findOne({ where: { email: email } });
    if (userByEmail) {
      return res.status(401).json({ message: 'this email is already in use' });
    }

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      return res.status(401).json({ message: 'incorrect password' });
    }

    const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regEmail.test(email)) {
      return res.status(400).json({ message: 'invalid type of email' });
    }

    user.email = email;
    await user.save();
    res.status(201).json({ message: 'user was updated' });
  } catch (error) {
    next(error);
  }
});

const isAdminMiddleware = async (req, res, next) => {
  const userId = req.user.id;
  const user = await User.findByPk(userId);

  if (!user || user.role !== 'admin') {
    return res.status(403).json({ message: 'denied access' });
  }
  next();
};
app.get('/admin', isAdminMiddleware, async (req, res, next) => {
  try {
    res.status(200).json({ message: 'you are admin!' });
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
