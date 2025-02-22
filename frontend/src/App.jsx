// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AdminDashboard from './pages/AdminDashboard';

import Profile from './components/Profile';
import AuthorsList from './components/AuthorsList';
import Wishlist from './components/Wishlist';
import Navbar from './components/Navbar/Navbar';
import BookList from './components/Booklist/BookList';

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
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/authors" element={<AuthorsList />} />
      </Routes>
    </>
  );
}

export default App;
