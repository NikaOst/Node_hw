import Task from '../models/Task.js';

export const createTask = async (req, res) => {
  try {
    const userId = req.user.userId;
    const newTask = await Task.create({ ...req.body, user: userId });
    res.status(201).json({ newTask });
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'Internal server error' });
  }
};
export const getTask = async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;
    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }
    const allTasks = await Task.find(filter);
    res.status(200).json({ allTasks });
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'Internal server error' });
  }
};
export const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!task) return res.status(404).json({ message: 'Задачи с таким id не найдено' });
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'Internal server error' });
  }
};
export const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ message: 'Задачи с таким id не найдено' });
    res.status(200).json({ message: 'Задача была удалена' });
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'Internal server error' });
  }
};
