// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import SignUpPage from './pages/signUpPage/SignUpPage';

import Profile from './components/Profile';
import AuthorsList from './components/AuthorsList';
import Wishlist from './components/Wishlist';
import Navbar from './components/Navbar/Navbar';
import BookList from './components/Booklist/BookList';
import LoginPage from './pages/Login/LoginPage';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import CustomerDashboard from './pages/CustomerDashboard/CustomerDashboard';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/CustomerDashbord" element={<CustomerDashboard />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/authors" element={<AuthorsList />} />
      </Routes>
    </>
  );
}

export default App;
