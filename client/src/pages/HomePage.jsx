import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/server/tasks/getAllTask', { withCredentials: true });
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
      }
    };

    fetchTasks();
  }, []);


  return (
    <div className='task-box'>
      <div className='color'>
        <div className='green'>
            <h1>Highest Priority</h1>
        </div>
        <div className='orange'>
            <h1>Medium Priority</h1>
        </div>
        <div className='red'>
            <h1>Low Priority</h1>
        </div>
     </div>
      
      <h1>Tasks</h1>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <div className='particuler-task'>
              <span className='left-task' style={{ color: getPriorityColor(task.priority) }}>
                {task.title} - {task.status} - {task.dueDate}
              </span>
              <div className='right-button'>
                <Link to={`/task/${task._id}`}>
                  <button>Read more</button>
              </Link>
              </div>

            </div>
          </li>
        ))}
      </ul>
      <h1>If You Want To Create New Task! Please Login First</h1>
    </div>
  );
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'low':
      return 'green';
    case 'medium':
      return 'orange';
    case 'high':
      return 'red';
    default:
      return 'black';
  }
};

export default HomePage;
