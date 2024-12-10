import React, { useState, useEffect  } from 'react';
import nut1 from "../assets/Nuts/nut1.jpg";
import nut2 from "../assets/Nuts/nut2.jpg";
import nut3 from "../assets/Nuts/nut3.jpg";
import nut4 from "../assets/Nuts/nut4.jpg";
import nut5 from "../assets/Nuts/nut5.jpg";
import nut6 from "../assets/Nuts/nut6.jpeg";
import rel1 from "../assets/Nuts/s.cashew.jpg";
import rel2 from "../assets/Nuts/SC.png";
import rel3 from "../assets/Nuts/RCN.png";
import { FaCartPlus } from "react-icons/fa";

const NutsData = [
  { id: 1, img: nut1, title: "Oven Cashews", type: "weight", price: 7.2 ,inStock: true,relatedImages:[rel1,rel2,rel3]},
  { id: 2, img: nut2, title: "Peanuts", type: "weight",price: 1.5,inStock: true },
  { id: 3, img: nut3, title: "Pistachios",type: "weight", price: 7.6,inStock: true },
  { id: 4, img: nut4, title: "Almonds",type: "weight", price: 5 ,inStock: true},
  { id: 5, img: nut5, title: "Walnuts",type: "weight", price: 5 ,inStock: true},
  { id: 6, img: nut6, title: "Mixed Nuts",type: "weight", price: 8 ,inStock: true},
];

const inStockIds = [1,2, 3, 4, 5, 6];

const Popup = ({ nuts, handleClose, addToCart }) => {
  const [selectedValue, setSelectedValue] = useState(50);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentTitle, setCurrentTitle] = useState(nuts.title); 
  const [currentPrice, setCurrentPrice] = useState(nuts.price);

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  useEffect(() => {
    setTotalPrice((currentPrice || nuts.price) * (selectedValue || 1) * quantity);
  }, [currentPrice, selectedValue, quantity, nuts.price]);

  const handleValueChange = (value) => {
    setSelectedValue(value);
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity));
  };

  const handleAddToCart = () => {
    const itemTotalPrice = nuts.price * (selectedValue || 1) * quantity;

    const item = {
      id: nuts.id,
      type: nuts.type,
      name: currentTitle,
      price: currentPrice,
      quantity: quantity,
      totalPrice: itemTotalPrice,
      selectedValue: selectedValue,
    };

    addToCart(item);
    handleClose();
  };
  const handleRelatedImageClick = (index) => {
    const relatedTitles = ["Spicy Cashews", "Salted Cashews", "Roasted Cashews"];
    const relatedPrice = [8.6,8.6,8.6];
    setCurrentTitle(relatedTitles[index]); // Update the title based on the clicked image
    setCurrentPrice(relatedPrice[index]); 
    setTotalPrice(relatedPrices[index] * (selectedValue || 1) * quantity);
  };
 

  if (!nuts) return null;

  const minPrice = nuts.type === "weight" ? 50 * currentPrice  : 10 * currentPrice ;
  const maxPrice = nuts.type === "weight" ? 1000 * currentPrice  : 50 * currentPrice ;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='relative bg-white p-4 md:p-8 rounded-md w-[90%] md:w-[80%] lg:w-[60%] max-h-[90%] overflow-y-auto flex flex-col md:flex-row z-60'>
        <button
          onClick={handleClose}
          className='absolute top-2 right-2 text-black text-2xl font-bold z-50 md:top-4 md:right-4 md:left-auto sm:top-4'
        >
          &times;
        </button>
        <div className='w-full md:w-1/2 flex flex-col items-center  md:pr-8'>
          <img src={nuts.img} alt={nuts.title} className='max-w-full h-auto rounded-lg' />
          {nuts.relatedImages && nuts.relatedImages.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {nuts.relatedImages.map((relatedImg, index) => (
                <img
                  key={index}
                  src={relatedImg}
                  alt={`Related ${nuts.title}`}
                  className="w-24 h-24 object-cover rounded-md shadow-md cursor-pointer"
                  onClick={() => handleRelatedImageClick(index)}
                />
              ))}
            </div>
          )}
        </div>

        <div className='w-full md:w-1/2 flex flex-col'>
          <h2 className='text-2xl font-bold'>{currentTitle}</h2>
          <p className="text-lg text-orange-400 font-bold">
            Rs {minPrice} - Rs {maxPrice}
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
                    className={`border p-2 rounded ${selectedValue === weight ? 'border-primary' : ''}`}
                    onClick={() => handleValueChange(weight)}
                  >
                    {weight}g
                  </button>
                ))}
              </div>
              <p className="mt-2">Price: Rs {nuts.price} per gram</p>
            </div>
          ) : (
            <div>
              <div className="flex flex-wrap gap-2">
                {[10, 20, 30, 40, 50].map(piece => (
                  <button
                    key={piece}
                    className={`border p-2 rounded ${selectedValue === piece ? 'border-primary' : ''}`}
                    onClick={() => handleValueChange(piece)}
                  >
                    {piece} pieces
                  </button>
                ))}
              </div>
              <p className="mt-2">Price: Rs {nuts.price} per piece</p>
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
            <p className="text-xl">Rs {totalPrice}</p>
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
