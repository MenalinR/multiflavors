import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import { FaShippingFast, FaStore } from 'react-icons/fa';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [], totalPrice = 0 } = location.state || {};
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    deliveryMethod: '' 
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
    setLoading(true);

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
            total_with_delivery: totalWithDelivery,
            delivery_method:formData.deliveryMethod
          },
          'K0Ef5J7b9o9PYSdzd' 
        );
      })
      .then((response) => {
        // Show popup after successful order placement
        setLoading(false);
        setShowPopup(true);

        // setFormData({
        //   name: '',
        //   email: '',
        //   phone: '',
        //   address: '',
        //   city: '',
        //   zipCode: '',
        //   deliveryMethod: ''
        // });
       
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        setLoading(false);
        alert('Failed to place order. Please try again.');
      });
  };

  const closePopup = () => {
    setShowPopup(false); // Close the popup when the user clicks the close button
    navigate('/');
  };
  const selectDeliveryMethod = (method) => {
    setFormData((prevState) => ({
      ...prevState,
      deliveryMethod: method
    }));
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
            
            {/* Delivery Method */}
<div className="space-y-4">
  <h3 className="text-lg font-semibold">Shipping & Delivery</h3>
  <p className="text-sm text-gray-500">Select how you would like to receive your order:</p>

  <div className="flex space-x-4 mt-4">
    <button
      type="button"
      className={`flex-1 border border-gray-300 rounded-lg p-4 text-left focus:outline-none ${formData.deliveryMethod === 'ship' ? 'bg-blue-50' : ''}`}
      onClick={() => selectDeliveryMethod('ship')}
    >
      <div className="flex flex-col items-center space-y-2">
        <FaShippingFast className="w-8 h-8 text-gray-600" />
        <span className="text-lg font-medium">Ship to my address</span>
      </div>
    </button>

    <button
      type="button"
      className={`flex-1 border border-gray-300 rounded-lg p-4 text-left focus:outline-none ${formData.deliveryMethod === 'pickup' ? 'bg-blue-50' : ''}`}
      onClick={() => selectDeliveryMethod('pickup')}
    >
      <div className="flex flex-col items-center space-y-2">
        <FaStore className="w-8 h-8 text-gray-600" />
        <span className="text-lg font-medium">Pick up from store</span>
      </div>
    </button>
  </div>
</div>


            {formData.deliveryMethod === 'ship' && (
              <>


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
            
            </>
            )}


            {/* Place Order Button */}
            <button
              type="submit"
              disabled={loading} 
              className={`w-full bg-primary text-white py-2 px-4 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-dark focus:ring-primary-dark'}`}
            >
              {loading ? (
                <span className="flex justify-center items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Packing Up Happiness..
                </span>
              ) : (
                'Place Order'
              )}
            </button>
          </form>
        </div>

        {/* Popup for Successful Order */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg relative max-w-md w-full">
           
            <div className="text-center">
              <div className="text-primary text-5xl mb-4">✔</div>
              <h2 className="text-2xl font-semibold mb-2">SUCCESS!</h2>
              <p>Order placed successfully! Check your email for details.</p>
              <p className="font-semibold">See you soon!</p>
              <button
                  onClick={closePopup}
                  className="mt-4 bg-primary text-white px-4 py-2 rounded"
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
