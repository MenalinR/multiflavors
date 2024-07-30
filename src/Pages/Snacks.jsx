import React from 'react'
import snk1 from "../assets/Snacks/snk1.jpg"
import snk2 from "../assets/Snacks/snk2.jpeg"
import snk3 from "../assets/Snacks/snk3.png"
import snk4 from "../assets/Snacks/snk4.jpg"
import snk5 from "../assets/Snacks/snk5.jpg"
import snk6 from "../assets/Snacks/snk6.jpg"
import snk7 from "../assets/Snacks/snk7.jpg"
import snk8 from "../assets/Snacks/snk8.jpg"
import snk9 from "../assets/Snacks/snk9.jpg"
import snk10 from "../assets/Snacks/snk10.jpg"

const SnacksData = [
  {
    id: 1,
    img: snk1,
    title:"Corn Flour Murukku",
    

  },
  {
    id: 2,
    img: snk2,
    title:"Thenkuzhal Murukku"

  },
  {
    id: 3,
    img: snk3,
    title:"snack"

  },
  {
    id: 4,
    img: snk4,
    title:"snack"

  },
  {
    id: 5,
    img: snk5,
    title:"Sweet Murukku"

  },
  {
    id: 6,
    img: snk6,
    title:"snack"

  },
  {
    id: 7,
    img: snk7,
    title:"Garlic Ribbon Pakoda"

  },
  {
    id: 8,
    img: snk8,
    title:"Paruthithurai Vadai"

  },
  {
    id: 9,
    img: snk9,
    title:"snack"

  },
  {
    id: 10,
    img: snk10,
    title:"Dark Sweet Murukku"

  },
]
const Snacks = () => {
  return (
    <div className='mt-14 mb-12'>
      <div className='container'>
        <div className='text-center mb-10 '>
          <h1 className='text-4xl font-bold font-serif'>Snacks</h1>
        </div>
        <div>
          <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5'>
            {
              SnacksData.map((data) => (
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

export default Snacks