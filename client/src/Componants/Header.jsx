import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('JWT_Token');
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className='header'>
      <div className='left-header'>
        <Link to="/">Task Management</Link>
      </div>
      <div className='right-header'>
        <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
