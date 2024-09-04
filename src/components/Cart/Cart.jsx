import React, { useState } from 'react';

const CartItem = ({ item, onDelete }) => {
  // Calculate the total price for the item
  const itemTotalPrice = item.price * item.quantity * item.selectedValue;

  return (
    <div className="flex justify-between items-center border-b py-2">
      <div className="w-[23%] mr-2">
        <h3 className="text-lg font-semibold">{item.name}</h3>
      </div>
      <div className="w-[23%] mr-2 text-center">
        <p>Rs {item.price}</p>
      </div>
      <div className="w-[23%] mr-2 text-center">
        <p>{item.selectedValue} x {item.quantity}</p>
      </div>
      <div className="w-[23%] text-right">
        <p>= Rs {itemTotalPrice}</p>
      </div>
    </div>
  );
};

const Cart = ({ isOpen, onClose, cartItems, onDelete }) => {
  const [isUnderConstruction, setIsUnderConstruction] = useState(false);

  if (!isOpen) return null;

  // Calculate the total price for all items in the cart
  const calculateTotalPrice = () =>
    cartItems.reduce((total, item) => total + (item.totalPrice || 0), 0);

  const isCartEmpty = cartItems.length === 0;

  const handleCheckoutClick = () => {
    setIsUnderConstruction(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-4 md:p-8 rounded-md w-[90%] md:w-[80%] lg:w-[60%] max-h-[90%] overflow-y-auto flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black text-2xl font-bold"
        >
          &times;
        </button>
        {isUnderConstruction ? (
          <div className="text-center">
            <p className="text-xl font-semibold">This page is still under construction, sorry for the inconvenience! You can easily order through Instagram, PickMe, UberEats, or WhatsApp. Links are in the footer!</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
            {isCartEmpty ? (
              <p className="text-lg">Your cart is empty.</p>
            ) : (
              <div>
                {/* Header Row */}
                <div className="flex justify-between items-center border-b py-2 font-semibold">
                  <div className="w-[23%] mr-2">Item</div>
                  <div className="w-[23%] mr-2 text-center">Price</div>
                  <div className="w-[23%] mr-2 text-center">Quantity</div>
                  <div className="w-[23%] text-right">Total</div>
                </div>
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} onDelete={onDelete} />
                ))}
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-semibold">Total Price:</span>
                  <span className="text-lg font-bold">Rs {calculateTotalPrice()}</span>
                </div>
                <button
                  onClick={handleCheckoutClick}
                  className="bg-primary text-white py-2 px-4 rounded-md mt-4 w-full"
                >
                  Checkout
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
