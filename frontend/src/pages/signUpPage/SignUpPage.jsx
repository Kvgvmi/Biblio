import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';
import axiosInstance from '../../components/config/axiosSetup';
import YearPicker from 'react-year-picker'; // Use this for a smooth year selection
import './SignUpForm.css';

const SignupForm = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const dispatch = useDispatch();
  const [birthyear, setBirthyear] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Get the current date and subtract 7 years
  const maxYear = new Date().getFullYear() - 7;

  const onSubmit = useCallback(async (data) => {
    if (birthyear) {
      data.birthyear = birthyear.toString(); // Format year as string
    } else {
      data.birthyear = null;
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
  }, [birthyear, dispatch]);

  // Watch for password field to compare with confirm password
  const password = watch('password');

  return (
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
              <input {...register('name', { required: 'Name is required' })} />
              {errors.name && <p>{errors.name.message}</p>}
            </div>

            <div>
              <label>Email:</label>
              <input type="email" {...register('email', { required: 'Email is required' })} />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
          </div>

          {/* CIN & Birthyear Fields on the same line */}
          <div className="input-row">
            <div>
              <label>CIN:</label>
              <input className='cin' {...register('cin', { required: 'CIN is required' })} />
              {errors.cin && <p>{errors.cin.message}</p>}
            </div>

            <div>
              <label>Birthdate:</label>
              <YearPicker
                onChange={(year) => setBirthyear(year)}
                value={birthyear}
                min={1900}
                max={maxYear} // Set the max year to make sure the user is at least 7 years old
                placeholder="Select Year"
              />
              {errors.birthyear && <p>{errors.birthyear.message}</p>}
            </div>
          </div>

          {/* Other Fields */}
          <div>
            <label>Phone:</label>
            <input {...register('tele')} />
          </div>

          <div>
            <label>Address:</label>
            <input {...register('address')} />
          </div>

          <div>
            <label>Password:</label>
            <input type="password" {...register('password', { 
              required: 'Password is required', 
              minLength: { value: 8, message: 'Password must be at least 8 characters' }
            })} />
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
            />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" className="signup-button">Sign Up</button>
        </form>
      )}
    </div>
  );
};

export default SignupForm;
