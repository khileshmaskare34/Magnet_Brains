import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        status: '',
        priority: 'low' // Assuming default priority
    });
    const [editingTaskId, setEditingTaskId] = useState(null); // Track which task is being edited

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:3000/server/tasks', { withCredentials: true });
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/server/tasks/${id}`, { withCredentials: true });
            setTasks(tasks.filter(task => task._id !== id));
        } catch (error) {
            console.error('Error deleting task:', error.message);
        }
    };

    const handleUpdate = async (id) => {
        try {
            const updatedTask = await axios.put(`http://localhost:3000/server/tasks/${id}`, formData, { withCredentials: true });
            console.log('Updated task:', updatedTask.data);
            setTasks(tasks.map(task => task._id === id ? updatedTask.data : task));
            setEditingTaskId(null); 
            
        } catch (error) {
            console.error('Error updating task:', error.message);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEdit = (task) => {
        setFormData({
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            status: task.status,
            priority: task.priority
        });
        setEditingTaskId(task._id);
    };

    const handleCancelEdit = () => {
        setFormData({
            title: '',
            description: '',
            dueDate: '',
            status: '',
            priority: 'low'
        });
        setEditingTaskId(null);
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'low':
                return 'red';
            case 'medium':
                return 'orange';
            case 'high':
                return 'green';
            default:
                return 'black'; // Default color if priority is not recognized
        }
    };

    return (
        <div className='task-list'>
            <h1>Existing Tasks</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        {editingTaskId === task._id ? (
                            <>
                               
                                <div class="form-group">
                                  <label htmlFor='title'>
                                  <i class="zmdi zmdi-account"></i>
                                  </label>
                                  <input type="text" name='title' value={formData.title} onChange={handleChange} placeholder="Title" class="form-control" required/>
                                </div>

                                <div class="form-group">
                                  <label htmlFor='dueDate'>
                                  <i class="zmdi zmdi-account"></i>
                                  </label>
                                  <input type="date" name='dueDate' value={formData.dueDate} onChange={handleChange} class="form-control" required/>
                                </div>

                                <div class="form-group">
                                  <select class="form-control" name="status" value={formData.status} onChange={handleChange}>
                                    <option value="pending">pending</option>
                                    <option value="completed">completed</option>
                                    <option value="reject">reject</option>
                                  </select>
                                </div>

                                <div class="form-group">
                                  <select name="priority" value={formData.priority} onChange={handleChange}>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                  </select>
                                </div>

                                <button className='signup-btn' onClick={() => handleUpdate(task._id)}>Save</button>
                                <button  onClick={handleCancelEdit}>Cancel</button>
                            </>
                        ) : (
                            <div className='particuler-task'>
                                <span className='left-task' style={{ color: getPriorityColor(task.priority) }}>
                                  {task.title}-
                                  {task.status}-
                                  {task.dueDate}
                                </span>
                                <div className='right-button'>
                                  <button  onClick={() => handleEdit(task)}>Edit</button>
                                  <button  onClick={() => handleDelete(task._id)}>Delete</button>

                                   {/* Use Link to navigate to detailed view */}
                                    <Link to={`/task/${task._id}`}>
                                        <button>Read more</button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
