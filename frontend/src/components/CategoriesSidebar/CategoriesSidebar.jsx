import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../features/categories/categorySlice'; // Correct import

const CategoriesSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch categories from Redux store
  const { categories, loading, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/books?search=${encodeURIComponent(searchQuery)}`);
  };

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="categories-sidebar">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search for books"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Categories List */}
      <div className="categories-list">
        <h3>Categories</h3>
        <ul>
          <li>
            <Link to="/books">All Categories</Link>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <Link to={`/books?category=${encodeURIComponent(category.name)}`}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Additional Links */}
      <div className="additional-links">
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/authors">Authors</Link>
      </div>
    </div>
  );
};

export default CategoriesSidebar;