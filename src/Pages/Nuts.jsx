import React, { useState, useEffect  } from 'react';
import nut1 from "../assets/Nuts/nut1.jpg";
import nut2 from "../assets/Nuts/nut2.jpg";
import nut3 from "../assets/Nuts/nut3.jpg";
import nut4 from "../assets/Nuts/nut4.jpg";
import nut5 from "../assets/Nuts/nut5.jpg";
import nut6 from "../assets/Nuts/nut6.jpeg";
import { FaCartPlus } from "react-icons/fa";

const NutsData = [
  { id: 1, img: nut1, title: "Cashews", type: "weight", price: 7.2 ,inStock: true},
  { id: 2, img: nut2, title: "Peanuts", type: "weight",price: 0.8,inStock: false },
  { id: 3, img: nut3, title: "Pistachios",type: "weight", price: 7.6,inStock: true },
  { id: 4, img: nut4, title: "Almonds",type: "weight", price: 5 ,inStock: true},
  { id: 5, img: nut5, title: "Walnuts",type: "weight", price: 5 ,inStock: true},
  { id: 6, img: nut6, title: "Mixed Nuts",type: "weight", price: 8 ,inStock: true},
];

const inStockIds = [1, 3, 4, 5, 6];

const Popup = ({ nuts, handleClose, addToCart }) => {
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
    if (nuts) {
      // Calculate the total price based on selected value and quantity
      const price = nuts.price || 0;
      const value = selectedValue || 1; // Default to 1 if no selected value
      setTotalPrice(price * value * quantity);
    }
  }, [selectedValue, quantity, nuts.price]);
  
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
    const itemTotalPrice = nuts.price * (selectedValue || 1) * quantity;

    // Create the item object to add to the cart
    const item = {
      id: nuts.id,
      name: nuts.title,
      price: nuts.price,
      quantity: quantity,
      totalPrice: itemTotalPrice,
      selectedValue: selectedValue, // The selected value (e.g., weight or pieces)
    };

    addToCart(item);
    handleClose();
  };

  if (!nuts) return null;

  const minPrice = nuts.type === "weight" ? 50 * nuts.price : 10 * nuts.price;
  const maxPrice = nuts.type === "weight" ? 1000 * nuts.price : 50 * nuts.price;


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
          <img src={nuts.img} alt={nuts.title} className='max-w-full h-auto rounded-lg' />
        </div>

        <div className='w-full md:w-1/2 flex flex-col'>
          <h2 className='text-2xl font-bold'>{nuts.title}</h2>
          <p className="text-lg text-orange-400 font-bold ">
            Rs{minPrice} - Rs{maxPrice}
          </p>
          <label className="block text-lg mt-4">
            {nuts.type === "weight" ? "Weight:" : "Pieces:"}
          </label>
          {nuts.type === "weight" ? (
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
              <p className="mt-2">Price: Rs{nuts.price} per gram</p>
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
              <p className="mt-2">Price: Rs{nuts.price} per piece</p>
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

const Nuts = ({ addToCart }) => {
  const [selectedNuts, setSelectedNuts] = useState(null);

  const openPopup = (nuts) => {
    
      setSelectedNuts(nuts);
    } ;

  const closePopup = () => {
    setSelectedNuts(null);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Nuts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {NutsData.map(nuts => (
          <div key={nuts.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={nuts.img} alt={nuts.title} className="w-full h-56 object-cover" />
            <div className="p-4">
            <div className="flex justify-between items-center">
            <div>
              <h2 className={`text-xl font-bold ${nuts.inStock ? 'text-green-500' : 'text-red-500'}`}>
                {nuts.title}
              </h2>
              <p className={`mt-2 ${nuts.inStock ? 'text-green-500' : 'text-red-500'}`}>
                {nuts.inStock ? 'In Stock' : 'Out of Stock'}
              </p>
              </div>
              <button
                onClick={() => openPopup(nuts)}
                className={`mt-4 px-4 py-2 rounded-md flex items-center gap-2 ${nuts.inStock  ? 'bg-primary text-white' : 'bg-gray-400 cursor-not-allowed'}`}
                disabled={!nuts.inStock}
              >
                Select 
              </button>
            </div>
          </div>
          </div>
        ))}
      </div>
      {selectedNuts && (
        <Popup nuts={selectedNuts} handleClose={closePopup} addToCart={addToCart} />
      )}
    </div>
  );
};

export default Nuts;
