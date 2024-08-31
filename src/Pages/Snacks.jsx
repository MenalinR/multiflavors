import React, { useState, useEffect } from 'react';
import snk1 from "../assets/Snacks/snk1.jpg";
import snk2 from "../assets/Snacks/snk2.jpeg";
import snk3 from "../assets/Snacks/snk3.jpg";
import snk4 from "../assets/Snacks/snk4.jpg";
import snk5 from "../assets/Snacks/snk5.jpg";
import snk6 from "../assets/Snacks/snk6.jpg";
import snk7 from "../assets/Snacks/snk7.jpg";
import snk8 from "../assets/Snacks/snk8.jpg";
import snk9 from "../assets/Snacks/snk9.jpg";
import snk10 from "../assets/Snacks/snk10.jpg";
import { FaCartPlus } from "react-icons/fa";

const SnacksData = [
  { id: 1, img: snk1, title: "Spicy Muruku", type: "weight", price: 2.5,inStock: true },
  { id: 2, img: snk2, title: "Thenkuzhal Muruku", type: "weight", price: 12 ,inStock: false},
  { id: 3, img: snk3, title: "strip Muruku", type: "weight", price: 2,inStock: true },
  { id: 4, img: snk5, title: "Sweet Murukku", type: "weight", price: 2.5 ,inStock: true},
  { id: 5, img: snk6, title: "Snack", type: "weight", price: 0.7 ,inStock: false},
  { id: 6, img: snk7, title: "Pakoda", type: "weight", price: 2,inStock: true },
  { id: 7, img: snk8, title: "Point pedro Vadai", type: "weight", price: 2,inStock: true },
  { id: 8, img: snk9, title: "Snack", type: "weight", price: 0.9 ,inStock: false},
  
];

const inStockIds = [1,3, 4, 7];

const Popup = ({ snack, handleClose, addToCart}) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Add the overflow-hidden class to the body when the popup is opened
    document.body.classList.add('overflow-hidden');

    // Remove the overflow-hidden class when the popup is closed
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  useEffect(() => {
    if (snack) {
      // Calculate the total price based on selected value and quantity
      const price = snack.price || 0;
      const value = selectedValue || 1; // Default to 1 if no selected value
      setTotalPrice(price * value * quantity);
    }
  }, [selectedValue, quantity, snack.price]);
  
  const handleValueChange = (value) => {
    setSelectedValue(value);
  };

  const incrementQuantity = (item) => {
    setQuantity(prevQuantity => {
      const newQuantity = prevQuantity + 1;
      addToCart({ ...item, quantity: newQuantity });
      return newQuantity;
    });
  };
  
  const decrementQuantity = (item) => {
    setQuantity(prevQuantity => {
      if (prevQuantity > 1) {
        const newQuantity = prevQuantity - 1;
        addToCart({ ...item, quantity: newQuantity });
        return newQuantity;
      }
      return prevQuantity;
    });
  };

  const handleAddToCart = () => {
    // Calculate the total price
    const itemTotalPrice = snack.price * (selectedValue || 1) * quantity;

    // Create the item object to add to the cart
    const item = {
      id: snack.id,
      name: snack.title,
      price: snack.price,
      quantity: quantity,
      totalPrice: itemTotalPrice,
      selectedValue: selectedValue, // The selected value (e.g., weight or pieces)
    };

    addToCart(item);
    handleClose();
  };

  if (!snack) return null;

  const minPrice = snack.type === "weight" ? 50 * snack.price : 10 * snack.price;
  const maxPrice = snack.type === "weight" ? 1000 * snack.price : 50 * snack.price;


  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
    <div className='relative bg-white p-4 md:p-8 rounded-md w-[90%] md:w-[80%] lg:w-[60%] max-h-[90%] overflow-y-auto flex flex-col md:flex-row z-60'>
      <button
        onClick={handleClose}
        className='absolute top-2 right-2 text-black text-2xl font-bold z-50 md:top-4 md:right-4 md:left-auto sm:top-4'
      >
        &times;
      </button>
      <div className='w-full md:w-1/2 flex justify-center items-center md:pr-8'>
        <img src={snack.img} alt={snack.title} className='max-w-full h-auto rounded-lg' />
      </div>

      <div className='w-full md:w-1/2 flex flex-col'>
        <h2 className='text-2xl font-bold'>{snack.title}</h2>
        <p className="text-lg text-orange-400 font-bold ">
          Rs{minPrice} - Rs{maxPrice}
        </p>
        <label className="block text-lg mt-4">
          {snack.type === "weight" ? "Weight:" : "Pieces:"}
        </label>
        {snack.type === "weight" ? (
          <div>
            <div className="flex flex-wrap gap-2">
              {[50, 100, 250, 500, 1000].map(weight => (
                <button
                  key={weight}
                  className={`border p-2 rounded ${selectedValue === weight ? 'border border-primary' : ''}`}
                  onClick={() => handleValueChange(weight)}
                >
                  {weight}g
                </button>
              ))}
            </div>
            <p className="mt-2">Price: Rs{snack.price} per gram</p>
          </div>
        ) : (
          <div>
            <div className="flex flex-wrap gap-2">
              {[10, 20, 30, 40, 50].map(piece => (
                <button
                  key={piece}
                  className={`border p-2 rounded ${selectedValue === piece ? 'border border-primary' : ''}`}
                  onClick={() => handleValueChange(piece)}
                >
                  {piece} pieces
                </button>
              ))}
            </div>
            <p className="mt-2">Price: Rs{snack.price} per piece</p>
          </div>
        )}

        <div className='mt-4 flex items-center gap-4'>
          <label className="block text-lg">Quantity:</label>
          <div className="quantity-selector inline-flex items-center border rounded-md">
            <button onClick={decrementQuantity} className="quantity-button px-4 py-2 rounded-l">
              -
            </button>
            <input
              type="text"
              value={quantity}
              readOnly
              className="quantity-input p-2 w-16 text-center"
            />
            <button onClick={incrementQuantity} className="quantity-button px-4 py-2 rounded-r">
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-primary to-secondary text-white py-2 px-4 rounded-md flex items-center justify-center w-full md:w-auto h-full"
          >
            <FaCartPlus className="mr-2" /> Add to Cart
          </button>
        </div>
        <div className='mt-4'>
          <label className="block text-lg">Total Price:</label>
          <p className="text-xl">Rs{totalPrice}</p>
        </div>
      </div>
    </div>
  </div>
);
};

const Snacks = ({ addToCart }) => {
  const [selectedSnack, setSelectedSnack] = useState(null);

  const openPopup = (snack) => {
    setSelectedSnack(snack);
  };

  const closePopup = () => {
    setSelectedSnack(null);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Snacks</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-8">
        {SnacksData.map(snack => (
            <div key={snack.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={snack.img} alt={snack.title} className="w-full h-56 object-cover" />
              <div className="p-4">
              <div className="flex justify-between items-center">
              <div>
                <h2 className={`text-xl font-bold ${snack.inStock ? 'text-green-500' : 'text-red-500'}`}>
                  {snack.title}
                </h2>
                <p className={`mt-2 ${snack.inStock ? 'text-green-500' : 'text-red-500'}`}>
                  {snack.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
                </div>
                <button
                  onClick={() => openPopup(snack)}
                  className={`mt-4 px-4 py-2 rounded-md flex items-center gap-2 ${snack.inStock ? 'bg-primary text-white' : 'bg-gray-400 cursor-not-allowed'}`}
                  disabled={!snack.inStock}
                >
                  Select
                </button>
              </div>
            </div>
            </div>
        
        ))}
      </div>
      {selectedSnack && (
        <Popup snack={selectedSnack} handleClose={closePopup} addToCart={addToCart} />
      )}
    </div>
  );
};

export default Snacks;