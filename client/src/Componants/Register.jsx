import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const [FormData, setFormData] = useState({username: '', password: ''})
    const [error, setError] = useState('')
    const Navigate = useNavigate();


    const handleChange = (e)=>{
        setFormData({ ...FormData, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const response = await axios.post('http://localhost:3000/server/users/register', FormData, { withCredentials: true });
        console.log(response.data); // handle successful registration if needed
        Navigate('/login');
      };
  return (
    <div>
      <div className='signup'>
        <h1>Register</h1>

        <div className='signup-box' >
          <div className='register-form' >
            <form onSubmit={handleSubmit}>
                
            <div class="form-group">
                <label htmlFor='username'>
                 <i class="zmdi zmdi-account"></i>
                </label>
                <input type="text" name='username' onChange={handleChange} placeholder='Username' class="form-control" required/>
            </div>

            <div class="form-group">
                <label htmlFor='password'>
                 <i class="zmdi zmdi-email"></i>
                </label>
                <input type="password" name='password' onChange={handleChange} placeholder='Password' class="form-control" required/>
            </div>

            <button className='signup-btn'>Register</button>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
           
           </form>
          </div>

          <div className='image'>
             <img src="/signup logo.jpg" alt="" />
             <Link to="/login">
              <p>Already have account, login here!</p>
             </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register