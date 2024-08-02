import React, { useState }  from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import swt1 from "../../assets/Sweets/swt1.jpg";


const Popup = ({ orderLPopup,setOrderLPopup}) => {
    const [selectedWeight, setSelectedWeight] = useState('50g');
  const [totalPrice, setTotalPrice] = useState(0);

  const weightPrices = {
    '50g': 250,
    '100g': 500,
    '200g': 1000,
    '250g': 1250,
    '500g': 2500,
    '1kg': 5000
  };

  const handleWeightChange = (e) => {
    const weight = e.target.value;
    setSelectedWeight(weight);
    setTotalPrice(weightPrices[weight]);
  };
  return( 
    <>
    { orderLPopup && (
       <div className='popup'>
        <div className='h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm'>
        <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white  rounded-md duration-200 w-[300px]'>

            <div className='flex items-center justify-between'>
                <div>
                    <h1>Order Now</h1>

                </div>
                <IoCloseOutline
                    className='text-2xl cursor-pointer'
                    onClick={() => setOrderLPopup(false)} />
            </div>

            <div>
          <div className='place-items-center gap-8'>
            <img className='object-cover rounded-md' src={swt1} />
          </div>
          
          <div className='my-4'>
                <label htmlFor="weight" className='block mb-2 text-sm font-medium text-gray-700'>Select Weight</label>
                <select id="weight" name="weight"  value={selectedWeight} onChange={handleWeightChange}  className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'>
                  <option value="50g">50g</option>
                  <option value="100g">100g</option>
                  <option value="200g">200g</option>
                  <option value="250g">250g</option>
                  <option value="500g">500g</option>
                  <option value="1kg">1kg</option>
                </select>
              </div>
              <div className='my-4'>
                  <label className='block mb-2 text-sm font-medium text-gray-700'>Total Price: Rs{totalPrice}</label>
                </div>
        </div>
        

       
        

            <div className='flex justify-center'>
                <button className='bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full'> 
                    Add to card
                </button>
            </div>

        
        </div>
        </div>

        </div>
       )} 
    
    </>
  );
}

export default Popup