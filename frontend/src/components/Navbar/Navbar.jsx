import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        {/* Logo and Brand Name */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/images/libraryhub.png" // Update this path to your new logo
            alt="Library Logo"
            width="40"
            height="40"
            className="d-inline-block align-top me-2"
          />
          <span className="fs-4">LibraryHub</span> {/* Removed fw-bold */}
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
          {/* Centered Links */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0"> {/* mx-auto centers the links */}
            {/* Link to Home */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            {/* Link to Our Story (Scroll to Second Section) */}
            <li className="nav-item">
              <a className="nav-link" href="#our-story"> {/* Anchor link */}
                Our Story
              </a>
            </li>

            {/* Link to Contact (Scroll to Footer) */}
            <li className="nav-item">
              <a className="nav-link" href="#footer"> {/* Anchor link */}
                Contact
              </a>
            </li>

            {/* Conditional Links for Logged-in Users */}
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