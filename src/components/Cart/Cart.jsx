// src/Pages/Cart.jsx
import React from 'react';

const Cart = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } w-80 z-50`}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-xl text-gray-600"
      >
        &times;
      </button>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        {/* Cart content goes here */}
        <p>Your cart is currently empty.</p>
      </div>
    </div>
  );
};

export default Cart;
