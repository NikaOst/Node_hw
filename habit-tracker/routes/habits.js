import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Habit from '../models/Habit.js';
import authenticateJWT from '../middleware/auth.js';
import Progress from '../models/Progress.js';

const habitsRouter = express.Router();

// Маршрут POST /habits — создаёт новую привычку. Принимает название, категорию, сложность.
habitsRouter.post('/', authenticateJWT, async (req, res) => {
  try {
    const user = req.user;
    const { name, category, difficulty } = req.body;
    const habit = await Habit.create({ userId: user.userId, name, category, difficulty });
    res.status(201).json({ status: 'success', body: habit });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Маршрут GET /habits — возвращает список всех привычек.
habitsRouter.get('/', authenticateJWT, async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user.userId });
    res.status(200).json({ habits });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Маршрут GET /habits/:id — возвращает привычку по её идентификатору.
habitsRouter.get('/:id', authenticateJWT, async (req, res) => {
  try {
    const habitId = req.params.id;
    const habit = await Habit.findOne({ _id: habitId, userId: req.user.userId });
    res.status(200).json({ habit });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Маршрут PUT /habits/:id — обновляет данные привычки.
habitsRouter.put('/:id', authenticateJWT, async (req, res) => {
  try {
    const habitId = req.params.id;
    const data = req.body;
    const habit = await Habit.findOneAndUpdate({ _id: habitId, userId: req.user.userId }, data, {
      runValidators: true,
      new: true,
    });
    res.status(200).json({ habit });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Маршрут DELETE /habits/:id — удаляет привычку.
habitsRouter.delete('/:id', authenticateJWT, async (req, res) => {
  try {
    const habitId = req.params.id;
    const deletedRaws = await Habit.findOneAndDelete({ _id: habitId, userId: req.user.userId });
    if (!deletedRaws) {
      return res.status(400).json('Error by deleting the habit');
    }
    res.status(200).json('The habit was deleted');
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

habitsRouter.post('/habits/:id/complete', async (req, res) => {
  try {
    const habitId = req.params.id;
    const habit = await Habit.findById(habitId);
    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }
    const { mood, notes } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 00:00
    const existing = await Progress.findOne({
      habitId: habit._id,
      data: {
        $gte: today,
        $lt: new Date(today.getTime() + 86400000),
      },
    });
    if (existing) {
      return res.status(400).json({ error: 'Habit already completed today' });
    }
    const progress = await Progress.create({
      habitId: habit._id,
      data: today,
      completed: true,
      notes,
      mood,
    });
    // streak ++
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1); // 00:00 yesterday
    const yesterdayProgress = await Progress.findOne({
      habitId: habit._id,
      data: {
        $gte: yesterday,
        $lt: today,
      },
    });
    if (yesterdayProgress && yesterdayProgress.completed) {
      habit.streak += 1;
    } else {
      habit.streak = 1;
    }
    // totalCompletion
    habit.totalCompletion += 1;
    if (habit.streak > habit.bestStreak) {
      habit.bestStreak = habit.streak;
    }
    habit.save();
    res.json({ success: true, data: { habit, progress } });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export default habitsRouter;
