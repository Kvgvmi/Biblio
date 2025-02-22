import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(''); // State to store search input

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    navigate(`/books?search=${encodeURIComponent(searchQuery)}`); // Redirect to books page with search query
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query); // Update search query state
    navigate(`/books?search=${encodeURIComponent(query)}`); // Update URL dynamically
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        {/* Logo and Brand Name */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/images/logo.png" // Path to your logo in the public folder
            alt="Library Logo"
            width="40"
            height="40"
            className="d-inline-block align-top me-2"
          />
          <span className="fs-4 fw-bold">LibraryHub</span>
        </Link>

        {/* Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {user ? (
              <>
                {user.role === 'customer' && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/profile">
                        <i className="fas fa-user-circle me-1"></i>Profile
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/wishlist">
                        <i className="fas fa-heart me-1"></i>Wishlist
                      </Link>
                    </li>
                  </>
                )}
                {user.role === 'admin' && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                      <i className="fas fa-tachometer-alt me-1"></i>Dashboard
                    </Link>
                  </li>
                )}
              </>
            ) : null}
          </ul>

          {/* Search Bar */}
          <form className="d-flex me-3" onSubmit={handleSearch}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search books..."
                aria-label="Search"
                value={searchQuery} // Controlled input
                onChange={handleInputChange} // Update search query state and URL
              />
              <button className="btn btn-outline-light" type="submit">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>

          {/* Login/Signup or Logout Button */}
          <div className="d-flex">
            {user ? (
              <button
                className="btn btn-outline-light"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt me-1"></i>Logout
              </button>
            ) : (
              <>
                <Link className="btn btn-outline-light me-2" to="/login">
                  <i className="fas fa-sign-in-alt me-1"></i>Login
                </Link>
                <Link className="btn btn-light" to="/signup">
                  <i className="fas fa-user-plus me-1"></i>Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;