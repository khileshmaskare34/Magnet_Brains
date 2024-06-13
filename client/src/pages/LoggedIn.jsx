import React from 'react'
import { useNavigate } from 'react-router-dom';
import TaskList from '../Componants/TaskList';


const LoggedIn = () => {
    const Navigate = useNavigate();

    const handleCreateTask = () => {
        Navigate('/create-task');
    };

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
    
    <button onClick={handleCreateTask}>Create New Task</button>
    <TaskList />
    </div>
  )
}

export default LoggedIn