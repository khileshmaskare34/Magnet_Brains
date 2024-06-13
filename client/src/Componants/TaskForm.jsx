import axios from 'axios';
import React, { useState } from 'react';

const TaskForm = ({task, onSave}) => {


    const [formData, setFormData] = useState(task || { title: '', description: '', dueDate: '', status: 'pending', priority: 'low' });

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (task) {
        await axios.put(`http://localhost:3000/server/tasks/${task._id}`, formData, { withCredentials: true });
      } else {
        await axios.post('http://localhost:3000/server/tasks/', formData, { withCredentials: true });

      }
      onSave();
    };

  return (
  <div className='signup'>
    <h1>Create Task</h1>
    <div className='signup-box' >
     <div className='register-form' >
      <form onSubmit={handleSubmit}>

          <div class="form-group">
            <label htmlFor='title'>
            <i class="zmdi zmdi-account"></i>
            </label>
            <input type="text" name='title' value={formData.title} onChange={handleChange} placeholder="Title" class="form-control" required/>
          </div>

          <div class="form-group">
            <label htmlFor='description'>
            <i class="zmdi zmdi-account"></i>
            </label>
            <input type="text" name='description' value={formData.description} onChange={handleChange} placeholder="Description" class="form-control" required/>
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

          <button className='signup-btn' type="submit">Submit</button>
      </form>
     </div>
    </div>
  </div>
  )
}

export default TaskForm