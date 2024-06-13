import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';

const TaskDetails = ({ match, history }) => {
    const [task, setTask] = useState(null);

    useEffect(() => {
      const getTask = async () => {
        const { data } = await fetchTask(match.params.id);
        setTask(data);
      };
      getTask();
    }, [match.params.id]);
  
    const handleSave = () => {
      history.push('/');
    };
  
    return (
      <div>
        {task ? <TaskForm task={task} onSave={handleSave} /> : 'Loading...'}
      </div>
    );
}

export default TaskDetails


