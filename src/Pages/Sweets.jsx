import React from 'react';
import swt1 from "../assets/Sweets/swt1.jpg";
import swt2 from "../assets/Sweets/swt2.jpg";
import swt3 from "../assets/Sweets/swt3.jpg";

const Sweets = ({handleOrderLPopup}) => {
  return (
    <div className='mt-14 mb-12'>
      <div className='container'>
        <div className='text-center mb-10'>
          <h1 className='text-4xl font-bold font-serif'>Sweets</h1>
        </div>
        <div>
          <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-8'>
            
            {/* Sweet Item 1 */}
            <div>
              <img
                src={swt1}
                className='h-[220px] w-[200px] object-cover rounded-md'
                alt="Laddu"
              />
              <div className='text-center pt-4'>
                <h3 className='font-semibold'>Laddu</h3>
                <div className='pt-4'>
                  <button 
                   onClick={handleOrderLPopup }
                    className='bg-gradient-to-r from-black to-black hover:scale-105 duration-200 text-white py-2 px-4 rounded-full font-bold'>
                    Select Options
                  </button>
                </div>
              </div>
            </div>

            {/* Sweet Item 2 */}
            <div>
              <img
                src={swt2}
                className='h-[220px] w-[200px] object-cover rounded-md'
                alt="Milk Toffee"
              />
              <div className='text-center pt-4'>
                <h3 className='font-semibold'>Milk Toffee</h3>
                <div className='pt-4'>
                  <button 
                    
                    className='bg-gradient-to-r from-black to-black hover:scale-105 duration-200 text-white py-2 px-4 rounded-full font-bold'>
                    Select Options
                  </button>
                </div>
              </div>
            </div>

            {/* Sweet Item 3 */}
            <div>
              <img
                src={swt3}
                className='h-[220px] w-[200px] object-cover rounded-md'
                alt="Rich Cake"
              />
              <div className='text-center pt-4'>
                <h3 className='font-semibold'>Rich Cake</h3>
                <div className='pt-4'>
                  <button 
                    
                    className='bg-gradient-to-r from-black to-black hover:scale-105 duration-200 text-white py-2 px-4 rounded-full font-bold'>
                    Select Options
                  </button>
                </div>
              </div>
            </div>

            {/* Add more sweet items similarly... */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Sweets;
