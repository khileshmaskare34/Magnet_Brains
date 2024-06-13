// src/pages/CreateTaskPage.js
import React from 'react';
import TaskForm from '../Componants/TaskForm';
import { useNavigate } from 'react-router-dom';

function CreateTaskPage() {
  const Navigate = useNavigate();

  const handleSave = () => {
    Navigate('/loggedIn');
  };

  return (
    <div className='main'>
      <TaskForm onSave={handleSave} />
    </div>
  );
}

export default CreateTaskPage;
