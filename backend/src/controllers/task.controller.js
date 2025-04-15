const Task = require('../models/task.model');

exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = await Task.create({
      userId: req.userId,
      title,
      description,
    });
    res.status(201).json(task);
  } catch {
    res.status(400).json({ error: 'Failed to create task' });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, isCompleted } = req.body;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { title, description, isCompleted },
      { new: true }
    );
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch {
    res.status(400).json({ error: 'Failed to update task' });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Task.findOneAndDelete({ _id: id, userId: req.userId });
    if (!result) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};
