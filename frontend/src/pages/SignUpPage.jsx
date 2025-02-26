import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';
import axiosInstance from '../components/config/axiosSetup';

const SignupForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post('/users', {
        ...data,
        // Keep birthyear as YYYY-MM-DD (default format for <input type="date" />)
      });
      dispatch(setCredentials(response.data));
      alert('Signup successful!');
    } catch (error) {
      alert(error.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input {...register('name', { required: 'Name is required' })} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label>Email:</label>
        <input type='email' {...register('email', { required: 'Email is required' })} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input type='password' {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } })} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label>Address:</label>
        <input {...register('address')} />
      </div>
      <div>
        <label>Phone:</label>
        <input {...register('tele')} />
      </div>
      <div>
        <label>CIN:</label>
        <input {...register('cin', { required: 'CIN is required' })} />
        {errors.cin && <p>{errors.cin.message}</p>}
      </div>
      <div>
        <label>Birthdate:</label>
        <input type='date' {...register('birthyear', { required: 'Birthdate is required' })} />
        {errors.birthyear && <p>{errors.birthyear.message}</p>}
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignupForm;
