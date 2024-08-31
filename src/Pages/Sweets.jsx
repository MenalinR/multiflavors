import React, { useState, useEffect } from 'react';
import swt1 from "../assets/Sweets/swt1.jpg";
import swt2 from "../assets/Sweets/swt2.jpg";
import swt3 from "../assets/Sweets/swt3.jpg";
import swt4 from "../assets/Sweets/swt4.jpg";
import { FaCartPlus } from "react-icons/fa";



const SweetsData =[
  {
    id:1,
    img:swt1,
    title:"Laddu",
    type: "pieces",
    price: 60,
    inStock: true
  },
  {
    id:2,
    img:swt2,
    title:"Milk Toffee",
    type: "pieces",
    price: 50,
    inStock: true
  },
  {
    id:3,
    img:swt3,
    title:"Rich Cake",
    type: "pieces",
    price: 220,
    inStock: false
  },
  {
    id:4,
    img:swt4,
    title:"Dates Sweet",
    type: "pieces",
    price: 60,
    inStock: true
  },
]

const inStockIds = [1,4]; 


const Popup = ({ sweets, handleClose, addToCart }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  useEffect(() => {
    if (sweets) {
      // Calculate the total price based on selected value and quantity
      const price = sweets.price || 0;
      const value = selectedValue || 1; // Default to 1 if no selected value
      setTotalPrice(price * value * quantity);
    }
  }, [selectedValue, quantity, sweets.price]);
  

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
    const itemTotalPrice = sweets.price * (selectedValue || 1) * quantity;

    // Create the item object to add to the cart
    const item = {
      id: sweets.id,
      name: sweets.title,
      price: sweets.price,
      quantity: quantity,
      totalPrice: itemTotalPrice,
      selectedValue: selectedValue, // The selected value (e.g., weight or pieces)
    };

    addToCart(item);
    handleClose();
  };

  if (!sweets) return null;

  const minPrice = sweets.type === "weight" ? 50 * sweets.price : 10 * sweets.price;
  const maxPrice = sweets.type === "weight" ? 1000 * sweets.price : 50 * sweets.price;

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
          <img src={sweets.img} alt={sweets.title} className='max-w-full h-auto rounded-lg' />
        </div>

        <div className='w-full md:w-1/2 flex flex-col'>
          <h2 className='text-2xl font-bold'>{sweets.title}</h2>
          <p className="text-lg text-orange-400 font-bold ">
            Rs{minPrice} - Rs{maxPrice}
          </p>
          <label className="block text-lg mt-4">
            {sweets.type === "weight" ? "Weight:" : "Pieces:"}
          </label>
          {sweets.type === "weight" ? (
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
              <p className="mt-2">Price: Rs{sweets.price} per gram</p>
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
              <p className="mt-2">Price: Rs{sweets.price} per piece</p>
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




const Sweets = ({ addToCart }) => {
  const [selectedSweet, setSelectedSweet] = useState(null);

  const openPopup = (sweet) => {
    setSelectedSweet(sweet);
  };

  const closePopup = () => {
    setSelectedSweet(null);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Sweets</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {SweetsData.map(sweet => (
          <div key={sweet.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={sweet.img} alt={sweet.title} className="w-full h-56 object-cover" />
            <div className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">{sweet.title}</h2>
                  <p className={`mt-1 ${sweet.inStock ? 'text-green-500' : 'text-red-500'}`}>
                    {sweet.inStock ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>
                <button
                  onClick={() => openPopup(sweet)}
                  className={`ml-4 px-4 py-2 rounded-md ${sweet.inStock ? 'bg-primary text-white' : 'bg-gray-400 cursor-not-allowed'}`}
                  disabled={!sweet.inStock}
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedSweet && (
        <Popup sweets={selectedSweet} handleClose={closePopup} addToCart={addToCart} />
      )}
    </div>
  );
};
export default Sweets;

