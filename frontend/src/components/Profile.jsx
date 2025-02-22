import React from 'react';
import { useNavigate } from 'react-router-dom';
import BookList from './BookList';

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container my-4">
      <h2>Customer Profile</h2>
      <button 
        className="btn btn-secondary mb-3" 
        onClick={() => navigate('/wishlist')}
      >
        View Wishlist
      </button>
      <div>
        <h3>Available Books</h3>
        <BookList />
      </div>
    </div>
  );
};

export default ProfilePage;
