import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import dry1 from "../../assets/Dryfishes/kat.jpg"
import dry2 from "../../assets/Dryfishes/bala.jpg"
import dry3 from "../../assets/Dryfishes/sen.jpg"
import dry4 from "../../assets/Dryfishes/sp.jpg"

const PopupData = [
    {
        id: 1,
        img: dry1,
        title:"Katta",
        
    
      },
      {
        id: 2,
        img: dry2,
        title:"Bala",
        
    
      },
      {
        id: 3,
        img: dry3,
        title:"Sengani",
        
    
      },
      {
        id: 4,
        img: dry4,
        title:"Sprats",
        
    
      },
    
  ]

const Popup = ({ orderPopuppage,setOrderPopuppage}) => {
  return( 
    <>
    { orderPopuppage && (
       <div className='popup'>
        <div className='h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm'>
        <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white  rounded-md duration-200 w-[300px]'>

            <div className='flex items-center justify-between'>
                <div>
                    <h1>Order Now</h1>

                </div>
                <IoCloseOutline
                    className='text-2xl cursor-pointer'
                    onClick={() => setOrderPopuppage(false)} />
            </div>

            <div>
          <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-8'>
            <img src={dry1} />
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