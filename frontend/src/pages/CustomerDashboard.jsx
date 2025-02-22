import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerDashboard = () => {
  const [purchases, setPurchases] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [newWishlistItem, setNewWishlistItem] = useState('');

  useEffect(() => {
    axios.get('/api/track-book-purchases').then(response => setPurchases(response.data));
    axios.get('/api/transactions').then(response => setTransactions(response.data));
    axios.get('/api/wishlists').then(response => setWishlist(response.data));
  }, []);

  const addToWishlist = () => {
    axios.post('/api/wishlists', { book_name: newWishlistItem }).then(response => {
      setWishlist([...wishlist, response.data]);
      setNewWishlistItem('');
    });
  };

  const removeFromWishlist = (id) => {
    axios.delete(`/api/wishlists/${id}`).then(() => {
      setWishlist(wishlist.filter(item => item.id !== id));
    });
  };

  return (
    <div>
      <h2>Customer Dashboard</h2>

      <div>
        <h3>Your Purchases</h3>
        <ul>
          {purchases.map(purchase => (
            <li key={purchase.id}>{purchase.book_name}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Your Transactions</h3>
        <ul>
          {transactions.map(transaction => (
            <li key={transaction.id}>{transaction.amount}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Your Wishlist</h3>
        <input
          type="text"
          value={newWishlistItem}
          onChange={(e) => setNewWishlistItem(e.target.value)}
          placeholder="Add a book"
        />
        <button onClick={addToWishlist}>Add to Wishlist</button>
        <ul>
          {wishlist.map(item => (
            <li key={item.id}>
              {item.book_name} 
              <button onClick={() => removeFromWishlist(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomerDashboard;
