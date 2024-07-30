import React from 'react'
import dry1 from "../assets/Dryfishes/kat.jpg"
import dry2 from "../assets/Dryfishes/bala.jpg"
import dry3 from "../assets/Dryfishes/sen.jpg"
import dry4 from "../assets/Dryfishes/sp.jpg"


const DryFishesData = [
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

const DryFishes = () => {
  return (
    <div className='mt-14 mb-12'>
    <div className='container'>
      <div className='text-center mb-10 '>
        <h1 className='text-4xl font-bold font-serif'>Dry Fishes</h1>
      </div>
      <div>
        <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-8'>
          {
              DryFishesData.map((data) => (

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

export default DryFishes