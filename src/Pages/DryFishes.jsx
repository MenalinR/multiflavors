import React,{useState,useEffect} from 'react'
import dry1 from "../assets/Dryfishes/katta.jpg"
import dry2 from "../assets/Dryfishes/si.jpg"
import dry3 from "../assets/Dryfishes/se.jpg"
import dry4 from "../assets/Dryfishes/sada.jpg"
import dry5 from "../assets/Dryfishes/sp.jpg"
import dry6 from "../assets/Dryfishes/sambol.jpg"
import dry7 from "../assets/Dryfishes/raal.jpg"


const DryFishesData = [
  {
      id: 1,
      img: dry1,
      title:"Katta",
      type: "weight",
      price: 4
  
    },
    {
      id: 2,
      img: dry2,
      title:"Grey mullet",
      type: "weight",
      price: 3
  
    },
    {
      id: 3,
      img: dry3,
      title:"Sengani",
      type: "weight",
      price: 2.5
  
    },
    {
      id: 4,
      img: dry4,
      title:"Atlantic tripletail",
      type: "weight",
      price: 3
  
    },
    {
      id: 5,
      img: dry5,
      title:"Sprats",
      type: "weight",
      price: 2.5
  
    },
    {
      id: 6,
      img: dry6,
      title:"Maldive fish sambol",
      type: "weight",
      price: 6
  
    },
    {
      id: 7,
      img: dry7,
      title:"Raal sambol",
      type: "weight",
      price: 3
  
    },
  
];
const inStockIds = [1,2,3,4,5,6];


const Popup = ({dry, handleClose}) => {

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
    if (selectedValue !== null) {
      setTotalPrice(selectedValue * quantity * dry.price);
    }
  }, [selectedValue, quantity, dry.price]);

  if (!dry) return null;

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

  // Calculate min and max price for weight only
  const minPrice = 50 * dry.price;
  const maxPrice = 1000 * dry.price;


  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='relative bg-white p-4 md:p-8 rounded-md w-[90%] md:w-[80%] lg:w-[60%] max-h-[90%] overflow-y-auto flex flex-col md:flex-row z-60'>
        <button
          onClick={handleClose}
          className='absolute top-2 right-2 text-black text-2xl font-bold z-50 md:top-4 md:right-4 md:left-auto sm:top-4'>
          &times;
        </button>
        <div className='w-full md:w-1/2 flex justify-center items-center md:pr-8'>
          <img
            src={dry.img}
            className='h-full w-full object-cover rounded-md'
            alt={dry.title}
          />
        </div>

        <div className='w-full md:w-1/2 space-y-5 mt-4 md:mt-0'>
          <div className='space-y-2'>
            <h3 className='font-semibold text-2xl'>{dry.title}</h3>
            <p className="text-lg text-orange-400 font-bold ">
              Rs{minPrice} - Rs{maxPrice}
            </p>

            <label className="block text-lg">Weight:</label>
            <div>
              <div className='flex flex-wrap gap-2'>
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
              <p className="mt-2">Price: Rs{dry.price} per gram</p>
            </div>

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
  );


};


const DryFishes = () => {
  const [selecteddry, setSelecteddry] = useState(null);

  const handleOrderPopup = (dry) => {
    if (inStockIds.includes(dry.id)) {
      setSelecteddry(dry);
    } else {
      alert("Not available yet");
    }
  };

  const handleClosePopup = () => {
    setSelecteddry(null);
  };

  return (
    <div className='mt-14 mb-12'>
      <div className='container'>
        <div className='text-center mb-10 '>
          <h1 className='text-4xl font-bold font-serif'>Dry Fishes</h1>
        </div>
        <div>
          <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-8'>
            {DryFishesData.map((data) => {
              const inStock = inStockIds.includes(data.id);

              return ( // Return statement added here
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
                        className='bg-gradient-to-r from-black to-black hover:scale-105 duration-200 text-white py-2 px-4 rounded-full font-bold'
                      >
                        Select Options
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {selecteddry && (
            <Popup dry={selecteddry} handleClose={handleClosePopup} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DryFishes;


