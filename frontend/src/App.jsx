import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import SignUpPage from './pages/signUpPage/SignUpPage';
import Profile from './components/Profile';
import AuthorsList from './components/AuthorsList';
import Wishlist from './components/Wishlist';
import BookList from './components/Booklist/BookList';
import LoginPage from './pages/Login/LoginPage';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import EditBook from "./pages/AdminDashboard/EditBook";
import CustomerDashboard from './pages/CustomerDashboard/CustomerDashboard';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/dashboard/edit-book/:id" element={<EditBook />} />;
        <Route path="/CustomerDashboard" element={<CustomerDashboard />} /> {/* Fixed typo here */}
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/authors" element={<AuthorsList />} />
      </Routes>
    </>
  );
}

export default App;