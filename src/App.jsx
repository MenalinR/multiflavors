import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import AOS from "aos"
import 'aos/dist/aos.css'
import Home from './Pages/Home';
import NewArrivals from './Pages/NewArrivals';
import Snacks from './Pages/Snacks';
import Prawns from './Pages/Prawns';
import Sweets from './Pages/Sweets';
import Nuts from './Pages/Nuts';
import Fruits from './Pages/Fruits';
import DryFishes from './Pages/DryFishes';
import Cart from './components/Cart/Cart'

const App = () => {
  

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <Router>
      <div className='bg-white duration-200'>
        <Navbar  />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/NewArrivals" element={<NewArrivals />} />
          <Route path="/Snacks" element={<Snacks  />} />
          <Route path="/Prawns" element={<Prawns />} />
          <Route path="/Sweets" element={<Sweets  />} />
          <Route path="/Nuts" element={<Nuts />} />
          <Route path="/Fruits" element={<Fruits />} />
          <Route path="/DryFishes" element={<DryFishes />} />
          <Route path="/Cart" element={<Cart />} />
        </Routes>
        <Footer />
       
      </div>
    </Router>
  )
}

export default App
