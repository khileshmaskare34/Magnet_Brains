import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [FormData, setFormData] = useState({username: '', password: ''})
    const [error, setError] = useState('');
    const Navigate = useNavigate();

    const handleChange = (e)=>{
        setFormData({ ...FormData, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        console.log(e)
        try {
            const response = await axios.post('http://localhost:3000/server/users/login', FormData, { withCredentials: true });

            Navigate('/loggedIn');
        } catch (error) {
          console.error('Error registering:', error);
          if (error.response && error.response.data && error.response.data.error) {
            setError(error.response.data.error);
          } else {
            setError('An unexpected error occurred.');
          }
        }
      };
  return (
    <div>
    <div className='signup'>
      <h1>Login</h1>

      <div className='signup-box' >
        <div className='register-form' >
          <form onSubmit={handleSubmit}>
              
          <div class="form-group">
              <label htmlFor='username'>
               <i class="zmdi zmdi-account"></i>
              </label>
              <input type="text" name='username' value={FormData.username} onChange={handleChange} placeholder='Username' class="form-control" required/>
          </div>

          <div class="form-group">
              <label htmlFor='password'>
               <i class="zmdi zmdi-email"></i>
              </label>
              <input type="password" name='password' value={FormData.password} onChange={handleChange} placeholder='Password' class="form-control" required/>
          </div>

          <button className='signup-btn'>Login</button>
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
         
         </form>
        </div>

        <div className='image'>
           <img src="/signin logo.png" alt="" />
           <Link to="/register">
            <p>Don't have account, click here!</p>
           </Link>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login