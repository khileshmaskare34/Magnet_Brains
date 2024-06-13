const Task = require('../models/task');

// Task creation api
exports.createTask = async (req, res) => {
  const { title, description, dueDate, status, priority } = req.body;
  try {
    const userId = req.user.userId;
    const task = new Task({ title, description, dueDate, status, priority, user: userId });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Error creating task' });
  }
};

// geting the data
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId }).sort({ dueDate: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching tasks' });
  }
};

// geting the task behalf of dynamic id
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

// geting all task form database Task
exports.getAllTask = async (req, res) => {
  try {
    const task = await Task.find({});
    console.log("task", task)
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching task' });
  }
};

// api for Update Teask
exports.updateTask = async (req, res) => {
  console.log("udt")
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

// api for deletion of task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    await task.deleteOne();
    res.status(200).json({ message: 'Task removed' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting task' });
  }
};

