import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../assets/multi.svg";
import { IoMdSearch } from "react-icons/io";
import { FaCaretDown, FaCartShopping, FaBars } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';

const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/Home",
  },
  {
    id: 2,
    name: "New Arrivals",
    link: "/NewArrivals",
  },
  {
    id: 3,
    name: "Snacks",
    link: "/Snacks",
  },
  {
    id: 4,
    name: "Fried prawns",
    link: "/Prawns",
  },
  {
    id: 5,
    name: "Sweets",
    link: "/Sweets",
  },
  {
    id: 6,
    name: "Nuts",
    link: "/Nuts",
  },
  {
    id: 7,
    name: "Dry Fishes",
    link: "/DryFishes",
  },
];

const Navbar = ({ handleOrderPopup }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className='shadow-md duration-200 relative z-40'>
      {/* upper Navbar */}
      <div className='bg-white py-4'>
        <div className='container flex justify-between items-center'>
          <div>
            <Link to='/' className='font-bold text-2xl sm:text-4xl flex gap-2'>
              <img src={Logo} alt='Logo' className='w-12 rounded-lg' />
              Multi Flavours
            </Link>
          </div>
          <div className='flex justify-between items-center gap-4'>
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder='search'
                className='w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary'
              />
              <IoMdSearch className='text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3' />
            </div>
            <button
              onClick={() => handleOrderPopup()}
              className='bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-black py-1 px-4 rounded-full flex items-center gap-3 group'>
              <span className='group-hover:block transition-all duration-200'>Order</span>
              <FaCartShopping className='text-xl text-black drop-shadow-sm cursor-pointer' />
            </button>
            <button className='sm:hidden text-2xl' onClick={handleMobileMenuToggle}>
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* lower Navbar */}
      <div className={`flex justify-center ${mobileMenuOpen ? 'block' : 'hidden'} sm:flex`}>
        <ul className='sm:flex items-center gap-4 flex-col sm:flex-row'>
          {
            Menu.map((data) => (
              <li key={data.id} className='hover:translate-x-1'>
                <Link to={data.link}
                  className='inline-block px-4 py-2 hover:text-primary duration-200'>{data.name}</Link>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
