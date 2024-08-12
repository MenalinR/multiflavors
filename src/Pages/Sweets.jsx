import React, { useState, useEffect } from 'react';
import swt1 from "../assets/Sweets/swt1.jpg";
import swt2 from "../assets/Sweets/swt2.jpg";
import swt3 from "../assets/Sweets/swt3.jpg";





const SweetsData =[
  {
    id:1,
    img:swt1,
    title:"Laddu",
    type: "pieces",
    price: 60
  },
  {
    id:2,
    img:swt2,
    title:"Milk Toffee",
    type: "pieces",
    price: 50
  },
  {
    id:3,
    img:swt3,
    title:"Rich Cake",
    type: "pieces",
    price: 220
  },
]

const inStockIds = [1]; 

const Popup = ({ sweets ,handleClose}) => {
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
    if (selectedValue !== null) {
      setTotalPrice(selectedValue * quantity * sweets.price);
    }
  }, [selectedValue, quantity, sweets.price]);

  if (!sweets) return null;

  const handleValueChange = (value) => {
    setSelectedValue(value);
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const minPrice = sweets.type === "weight" ? 50 * sweets.price : 5 * sweets.price;
  const maxPrice = sweets.type === "weight" ? 1000 * sweets.price : 20 * sweets.price;


  return(
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='relative bg-white p-4 md:p-8 rounded-md w-[90%] md:w-[80%] lg:w-[60%] max-h-[90%] overflow-y-auto flex flex-col md:flex-row  z-60'>
        <button
        onClick={handleClose}
        className='absolute top-2 right-2 text-black text-2xl font-bold z-50 md:top-4 md:right-4 md:left-auto sm:top-4 '>
          &times;
        </button>
        <div className='w-full md:w-1/2 flex justify-center items-center md:pr-8'>
        <img
        src={sweets.img}
        className='h-full w-full object-cover rounded-md'
        alt={sweets.title}
        />

        </div>

        <div className='w-full md:w-1/2 space-y-5 mt-4 md:mt-0'>
        <div className='space-y-2 '>
          <h3 className='font-semibold text-2xl'>{sweets.title}</h3>
          <p className="text-lg text-orange-400 font-bold ">
               Rs{minPrice} - Rs{maxPrice}
            </p>

          <label className="block text-lg">
              {sweets.type === "weight" ? "Weight:" : "Pieces:"}
            </label>
            {sweets.type === "weight" ? (
          <div>
            <div className='flex flex-wrap gap-2'>
              {[50, 100, 250, 500].map((weight) => (
                <buttton
                key={weight}
                className={`border p-2 rounded ${selectedValue === weight ? 'border border-primary' : ''}`}
                onClick={() => handleValueChange(weight)}
              >
                  {weight}g
                </buttton>

              ))}
              </div>
                <p className="mt-2">Price: Rs{sweets.price} per gram</p>
              </div>
            ) : (
              <div>
                <div className="flex flex-wrap gap-2">
                  {[5,10,15,20].map((piece) => (
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
            <div className='flex items-center gap-4 mt-4'>
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
            <button className="bg-gradient-to-r from-primary to-secondary text-white py-2 px-4 rounded-md flex items-center justify-center w-full md:w-auto h-full">
            Add to cart
            </button>
          </div>
          <div className="mt-4">
              <label className="block text-lg">Total Price:</label>
              <p className="text-xl">Rs{totalPrice}</p>
            </div>
        </div>
        </div>

        </div>
      </div>
   
  )
  
}


const Sweets = () => {
  const [selectedSweet, setSelectedSweet] = useState(null);

  const handleOrderPopup = (sweets) => {
    if (inStockIds.includes(sweets.id)) {
      setSelectedSweet(sweets);
    } else {
      alert("Not available yet");
    }
  };

  const handleClosePopup = () => {
    setSelectedSweet(null);
  };

  return (
    <div className='mt-14 mb-12'>
      <div className='container'>
        <div className='text-center mb-10'>
          <h1 className='text-4xl font-bold font-serif'>Sweets</h1>
        </div>
        <div>
          <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-8'>
            {
              SweetsData.map((data) =>{
                const inStock = inStockIds.includes(data.id);
                return(
                  <div key={data.id} className='space-y-3'>
                    <img 
                    src={data.img}
                    className='h-[220px] w-[200px] object-cover rounded-md'
                    alt={data.title}
                    />
                    <div className='text-center'>
                      <h3 className='font-semibold'>{data.title}</h3>
                      <span
                      className={`block mt-2 text-sm font-bold ${
                        inStock ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {inStock ? 'In Stock' : 'Out of Stock'}
                    </span>

                      <div className='pt-4'>
                        <button 
                        onClick={() => handleOrderPopup(data)}
                        className='bg-gradient-to-r from-black to-black hover:scale-105 duration-200 text-white py-2 px-4 rounded-full font-bold'>
                          Select Options
                        </button>
                      </div>
                    </div>

                  </div>
                )
              })
            }
          </div>
          {selectedSweet && (
            <Popup sweets={selectedSweet} handleClose={handleClosePopup} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sweets;
