import React from 'react'
import Navbar from './components/Navbar/Navbar'
import First from './components/First/First'
import Products from './components/Products/Products'
import Footer from './components/Footer/Footer'
import AOS from "aos"
import 'aos/dist/aos.css'
import Testimonials from './components/Testimonials/Testimonials'
import Popup from './components/Popup/Popup'
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
    <div className='bg-white  duration-200 '>
      <Navbar handleOrderPopup={handleOrderPopup}/>
      <First handleOrderPopup={handleOrderPopup}/>
      <Products/>
      <Testimonials/>
      <Footer/>
      <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />   
    </div>
  )
}

export default App