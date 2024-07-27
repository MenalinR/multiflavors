import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import First from './components/First/First'
import Products from './components/Products/Products'
import Footer from './components/Footer/Footer'
import AOS from "aos"
import 'aos/dist/aos.css'
import Testimonials from './components/Testimonials/Testimonials'
import Popup from './components/Popup/Popup'
import Home from './Pages/Home';
import NewArrivals from './Pages/NewArrivals';
import Snacks from './Pages/Snacks';
import Prawns from './Pages/Prawns';
import Katta from './Pages/Katta';
import Sprats from './Pages/Sprats';
import Thalapath from './Pages/Thalapath';
import Laddu from './Pages/Laddu';
import MilkToffee from './Pages/MilkToffee';
import RichCake from './Pages/RichCake';
import Peanuts from './Pages/Peanuts';
import Cashew from './Pages/Cashew';
import Pistachio from './Pages/Pistachio';
import Almonds from './Pages/Almonds';
import Walnuts from './Pages/Walnuts';
const App = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup( !orderPopup );
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
    <div className='bg-white  duration-200 '>
      <Navbar handleOrderPopup={handleOrderPopup}/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/NewArrivals" element={<NewArrivals />} />
          <Route path="/Snacks" element={<Snacks />} />
          <Route path="/Prawns" element={<Prawns />} />
          <Route path="/Katta" element={<Katta />} />
          <Route path="/Sprats" element={<Sprats />} />
          <Route path="/Thalapath" element={<Thalapath/>} />
          <Route path="/Laddu" element={<Laddu />} />
          <Route path="/MilkToffee" element={<MilkToffee />} />
          <Route path="/RichCake" element={<RichCake />} />
          <Route path="/Peanuts" element={<Peanuts />} />
          <Route path="/Cashew" element={<Cashew />} />
          <Route path="/Pistachio" element={<Pistachio/>} />
          <Route path="/Almonds" element={<Almonds />} />
          <Route path="/Walnuts" element={<Walnuts />} /> 
      </Routes>
      <Footer/>
      <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />   
    </div>
    </Router>
  )
}

export default App