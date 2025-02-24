import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice'; // Import the auth slice action
import './LoginPage.css'; // Import the CSS file
import axiosInstance from '../../components/config/axiosSetup';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Fetch all users from the /users endpoint
      const usersResponse = await axiosInstance.get('/users');
      const users = usersResponse.data;

      // Find the user with the matching email and password
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!user) {
        setError('Invalid email or password');
        return;
      }

      // Store the user data and token in Redux
      dispatch(setCredentials({ user, token: 'dummy-token' })); // Replace 'dummy-token' with an actual token if available

      // Redirect based on the user's role
      if (user.role === 'admin') {
        navigate('/AdminDashboard'); // Redirect to Admin Dashboard
      } else if (user.role === 'customer') {
        navigate('/CustomerDashbord'); // Redirect to Customer Dashboard
      } else {
        navigate('/'); // Fallback to home page
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;