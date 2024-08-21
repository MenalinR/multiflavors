import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import AOS from "aos"
import 'aos/dist/aos.css'
import Popup from './components/Popup/Popup'
import Popuppage from './components/Popuppage/Popuppage'
import LPopup from './components/Pagepopups/LPopup'
import Home from './Pages/Home';
import NewArrivals from './Pages/NewArrivals';
import Snacks from './Pages/Snacks';
import Prawns from './Pages/Prawns';
import Sweets from './Pages/Sweets';
import Nuts from './Pages/Nuts';
import Fruits from './Pages/Fruits';
import DryFishes from './Pages/DryFishes';

const App = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);
  const [orderPopuppage, setOrderPopuppage] = React.useState(false);
  const [orderLPopup, setOrderLPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  const handleOrderPopuppage = () => {
    setOrderPopuppage(!orderPopuppage);
  };

  const handleLPopup = () => {
    setOrderLPopup(!orderLPopup);
  };

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
        <Navbar handleOrderPopup={handleOrderPopup} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/NewArrivals" element={<NewArrivals />} />
          <Route path="/Snacks" element={<Snacks  />} />
          <Route path="/Prawns" element={<Prawns />} />
          <Route path="/Sweets" element={<Sweets handleOrderLPopup={handleLPopup} />} />
          <Route path="/Nuts" element={<Nuts />} />
          <Route path="/Fruits" element={<Fruits />} />
          <Route path="/DryFishes" element={<DryFishes />} />
        </Routes>
        <Footer />
        <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
        <Popuppage orderPopuppage={orderPopuppage} setOrderPopuppage={setOrderPopuppage} />
        <LPopup orderLPopup={orderLPopup} setOrderLPopup={setOrderLPopup} />
      </div>
    </Router>
  )
}

export default App
