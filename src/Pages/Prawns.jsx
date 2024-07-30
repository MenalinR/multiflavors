import React from 'react'
import Prowns from '../assets/Prawns.jpeg'

const Prawns = () => {
  return (
    <div className='mt-14 mb-12'>
      <div className='container'>
        <div className='text-center mb-10 '>
          <h1 className='text-4xl font-bold font-serif'>Prawns</h1>
        </div>
        <div>
          <div className='flex items-center space-x-10'>
            
<img class="h-auto max-w-xl rounded-lg shadow-xl dark:shadow-gray-800" src={Prowns} alt="image description" />
<div className='pl-10'>
<div className='pl-5'>
<h3>Fried Prawns</h3>

</div>
<div className='py-5'>
<button className='bg-gradient-to-r from-black to-black hover:scale-105 duration-200 text-white py-2 px-4 rounded-full font-bold'>
Select Options
</button></div>
</div>


          </div>
        </div>

      </div>
    </div>
  )
}

export default Prawns