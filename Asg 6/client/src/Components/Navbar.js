import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/schedule-email">Schedule Email</Link>
        <div className="user-icon">User Icon</div>
      </div>
    </nav>
  );
};

export default Navbar;
