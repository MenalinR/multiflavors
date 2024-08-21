import React from 'react'
// import Testimonials from '../components/Testimonials/Testimonials'
import First from '../components/First/First'
import Products from '../components/Products/Products'
import Ad from '../components/Ad/Ad'


const Home = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup( !orderPopup );
  };
  return (
    <div>
      <First handleOrderPopup={handleOrderPopup} />
      <Products/>
      <Ad />
      {/* <Testimonials/> */}
      
    </div>
  )
}

export default Home