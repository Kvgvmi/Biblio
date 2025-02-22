// src/components/CategoriesSidebar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CategoriesSidebar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Hard-coded categories list; adjust as needed.
  const categories = ['Fiction', 'Non-Fiction', 'Science', 'Romance', 'Mystery'];

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to the books page with the search query as a URL parameter.
    navigate(`/books?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="container my-4">
      <div className="d-flex flex-wrap align-items-center">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="me-3 mb-2">
          <div className="input-group">
            <input 
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </form>
        {/* Horizontal Navigation */}
        <ul className="nav">
          <li className="nav-item">
            <Link to="/categories" className="nav-link">
              All Categories
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category} className="nav-item">
              <Link 
                to={`/books?category=${encodeURIComponent(category)}`} 
                className="nav-link"
              >
                {category}
              </Link>
            </li>
          ))}
          <li className="nav-item">
            <Link to="/books" className="nav-link">
              All Books
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/wishlist" className="nav-link">
              Wishlist
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/authors" className="nav-link">
              Authors
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CategoriesSidebar;
