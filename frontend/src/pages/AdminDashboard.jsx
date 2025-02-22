import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [purchases, setPurchases] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [wishlists, setWishlists] = useState([]);

  useEffect(() => {
    axios.get('/api/track-book-purchases').then(response => setPurchases(response.data));
    axios.get('/api/transactions').then(response => setTransactions(response.data));
    axios.get('/api/wishlists').then(response => setWishlists(response.data));
  }, []);

  const deletePurchase = (id) => {
    axios.delete(`/api/track-book-purchases/${id}`).then(() => {
      setPurchases(purchases.filter(purchase => purchase.id !== id));
    });
  };

  const deleteTransaction = (id) => {
    axios.delete(`/api/transactions/${id}`).then(() => {
      setTransactions(transactions.filter(transaction => transaction.id !== id));
    });
  };

  const deleteWishlist = (id) => {
    axios.delete(`/api/wishlists/${id}`).then(() => {
      setWishlists(wishlists.filter(wishlist => wishlist.id !== id));
    });
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <h3>Purchases</h3>
        <ul>
          {purchases.map(purchase => (
            <li key={purchase.id}>
              {purchase.book_name} 
              <button onClick={() => deletePurchase(purchase.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Transactions</h3>
        <ul>
          {transactions.map(transaction => (
            <li key={transaction.id}>
              {transaction.amount} 
              <button onClick={() => deleteTransaction(transaction.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Wishlists</h3>
        <ul>
          {wishlists.map(wishlist => (
            <li key={wishlist.id}>
              {wishlist.book_name} 
              <button onClick={() => deleteWishlist(wishlist.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
