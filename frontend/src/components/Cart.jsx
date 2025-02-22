// src/components/CartPage.js
import React from 'react';
import { useSelector } from 'react-redux';

const CartPage = () => {
  const cart = useSelector(state => state.cart.items);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Your Cart</h2>
      {cart.length === 0 ? <p>Your cart is empty.</p> : cart.map(item => (
        <div key={item.id} className="border p-2 m-2 rounded">
          <h3>{item.title}</h3>
          <p>Price: ${item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default CartPage;