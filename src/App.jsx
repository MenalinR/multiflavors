import React from 'react'
import Navbar from './components/Navbar/Navbar'
import First from './components/First/First'
import Products from './components/Products/Products'
import Footer from './components/Footer/Footer'
import AOS from "aos"
import 'aos/dist/aos.css'
import Testimonials from './components/Testimonials/Testimonials'
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
    <div>
      <Navbar/>
      <First/>
      <Products/>
      <Testimonials/>
      <Footer/>
    
    </div>
  )
}

export default App