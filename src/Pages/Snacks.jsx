import React, { useState, useEffect } from 'react';
import snk1 from "../assets/Snacks/snk1.jpg";
import snk2 from "../assets/Snacks/snk2.jpeg";
import snk3 from "../assets/Snacks/snk3.png";
import snk4 from "../assets/Snacks/snk4.jpg";
import snk5 from "../assets/Snacks/snk5.jpg";
import snk6 from "../assets/Snacks/snk6.jpg";
import snk7 from "../assets/Snacks/snk7.jpg";
import snk8 from "../assets/Snacks/snk8.jpg";
import snk9 from "../assets/Snacks/snk9.jpg";
import snk10 from "../assets/Snacks/snk10.jpg";

const SnacksData = [
  { id: 1, img: snk1, title: "Corn Flour Murukku", type: "pieces", price: 10 },
  { id: 2, img: snk2, title: "Thenkuzhal Murukku", type: "pieces", price: 12 },
  { id: 3, img: snk3, title: "Snack", type: "weight", price: 0.5 },
  { id: 4, img: snk4, title: "Snack", type: "weight", price: 0.6 },
  { id: 5, img: snk5, title: "Sweet Murukku", type: "pieces", price: 15 },
  { id: 6, img: snk6, title: "Snack", type: "weight", price: 0.7 },
  { id: 7, img: snk7, title: "Garlic Ribbon Pakoda", type: "weight", price: 0.8 },
  { id: 8, img: snk8, title: "Paruthithurai Vadai", type: "pieces", price: 20 },
  { id: 9, img: snk9, title: "Snack", type: "weight", price: 0.9 },
  { id: 10, img: snk10, title: "Dark Sweet Murukku", type: "weight", price: 1.0 },
];

const inStockIds = [1, 5, 8];

const Popup = ({ snack, handleClose }) => {
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
      setTotalPrice(selectedValue * quantity * snack.price);
    }
  }, [selectedValue, quantity, snack.price]);

  if (!snack) return null;

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-white p-4 md:p-8 rounded-md w-[90%] md:w-[80%] lg:w-[60%] max-h-[90%] overflow-y-auto flex flex-col md:flex-row">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-black text-2xl font-bold z-50 md:top-4 md:right-4 md:left-auto sm:top-4"
        >
          &times;
        </button>

        <div className="w-full md:w-1/2 flex justify-center items-center md:pr-8">
          <img
            src={snack.img}
            className="h-full w-full object-cover rounded-md"
            alt={snack.title}
          />
        </div>
        <div className="w-full md:w-1/2 space-y-5 mt-4 md:mt-0">
          <div className="space-y-2 ">
            <h3 className="font-semibold text-2xl">{snack.title}</h3>
            <label className="block text-lg">
              {snack.type === "weight" ? "Weight:" : "Pieces:"}
            </label>
            {snack.type === "weight" ? (
              <div>
                <div className="flex flex-wrap gap-2">
                  {[50, 100, 250, 500, 1000].map((weight) => (
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
                  {[10, 20, 30, 40, 50].map((piece) => (
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
            <div className="flex items-center gap-4 mt-4">
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
  );
};

const Snacks = () => {
  const [selectedSnack, setSelectedSnack] = useState(null);

  const handleOrderPopup = (snack) => {
    if (inStockIds.includes(snack.id)) {
      setSelectedSnack(snack);
    } else {
      alert("Not available yet");
    }
  };

  const handleClosePopup = () => {
    setSelectedSnack(null);
  };

  return (
    <div className="mt-14 mb-12">
      <div className="container">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold font-serif">Snacks</h1>
        </div>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
            {SnacksData.map((data) => {
              const inStock = inStockIds.includes(data.id);
              return (
                <div key={data.id} className="space-y-3">
                  <img
                    src={data.img}
                    className="h-[220px] w-[200px] object-cover rounded-md"
                    alt={data.title}
                  />
                  <div className="text-center">
                    <h3 className="font-semibold">{data.title}</h3>
                    <span
                      className={`block mt-2 text-sm font-bold ${
                        inStock ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                    <div className="pt-4">
                      <button
                        onClick={() => handleOrderPopup(data)}
                        className="bg-gradient-to-r from-black to-black hover:scale-105 duration-200 text-white py-2 px-4 rounded-full font-bold"
                      >
                        Select Options
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {selectedSnack && (
            <Popup snack={selectedSnack} handleClose={handleClosePopup} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Snacks;
