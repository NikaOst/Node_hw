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
    const allTasks = await Task.find();
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

// Пользователи могут захотеть отфильтровать свои задачи по статусу (например,
// "в процессе", "выполнено") или дате создания (например, задачи, созданные сегодня,
//  за последнюю неделю и т.д.).

// - Фильтрация по статусу: Мы можем добавить параметр запроса (`query parameter`),
// который позволяет пользователю указать статус задач, которые он хочет видеть
// (например, `?status=in progress`).

// - Фильтрация по дате: Также можно добавить параметры для фильтрации по дате создания
// задачи. Например, можно искать задачи, созданные после определённой даты
// (`?startDate=2024-09-01`) или до определённой даты (`?endDate=2024-09-04`).

// Всё это мы будем передавать через параметры запроса (`query parameters`), чтобы гибко
// фильтровать задачи.
