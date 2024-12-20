
import React, {useState, useEffect} from 'react'
import frt1 from "../assets/Fruits/dat.jpg"
import frt2 from "../assets/Fruits/plum.png"
import frt3 from "../assets/Fruits/staw.jpeg"
import frt4 from "../assets/Fruits/figs.png"
import frt5 from "../assets/Fruits/apricot.png"
import { FaCartPlus } from "react-icons/fa";


const FruitsData = [
  {
      id: 1,
      img: frt1,
      title:"Dates",
      type: "weight",
      price: 2.375,
      inStock: true
  
    },
    {
        id: 2,
        img: frt3,
        title:"Dried Strawberry",
        type: "weight",
        price: 2.375,
        inStock: true
    
      },
    {
      id: 3,
      img: frt2,
      title:"Dried plums",
      type: "weight",
      price:2.375,
      inStock: true
  
    },
    {
      id: 4,
      img: frt4,
      title:"Dried Figs",
      type: "weight",
      price:7.6,
      inStock: true
  
    },
    {
      id: 5,
      img: frt5,
      title:"Dried Apricot",
      type: "weight",
      price:7.2,
      inStock: true
  
    },
    
];

const inStockIds = [1];



const Popup = ({fruit, handleClose, addToCart}) => {
  
  const [selectedValue, setSelectedValue] = useState(50);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  useEffect(() => {
    if (fruit) {
      // Calculate the total price based on selected value and quantity
      const price = fruit.price || 0;
      const value = selectedValue || 1; // Default to 1 if no selected value
      setTotalPrice(price * value * quantity);
    }
  }, [selectedValue, quantity, fruit.price]);

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
    // Calculate the total price
    const itemTotalPrice = fruit.price * (selectedValue || 1) * quantity;

    // Create the item object to add to the cart
    const item = {
      id: fruit.id,
      type:fruit.type,
      name: fruit.title,
      price: fruit.price,
      quantity: quantity,
      totalPrice: itemTotalPrice,
      selectedValue: selectedValue, // The selected value (e.g., weight or pieces)
    };

    addToCart(item);
    handleClose();
  };

  if (!fruit) return null;

  // Calculate min and max price for weight only
  const minPrice = fruit.type === "weight" ? 50 * fruit.price : 10 * fruit.price;
  const maxPrice = fruit.type === "weight" ? 1000 * fruit.price : 50 * fruit.price;


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
        <img src={fruit.img} alt={fruit.title} className='max-w-full h-auto rounded-lg' />
      </div>

      <div className='w-full md:w-1/2 flex flex-col'>
        <h2 className='text-2xl font-bold'>{fruit.title}</h2>
        <p className="text-lg text-orange-400 font-bold ">
          Rs{minPrice} - Rs{maxPrice}
        </p>
        <label className="block text-lg mt-4">
          {fruit.type === "weight" ? "Weight:" : "Pieces:"}
        </label>
        {fruit.type === "weight" ? (
          <div>
            <div className="flex flex-wrap gap-2">
              {[50, 100, 250,400, 500, 1000].map(weight => (
                <button
                  key={weight}
                  className={`border p-2 rounded ${selectedValue === weight ? 'border border-primary' : ''}`}
                  onClick={() => handleValueChange(weight)}
                >
                  {weight}g
                </button>
              ))}
            </div>
            <p className="mt-2">Price: Rs{fruit.price} per gram</p>
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
            <p className="mt-2">Price: Rs{fruit.price} per piece</p>
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




const Fruits = ({ addToCart }) => {
  const [selectedFruit, setSelectedFruit] = useState(null);

  const openPopup = (fruit) => {
    setSelectedFruit(fruit);
  };

  const closePopup = () => {
    setSelectedFruit(null);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Fruits</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {FruitsData.map(fruit => (
        
            <div key={fruit.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={fruit.img} alt={fruit.title} className="w-full h-56 object-cover" />
              <div className="p-4">
              <div className="flex justify-between items-center">
              <div>
                <h2 className={`text-xl font-bold ${fruit.inStock ? 'text-green-500' : 'text-red-500'}`}>
                  {fruit.title}
                </h2>
                <p className={`mt-2 ${fruit.inStock ? 'text-green-500' : 'text-red-500'}`}>
                  {fruit.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
                </div>
                <button
                  onClick={() => openPopup(fruit)}
                  className={`mt-4 px-4 py-2 rounded-md flex items-center gap-2 ${fruit.inStock ? 'bg-primary text-white' : 'bg-gray-400 cursor-not-allowed'}`}
                  disabled={!fruit.inStock}
                >
                  Select
                </button>
              </div>
            </div>
            </div>
        ))}
      </div>
      {selectedFruit && (
        <Popup fruit={selectedFruit} handleClose={closePopup} addToCart={addToCart} />
      )}
    </div>
  );
};

export default Fruits;