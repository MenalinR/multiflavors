import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import AOS from "aos";
import 'aos/dist/aos.css';
import Home from './Pages/Home';
import NewArrivals from './Pages/NewArrivals';
import Snacks from './Pages/Snacks';
import Prawns from './Pages/Prawns';
import Sweets from './Pages/Sweets';
import Nuts from './Pages/Nuts';
import Fruits from './Pages/Fruits';
import DryFishes from './Pages/DryFishes';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout'

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Function to toggle the cart visibility
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  // Function to add an item to the cart
  const handleAddToCart = (item) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      
      // Find the index of the item with the same ID and selectedValue
      const existingItemIndex = updatedItems.findIndex(
        (cartItem) =>
          cartItem.id === item.id && cartItem.selectedValue === item.selectedValue
      );
  
      if (existingItemIndex >= 0) {
        // Update quantity and total price for the existing item
        const existingItem = updatedItems[existingItemIndex];
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + item.quantity,
          totalPrice: (existingItem.quantity + item.quantity) * existingItem.price * existingItem.selectedValue
        };
      } else {
        // Add a new item to the cart
        updatedItems.push({
          ...item,
          totalPrice: item.price * item.quantity * item.selectedValue
        });
      }
  
      // Ensure no duplicate entries with the same quantity for the same item
      return updatedItems.reduce((acc, curr) => {
        const existing = acc.find(
          (item) =>
            item.id === curr.id &&
            item.selectedValue === curr.selectedValue
        );
        if (existing) {
          existing.quantity += curr.quantity;
          existing.totalPrice = existing.quantity * existing.price * existing.selectedValue;
        } else {
          acc.push(curr);
        }
        return acc;
      }, []);
    });
  };
  
  
  const handleDeleteItem = (id) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  return (
    <Router>
      <div className='bg-white duration-200'>
        <Navbar cartItems={cartItems} toggleCart={toggleCart} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/NewArrivals" element={<NewArrivals addToCart={handleAddToCart} />} />
          <Route path="/Snacks" element={<Snacks addToCart={handleAddToCart} />} />
          <Route path="/Sweets" element={<Sweets addToCart={handleAddToCart} />} />
          <Route path="/Nuts" element={<Nuts addToCart={handleAddToCart} />} />
          <Route path="/Fruits" element={<Fruits addToCart={handleAddToCart} />} />
          <Route path="/DryFishes" element={<DryFishes addToCart={handleAddToCart} />} />
          <Route path="/Cart" element={<Cart
            isOpen={isCartOpen}
            onClose={toggleCart}
            cartItems={cartItems}
            onDelete={handleDeleteItem}
          />} />
          <Route path="/Checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
