import React from 'react'
import swt1 from "../assets/Sweets/swt1.jpg"
import swt2 from "../assets/Sweets/swt2.jpg"
import swt3 from "../assets/Sweets/swt3.jpg"


const SweetsData = [
    {
        id: 1,
        img: swt1,
        title:"Laddu",
        
    
      },
      {
        id: 2,
        img: swt2,
        title:"Milk Toffee",
        
    
      },
      {
        id: 3,
        img: swt3,
        title:"RichCake",
        
    
      },
]
const Sweets = () => {
  return (
    <div className='mt-14 mb-12'>
      <div className='container'>
        <div className='text-center mb-10 '>
          <h1 className='text-4xl font-bold font-serif'>Sweets</h1>
        </div>
        <div>
          <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-8'>
            {
                SweetsData.map((data) => (

                    <div className='space-y-3'>
                        <img
                        src={data.img}
                        className='h-[220px] w-[200px] object-cover rounded-md' />

                        <div className='text-center'>
                            <h3 className='font-semibold'>{data.title}</h3>
                            <div className='pt-4'>
                            <button className='bg-gradient-to-r from-black to-black hover:scale-105 duration-200 text-white py-2 px-4 rounded-full font-bold'>
                            Select Options

                    </button>
                            </div>

                        </div>

                    </div>
                ))
 
            }

          </div>
        </div>

      </div>
    </div>
  )
}

export default Sweets