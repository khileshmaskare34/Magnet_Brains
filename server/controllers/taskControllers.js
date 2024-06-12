const Task = require('../models/task');

exports.createTask = async (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  try {
    const task = new Task({ title, description, dueDate, priority, user: req.user.id });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Error creating task' });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ dueDate: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching tasks' });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching task' });
  }
};

exports.updateTask = async (req, res) => {
  const { title, description, dueDate, status, priority } = req.body;
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    task.status = status;
    task.priority = priority;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Error updating task' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    await task.remove();
    res.status(200).json({ message: 'Task removed' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting task' });
  }
};
