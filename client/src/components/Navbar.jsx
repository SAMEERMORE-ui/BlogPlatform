import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar fade-in">
      <div>
        <Link to="/" className="navbar-brand">BlogPlatform</Link>
      </div>
      <div className="nav-links">
        {user ? (
          <>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/post/new" className="btn btn-primary primary-gradient btn-small">Create Post</Link>
            <button onClick={handleLogout} className="btn btn-outline btn-small">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="btn btn-primary primary-gradient btn-small">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
