import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import emailjs from 'emailjs-com';

const Checkout = () => {
  const location = useLocation();
  const { cartItems = [], totalPrice = 0 } = location.state || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '', 
    address: '',
    city: '',
    zipCode: '',
    deliveryMethod: 'ship' 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const orderDetails = cartItems.map(
      (item) => `${item.name} (${item.quantity} x ${item.selectedValue}${item.unit})`
    ).join(', ');

    const emailData = {
      ...formData,
      orderDetails,
      totalPrice
    };

    emailjs.send('service_awszyvb', 'template_ciosocd',  {
        customer_name: formData.name,
        product_list: orderDetails,
        customer_email: formData.email,
        customer_phone: formData.phone,
        delivery_method: formData.deliveryMethod
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
    <div className="checkout-container flex justify-center items-center min-h-screen bg-gray-100">
      <div className="checkout-content bg-white p-8 shadow-lg rounded-lg w-full max-w-4xl grid grid-cols-2 gap-8">
        {/* Customer Info Form (Left Side) */}
        <div className="customer-info">
          <h2 className="text-2xl font-semibold mb-4">Customer Information</h2>
          <form onSubmit={handlePlaceOrder}>
            {/* Form fields */}
            <div className="mb-4">
              <label className="block mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded"
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
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Phone</label> 
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded"
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
                className="w-full px-4 py-2 border rounded"
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
                className="w-full px-4 py-2 border rounded"
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
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Delivery Method</label>
              <div className="flex space-x-4">
                <label>
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="ship"
                    checked={formData.deliveryMethod === 'ship'}
                    onChange={handleInputChange}
                  />
                  Ship
                </label>
                <label>
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="pickup"
                    checked={formData.deliveryMethod === 'pickup'}
                    onChange={handleInputChange}
                  />
                  Pickup in Store
                </label>
              </div>
            </div>
            {/* Place Order Button */}
            <button
              type="submit"
              className="bg-primary text-white py-2 px-4 rounded shadow-sm"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary (Right Side) */}
        <div className="order-summary bg-gray-50 p-4 rounded-md shadow">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="mb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center mb-2">
                {/* <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded mr-4" /> */}
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.selectedValue} {item.unit}</p>
                  <p className="text-sm text-gray-500">Rs {item.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Subtotal */}
          <div className="mb-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Subtotal ({cartItems.length} item)</span>
              <span className="text-sm font-semibold">Rs {totalPrice}</span>
            </div>
          </div>

          {/* Delivery Method */}
          {formData.deliveryMethod === 'pickup' && (
            <div className="mb-4 flex justify-between">
              <span className="text-sm text-gray-500">Pickup in store</span>
              <span className="text-sm font-semibold">FREE</span>
            </div>
          )}

          {/* Total */}
          <div className="border-t pt-4 flex justify-between items-center">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-lg font-bold">Rs {totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
