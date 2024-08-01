import React from 'react'
import nut1 from "../assets/Nuts/nut1.jpg"
import nut2 from "../assets/Nuts/nut2.jpg"
import nut3 from "../assets/Nuts/nut3.jpg"
import nut4 from "../assets/Nuts/nut4.jpg"
import nut5 from "../assets/Nuts/nut5.jpg"
import nut6 from "../assets/Nuts/nut6.jpeg"
import snk1 from "../assets/Snacks/snk1.jpg"
import snk5 from "../assets/Snacks/snk5.jpg"
import snk8 from "../assets/Snacks/snk8.jpg"
import swt1 from "../assets/Sweets/swt1.jpg"
import dry1 from "../assets/Dryfishes/kat.jpg"
import dry2 from "../assets/Dryfishes/bala.jpg"
import dry3 from "../assets/Dryfishes/sen.jpg"
import dry4 from "../assets/Dryfishes/sp.jpg"


const NewarrivalData = [
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
    {
      id: 6,
      img: nut6,
      title:"Mixed Nuts",
      
  
    },
    {
      id: 7,
      img: snk1,
      title:"Corn Flour Murukku",
      
  
    },
    {
      id: 8,
      img: snk5,
      title:"Sweet Murukku",
      
  
    },
    {
      id: 9,
      img: snk8,
      title:"Paruthithurai Vadai",
      
  
    },
    {
      id: 10,
      img: swt1,
      title:"Laddu",
      
  
    },
    {
      id: 11,
      img: dry1,
      title:"Katta",
      
  
    },
    {
      id: 12,
      img: dry2,
      title:"Bala",
      
  
    },
    {
      id: 13,
      img: dry3,
      title:"Sengani",
      
  
    },
    {
      id: 14,
      img: dry4,
      title:"Sprats",
      
  
    },
    
  
]
const NewArrivals = () => {
  return (
    <div className='mt-14 mb-12'>
      <div className='container'>
        <div className='text-center mb-10 '>
          <h1 className='text-4xl font-bold font-serif'>New Arrivals</h1>
        </div>
        <div>
          <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-8'>
            {
               NewarrivalData.map((data) => (

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

export default NewArrivals