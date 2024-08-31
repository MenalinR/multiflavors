import React from 'react'
import snk5 from "../assets/Snacks/snk5.jpg"
import snk8 from "../assets/Snacks/snk8.jpg"
import dry1 from "../assets/Dryfishes/sambol.jpg"
import swt1 from "../assets/Sweets/swt4.jpg"
import snk7 from "../assets/Snacks/snk7.jpg"

const NewarrivalData = [
  {
      id: 1,
      img: snk5,
      title:"Sweet Murukku",
      
  
    },
    {
      id: 2,
      img: snk8,
      title:"Point pedro Vadai",
      
  
    },
    {
      id: 3,
      img: dry1,
      title:"Maldive fish sambol",
      
  
    },
    {
      id: 4,
      img: swt1,
      title:"Dates Sweet",
      
  
    },
    { id: 5, 
      img: snk7,
       title: "Pakoda"
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