import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [], totalPrice = 0 } = location.state || {};
  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    deliveryMethod: 'ship' 
  });

  const deliveryFee = formData.deliveryMethod === 'ship' ? 350 : 0;
  const totalWithDelivery = totalPrice + deliveryFee;

  const calculateTotal = (quantity, selectedValue, unitPrice) => {
    return quantity * selectedValue * unitPrice;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault(); // Prevent form refresh

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const orderDetails = cartItems
      .map(
        (item) =>
          `${item.name} (${item.quantity} x ${item.selectedValue}${
            item.type === 'weight' ? 'g' : 'pcs'
          })`
      )
      .join(', ');

    const emailData = {
      ...formData,
      orderDetails,
      totalPrice
    };

    emailjs
      .send(
        'service_awszyvb',
        'template_ciosocd',
        {
          customer_name: formData.name,
          product_list: orderDetails,
          customer_email: formData.email,
          customer_phone: formData.phone,
          delivery_method: formData.deliveryMethod
        },
        'K0Ef5J7b9o9PYSdzd'
      )
      .then((response) => {
        // Send email using the second template
        return emailjs.send(
          'service_awszyvb', 
          'template_46ggx0t', 
          {
            customer_name: formData.name,
            product_list: orderDetails,
            order_details: orderDetails,
            customer_phone: formData.phone,
            shipping_address: formData.address,
            total_price: totalPrice,
            delivery_fee: deliveryFee,
            total_with_delivery: totalWithDelivery
          },
          'K0Ef5J7b9o9PYSdzd' 
        );
      })
      .then((response) => {
        // Show popup after successful order placement
        setShowPopup(true);
       
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        alert('Failed to place order. Please try again.');
      });
  };

  const closePopup = () => {
    setShowPopup(false); // Close the popup when the user clicks the close button
    navigate('/');
  };

  return (
    <div className="checkout-container flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="checkout-content bg-white p-8 shadow-lg rounded-lg w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Customer Info Form (Left Side) */}
        <div className="customer-info">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Customer Information</h2>
          <form onSubmit={handlePlaceOrder} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* City */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Zip Code */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Zip Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Delivery Method */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Delivery Method</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="ship"
                    checked={formData.deliveryMethod === 'ship'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Ship
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="pickup"
                    checked={formData.deliveryMethod === 'pickup'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Pickup in Store
                </label>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Popup for Successful Order */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg relative max-w-md w-full">
            <button className="absolute top-2 right-2 text-lg" onClick={closePopup}>
              &times;
            </button>
            <div className="text-center">
              <div className="text-blue-500 text-5xl mb-4">✔</div>
              <h2 className="text-2xl font-semibold mb-2">SUCCESS!</h2>
              <p>Order placed successfully! Check your email for details.</p>
              <p className="font-semibold">See you soon!</p>
              <button
                  onClick={closePopup}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Back to Home
                </button>
            </div>
          </div>
        </div>
        )}

        {/* Order Summary (Right Side) */}
        <div className="order-summary bg-gray-50 p-6 rounded-md shadow">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Order Summary</h2>

          {/* Cart Items */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    {item.quantity} x {item.selectedValue}{' '}
                    {item.type === 'weight' ? 'g' : 'pcs'}
                  </p>
                </div>
                <p className="font-semibold">{calculateTotal(item.quantity, item.selectedValue, item.price)} LKR</p>
              </div>
            ))}
          </div>

          {/* Subtotal */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-gray-600">Subtotal:</p>
              <p className="font-semibold">{totalPrice} LKR</p>
            </div>

            {/* Delivery Fee */}
            <div className="flex items-center justify-between">
              <p className="font-semibold text-gray-600">Delivery Fee:</p>
              <p className="font-semibold">{deliveryFee} LKR</p>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between border-t pt-4 mt-4">
              <p className="font-semibold text-gray-800">Total:</p>
              <p className="font-semibold">{totalWithDelivery} LKR</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
