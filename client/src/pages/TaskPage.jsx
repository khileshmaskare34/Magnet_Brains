import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams hook

const TaskDetail = () => {
    const { id } = useParams(); // Use useParams hook to get the id from the URL
    const [task, setTask] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/server/tasks/${id}`, { withCredentials: true });
                setTask(response.data);
            } catch (error) {
                console.error('Error fetching task details:', error.message);
            }
        };

        if (id) {
            fetchTask();
        }
    }, [id]);

    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <div className='signup'>
          <h1>Task</h1>
            <h2>Title: {task.title}</h2>
            <p className='t-p'> <h3> Description:</h3> {task.description}</p>
            <p className='t-p'> <h3> Due Date:</h3> {task.dueDate}</p>
            <p className='t-p'> <h3>Status:  </h3>{task.status}</p>
            <p className='t-p'> <h3> Priority: </h3>{task.priority}</p>
            {/* Add more details as needed */}
        </div>
    );
};

export default TaskDetail;
