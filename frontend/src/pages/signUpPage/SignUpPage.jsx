import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';
import axiosInstance from '../../components/config/axiosSetup';
import './SignUpForm.css';
import Navbar from '../../components/Navbar/Navbar';

const SignupForm = () => {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
  const dispatch = useDispatch();
  const [birthdate, setBirthdate] = useState(''); // Use an empty string for initial state
  const [successMessage, setSuccessMessage] = useState('');

  // Get the current date and subtract 7 years
  const maxYear = new Date().getFullYear() - 7;

  const onSubmit = useCallback(async (data) => {
    if (birthdate) {
      data.birthdate = birthdate; // Use the formatted date string
    } else {
      data.birthdate = null;
    }

    try {
      const response = await axiosInstance.post('/users', data);
      dispatch(setCredentials(response.data));
      setSuccessMessage('Signup successful! Redirecting to login...');
      setTimeout(() => window.location.href = '/login', 2000);
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.error || 'Signup failed');
    }
  }, [birthdate, dispatch]);

  // Watch for password field to compare with confirm password
  const password = watch('password');

  return (
    <>
    <Navbar />

    <div className="signup-container">
      {successMessage ? (
        <div className="success-message">{successMessage}</div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
          <h2>Sign Up</h2>
          
          {/* Name & Email Fields on the same line */}
          <div className="input-row">
            <div>
              <label>Name:</label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                value={watch('name') || ''}
                onChange={(e) => setValue('name', e.target.value)}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>

            <div>
              <label>Email:</label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                value={watch('email') || ''}
                onChange={(e) => setValue('email', e.target.value)}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
          </div>

          {/* CIN & Birthdate Fields on the same line */}
          <div className="input-row">
            <div>
              <label>CIN:</label>
              <input
                type="text"
                {...register('cin', { required: 'CIN is required' })}
                value={watch('cin') || ''}
                onChange={(e) => setValue('cin', e.target.value)}
              />
              {errors.cin && <p>{errors.cin.message}</p>}
            </div>

            <div>
              <label>Birthdate:</label>
              <input
                type="date"
                {...register('birthdate', { required: 'Birthdate is required' })}
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                max={`${maxYear}-12-31`} // Set max date to ensure the user is at least 7 years old
              />
              {errors.birthdate && <p>{errors.birthdate.message}</p>}
            </div>
          </div>

          {/* Other Fields */}
          <div>
            <label>Phone:</label>
            <input
              type="text"
              {...register('tele')}
              value={watch('tele') || ''}
              onChange={(e) => setValue('tele', e.target.value)}
            />
          </div>

          <div>
            <label>Address:</label>
            <input
              type="text"
              {...register('address')}
              value={watch('address') || ''}
              onChange={(e) => setValue('address', e.target.value)}
            />
          </div>

          <div className="input-row">
            <div>
              <label>Password:</label>
              <input
                type="password"
                {...register('password', { 
                  required: 'Password is required', 
                  minLength: { value: 8, message: 'Password must be at least 8 characters' }
                })}
                value={watch('password') || ''}
                onChange={(e) => setValue('password', e.target.value)}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>

            <div>
              <label>Confirm Password:</label>
              <input
                type="password"
                {...register('confirmPassword', { 
                  required: 'Confirm password is required', 
                  validate: value => value === password || 'Passwords do not match'
                })}
                value={watch('confirmPassword') || ''}
                onChange={(e) => setValue('confirmPassword', e.target.value)}
              />
              {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <button type="submit" className="signup-button">Sign Up</button>
        </form>
      )}
    </div>
    </>
  );
};

export default SignupForm;