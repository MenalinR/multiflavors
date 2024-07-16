import React from 'react';
import Logo from "../../assets/mnr.svg";
import { IoMdSearch } from "react-icons/io";
import { FaCaretDown, FaCartShopping } from 'react-icons/fa6';
// import DarkMode from './DarkMode';

const Menu =[
    {
        id:1,
        name:"Home",
        link:"/#",
    },
    {
        id:2,
        name:"New Arrivals",
        link:"/#services",
    },
    {
        id:3,
        name:"Sweets",
        link:"/#",
    },
    {
        id:4,
        name:"Snacks",
        link:"/#",
    },
    {
        id:5,
        name:"Fried prawns",
        link:"/#",
    },

]
const DropdownLinks = [
    {
        id:1,
        name:"Dried Katta ",
        link:"/#services",
    },
    {
        id:2,
        name:"Dried Sprats",
        link:"/#services",
    },
    {
        id:2,
        name:"Dried Thalapath",
        link:"/#services",
    },
];

const Navbar = () => {
  return (
    <div className='shadow-md  duration-200 relative z-40'>
        {/* upper Navbar */}
        <div className='bg-primary/40 py-4'>
            <div className='container flex justify-between items-center'>
                <div>
                    <a href='#' className='font-bold text-2xl sm:text-3xl flex gap-2'>
                        <img src={Logo} alt='Logo'
                        className='w-12 uppercase rounded-full' />
                        Mannar Flavors
                    </a>
                </div>
                <div className='flex justify-between items-center gap-4'>
                    <div className="relative group hidden sm:block">
                        <input type="text"
                        placeholder='search'
                        className='w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary '
                         />
                         <IoMdSearch className='text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3'/>
                    </div>
                    <button
                onClick={() => alert("Ordering not available yet")}
                className='bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-black py-1 px-4 rounded-full flex items-center gap-3 group'>
                    <span className='group-hover:block  transition-all duration-200'>Order</span>
                    <FaCartShopping className='text-xl text-black drop-shadow-sm cursor-pointer'/>
                </button>
                {/* <div>
                     <DarkMode/> 
                </div> */}
            </div>
        </div>

        {/* lower Navbar */}
        <div className='flex justify-center'>
            <ul className='sm:flex hidden items-center gap-4'>
                {
                    Menu.map((data) => (
                        <li key={data.id}>
                            <a href={data.link}
                            className='inline-block px-4 hover:text-primary duration-200'>{data.name}</a>
                            </li>
                    ))
                }
                {
                    <li className='group relative cursor-pointer'>
                        <a
                        href='#'
                        className='flex items-center gap-[2px] py-2'> Dry Fishes
                        <span>
                            <FaCaretDown
                            className='transition-all duration-200 group-hover:rotate-180' />
                            </span></a>
                            <div className='absolute z-[9999] hidden group-hover:block w-[150px] rounded-md bg-white p-2 text-black shadow-md'>
                                <ul>
                                    {DropdownLinks.map((data)=>(
                                        <li key={data.id}>
                                            <a href={data.link}
                                            className='inline-block w-full rounded-md p-2 hover:bg-primary/20'>
                                                {data.name}
                                            </a>
                                        </li>
                                    ))}
                                    </ul>
                            </div>
                    </li>
                }
            </ul>
        </div>
    </div>
    </div>
  );
};

export default Navbar;