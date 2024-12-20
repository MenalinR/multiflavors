import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { getFirestore, updateDoc , doc, getDoc, setDoc, collection, addDoc } from "firebase/firestore";
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

  const db = getFirestore();
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
  
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
  
    try {
      const lastOrderRef = doc(db, 'LastOrderNumber', 'orderCount');
      const lastOrderSnap = await getDoc(lastOrderRef);
      let newLastOrder;
      if (lastOrderSnap.exists()) {
        const currentLastOrder = lastOrderSnap.data().lastOrderNumber;
  
        // Increment the LastOrderNumber by 1
         newLastOrder = currentLastOrder + 1;
      }else {
        // Handle case where the document doesn't exist
        await setDoc(lastOrderRef, { lastOrderNumber: 1 });
        newLastOrder = 1; // First order
      }
    
  
        // Update the LastOrderNumber in Firestore
        await updateDoc(lastOrderRef, {
          lastOrderNumber: newLastOrder,
        });
  
        console.log(`LastOrderNumber updated to: ${newLastOrder}`);
      
     // Send the email using EmailJS
      await emailjs.send(
        'service_awszyvb',
        'template_ciosocd',
        {
          customer_name: formData.name,
          product_list: orderDetails,
          customer_email: formData.email,
          customer_phone: formData.phone,
          delivery_method: formData.deliveryMethod,
          total_price: totalWithDelivery,
        },
        'K0Ef5J7b9o9PYSdzd'
      );
  
      await emailjs.send(
        'service_awszyvb',
        'template_46ggx0t',
        {
          customer_name: formData.name,
          product_list: orderDetails,
          order_details: orderDetails,
          customer_phone: formData.phone,
          shipping_address: formData.address,
          total_price: totalWithDelivery,
          delivery_fee: deliveryFee,
          total_with_delivery: totalWithDelivery,
          delivery_method: formData.deliveryMethod
        },
        'K0Ef5J7b9o9PYSdzd'
      );
  
     
   // Log the data to be added to Firestore
   const orderData = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    address: formData.address,
    city: formData.city,
    zipCode: formData.zipCode,
    deliveryMethod: formData.deliveryMethod,
    totalPrice: totalWithDelivery, // totalPrice + delivery fee
    orderNumber: newLastOrder,
    cartItems,
  };
  
  console.log("Order Data:", orderData); // This logs the data

  // Add the order to Firestore
  await addDoc(collection(db, "orders"), orderData);


setLoading(false);
setShowPopup(true); // Show success popup
} catch (error) {
console.error("Failed to place order:", error);
alert("Failed to place order. Please try again.");
} finally {
setLoading(false);
}
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
              className={`w-full bg-primary text-white py-2 px-4 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-dark'}`}
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
              )}            </button>
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
        <div className="order-summary">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Order Summary</h2>
          <div className="space-y-2">
            {cartItems.map((item, index) => (
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

      {/* {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold mb-4">Order Placed Successfully!</h3>
            <p className="mb-6">Thank you for your order. We'll get in touch with you shortly.</p>
            <button
              onClick={closePopup}
              className="bg-primary text-white py-2 px-4 rounded shadow-sm focus:outline-none hover:bg-primary-dark"
            >
              Close
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Checkout;
