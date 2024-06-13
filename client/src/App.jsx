import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Header from './Componants/Header'
import TaskPage from './pages/TaskPage'
import Login from './Componants/Login'
import Register from './Componants/Register'
import './App.css'
import LoggedIn from './pages/LoggedIn'
import CreateTaskPage from './pages/CreateTaskPage'

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={< HomePage />} />
        <Route path='/loggedIn' element={< LoggedIn />} />
        <Route path='/task/:id' element={< TaskPage />} />
        <Route path='/login' element={< Login />} />
        <Route path='/register' element={< Register />} />
        <Route path='/create-task' element={< CreateTaskPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App