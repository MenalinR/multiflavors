import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import emailjs from 'emailjs-com';

const Checkout = () => {
  // Use useLocation to receive cartItems and totalPrice passed from Cart.jsx
  const location = useLocation();
  const { cartItems = [], totalPrice = 0 } = location.state || {};

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: ''
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle placing an order and sending email using EmailJS
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    // Prepare the email content
    const orderDetails = cartItems.map(
      (item) => `${item.name} (${item.quantity} x ${item.selectedValue})`
    ).join(', ');

    const emailData = {
      ...formData,
      orderDetails,
      totalPrice
    };

    // Use EmailJS or another email service to send the email
    emailjs.send('service_awszyvb', 'template_ciosocd',  {
        customer_name: formData.name,
        product_list: orderDetails,
        customer_email: formData.email,
      },
     'K0Ef5J7b9o9PYSdzd'
    )
      .then((response) => {
        alert('Order placed successfully! Check your email for details.');
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        alert('Failed to place order. Please try again.');
      });
  };

  return (
    <div className="checkout">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

      <form onSubmit={handlePlaceOrder}>
        {/* Customer Info Form */}
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Zip Code</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border"
          />
        </div>

        {/* Order Summary */}
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        <ul className="mb-4">
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity} x {item.selectedValue}
            </li>
          ))}
        </ul>
        <p className="font-bold">Total Price: Rs {totalPrice}</p>

        {/* Place Order Button */}
        <button type="submit" className="bg-primary text-white py-2 px-4 mt-4 w-full">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
