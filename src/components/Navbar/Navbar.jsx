import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from "../../assets/multi.svg";
import { IoMdSearch } from "react-icons/io";
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa'; 
import Cart from '../../components/Cart/Cart';

const Navbar = ({ cartItems }) => { // Accept cartItems as props
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleCartClick = () => {
    setCartOpen(!cartOpen); 
  };
  const Menu = [
    { id: 1, name: "Home", link: "/Home" },
    { id: 2, name: "New Arrivals", link: "/NewArrivals" },
    { id: 3, name: "Snacks", link: "/Snacks" },
    { id: 4, name: "Sweets", link: "/Sweets" },
    { id: 5, name: "Nuts", link: "/Nuts" },
    { id: 6, name: "Fruits", link: "/Fruits" },
    { id: 7, name: "Dry Fishes", link: "/DryFishes" },
   
  ];
  return (
    <div className='shadow-md duration-200 relative z-40'>
      <div className='bg-white py-4'>
        <div className='container flex justify-between items-center'>
          <div>
            <NavLink to='/' className='font-bold text-2xl sm:text-4xl flex gap-2'>
              <img src={Logo} alt='Logo' className='w-12 rounded-lg' />
              Multi Flavours
            </NavLink>
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
              onClick={handleCartClick}
              className='bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-black py-1 px-4 rounded-full flex items-center gap-3 group'>
              <span className='group-hover:block transition-all duration-200'>Cart ({cartItems.length})</span> {/* Display cart size */}
              <FaShoppingCart className='text-xl text-black drop-shadow-sm cursor-pointer' />
            </button>
            <button className='sm:hidden text-2xl' onClick={handleMobileMenuToggle}>
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>
      <div
        className={`transition-all duration-300 ease-in-out transform ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden sm:max-h-none sm:opacity-100 sm:flex justify-center`}
      >
        <ul className='sm:flex items-center gap-4 flex-col sm:flex-row'>
          {Menu.map((data) => (
            <li key={data.id} className='hover:translate-x-1'>
              <NavLink 
                to={data.link}
                className={({ isActive }) => 
                  isActive 
                    ? 'inline-block px-4 py-2 text-primary duration-200' 
                    : 'inline-block px-4 py-2 hover:text-primary duration-200'
                }>
                {data.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} cartItems={cartItems} setCartItems={() => {}} /> {/* Pass cartItems to Cart */}
    </div>
  );
};

export default Navbar;
