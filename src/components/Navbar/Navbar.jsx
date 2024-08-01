import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../assets/multi.svg";
import { IoMdSearch } from "react-icons/io";
import { FaCaretDown, FaCartShopping } from 'react-icons/fa6';
// import DarkMode from './DarkMode';

const Menu =[
    {
        id:1,
        name:"Home",
        link:"/Home",
        
    },
    {
        id:2,
        name:"New Arrivals",
        link:"/NewArrivals",
    },
    {
        id:3,
        name:"Snacks",
        link:"/Snacks",
    },
   
    {
        id:4,
        name:"Fried prawns",
        link:"/Prawns",
    },
    {
        id:5,
        name:"Sweets",
        link:"/Sweets",
    },
    {
        id:6,
        name:"Nuts",
        link:"/Nuts",
    },
    {
        id:7,
        name:"Dry Fishes",
        link:"/DryFishes",
    },

]
// const DropdownLinks = [
//     {
//         id:1,
//         name:"Dried Katta ",
//         link:"/Katta ",
//     },
//     {
//         id:2,
//         name:"Dried Sprats",
//         link:"/Sprats",
//     },
//     {
//         id:3,
//         name:"Dried Thalapath",
//         link:"/Thalapath",
//     },
// ];

// const SweetsDropdownLinks = [
//     {
//         id:1,
//         name:"Laddu",
//         link:"/Laddu",
//     },
//     {
//         id:2,
//         name:"Milk Toffee",
//         link:"/MilkToffee",
//     },
//     {
//         id:3,
//         name:"Rich Cake",
//         link:"/RichCake",
//     },
// ];

// const NutsDropdownLinks = [
//     {
//         id:1,
//         name:"Peanuts",
//         link:"/Peanuts",
//     },
//     {
//         id:2,
//         name:"Cashew",
//         link:"/Cashew",
//     },
//     {
//         id:3,
//         name:"Pistachio",
//         link:"/Pistachio",
//     },
//     {
//         id:4,
//         name:"Almonds",
//         link:"/Almonds",
//     },
//     {
//         id:5,
//         name:"Walnuts",
//         link:"/Walnuts",
//     },

// ];

const Navbar = ({handleOrderPopup}) => {
  return (
    <div className='shadow-md  duration-200 relative z-40'>
        {/* upper Navbar */}
        <div className='bg-white py-4'>
            <div className='container flex justify-between items-center'>
                <div>
                    <Link to='/'  className='font-bold text-2xl sm:text-4xl flex gap-2'>
                        <img src={Logo} alt='Logo'
                        className='w-12 rounded-lg' />
                        Multi Flavours
                    </Link>
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
                onClick={() => handleOrderPopup() }
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
        <div data-aos="zoom-in" className='flex justify-center'>
            <ul className='sm:flex hidden items-center gap-4 '>
                {
                    Menu.map((data) => (
                        <li key={data.id} className='hover:translate-x-1'>
                            <Link to={data.link}
                            className='inline-block px-4 hover:text-primary duration-200'>{data.name}</Link>
                            </li>
                    ))
                }
                
                {/* {
                    <li className='group relative cursor-pointer hover:translate-x-1'>
                        <a
                        href='#'
                        className='flex items-center gap-[2px] py-2 hover:text-primary '> Sweets
                        <span>
                            <FaCaretDown
                            className='transition-all duration-200 group-hover:rotate-180' />
                            </span></a>
                            <div className='absolute z-[9999] hidden group-hover:block w-[150px] rounded-md bg-white p-2 text-black shadow-md'>
                                <ul>
                                    {SweetsDropdownLinks.map((data)=>(
                                        <li key={data.id} className='hover:translate-x-1'>
                                            <Link to={data.link}
                                            className='inline-block w-full rounded-md p-2 hover:bg-primary/20'>
                                                {data.name}
                                            </Link>

                                            
                                        </li>

                                        
                                    ))}
                                    </ul>
                            </div>
                    </li>
                }
                {
                    <li className='group relative cursor-pointer hover:translate-x-1'>
                        <a
                        href='#'
                        className='flex items-center gap-[2px] py-2 hover:text-primary '> Nuts
                        <span>
                            <FaCaretDown
                            className='transition-all duration-200 group-hover:rotate-180' />
                            </span></a>
                            <div className='absolute z-[9999] hidden group-hover:block w-[150px] rounded-md bg-white p-2 text-black shadow-md'>
                                <ul>
                                    {NutsDropdownLinks.map((data)=>(
                                        <li key={data.id} className='hover:translate-x-1'>
                                            <Link to={data.link}
                                            className='inline-block w-full rounded-md p-2 hover:bg-primary/20'>
                                                {data.name}
                                            </Link >

                                            
                                        </li>

                                        
                                    ))}
                                    </ul>
                            </div>
                    </li>
                }

{
                    <li className='group relative cursor-pointer hover:translate-x-1'>
                        <a
                        href='#'
                        className='flex items-center gap-[2px] py-2 hover:text-primary '> Dry Fishes
                        <span>
                            <FaCaretDown
                            className='transition-all duration-200 group-hover:rotate-180' />
                            </span></a>
                            <div className='absolute z-[9999] hidden group-hover:block w-[150px] rounded-md bg-white p-2 text-black shadow-md'>
                                <ul>
                                    {DropdownLinks.map((data)=>(
                                        <li key={data.id} className='hover:translate-x-1'>
                                            <Link to={data.link}
                                            className='inline-block w-full rounded-md p-2 hover:bg-primary/20'>
                                                {data.name}
                                            </Link>

                                            
                                        </li>

                                        
                                    ))}
                                    </ul>
                            </div>
                    </li>
                } */}
            </ul>
        </div>
    </div>
    </div>
  );
};

export default Navbar;