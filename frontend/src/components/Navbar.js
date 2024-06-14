// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';

const Navbar = ({ isLoggedIn, logout, isAdmin}) => {
  console.log(isAdmin)

  return (
    <div className="navContainer">
      <nav className="navbar">
        <div className="logo-container">
          <h1 className="nav-link"><Link to="/" className="logo">My Tree</Link></h1>
        </div>
        <ul className="nav-links">
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/dashboard" className="nav-link">Arbre</Link>
              </li>
              {isAdmin ? (
                <li>
                  <Link to="/admin" className='nav-link'>Admin</Link>
                </li>
              ) : (<></>)}
              <li>
                <Link to="/" onClick={logout} className="nav-link">Déconnection</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="nav-link">Connection</Link>
              </li>
              <li>
                <Link to="/register" className="nav-link">Inscription</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
