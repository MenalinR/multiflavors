import React from 'react'
import nut1 from "../assets/Nuts/nut1.jpg"
import nut2 from "../assets/Nuts/nut2.jpg"
import nut3 from "../assets/Nuts/nut3.jpg"
import nut4 from "../assets/Nuts/nut4.jpg"
import nut5 from "../assets/Nuts/nut5.jpg"

const NutsData = [
  {
      id: 1,
      img: nut1,
      title:"Cashews",
      
  
    },
    {
      id: 2,
      img: nut2,
      title:"Peanuts",
      
  
    },
    {
      id: 3,
      img: nut3,
      title:"Pistachios",
      
  
    },
    {
      id: 4,
      img: nut4,
      title:"Almonds",
      
  
    },
    {
      id: 5,
      img: nut5,
      title:"Walnuts",
      
  
    },
]

const Nuts = () => {
  return (
    <div className='mt-14 mb-12'>
    <div className='container'>
      <div className='text-center mb-10 '>
        <h1 className='text-4xl font-bold font-serif'>Nuts</h1>
      </div>
      <div>
        <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-8'>
        {
                NutsData.map((data) => (

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

export default Nuts