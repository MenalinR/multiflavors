import React from 'react';
import Dryfish from "../../assets/dryfish.jpg";
import Snacks from "../../assets/snacks.jpg";
import Sweets from "../../assets/sweet.jpg";
import Slider from "react-slick";

const ImageList = [
    {
        id: 1,
        img: Dryfish,
        title:"Enhance Your Recipes with Our High-Quality Dry Seafood!",
        description:
        "Discover the secret to exceptional cooking with our premium dry seafood products. Carefully processed to maintain their taste and nutritional value, our dry seafood is perfect for a wide range of dishes. Whether you're making a hearty seafood stew or a simple rice dish, our products will add a burst of ocean-fresh flavor that will leave everyone craving more."

    },
    {
        id: 2,
        img: Sweets,
        title:"Experience the Magic of Our Handmade Sweets!",
        description:
        "Delight in the craftsmanship of our handmade sweets, where tradition meets innovation. Our collection features a variety of flavors and textures, from classic caramels to unique, artisanal candies. Perfect for gifting or indulging, our sweets are a testament to the art of confectionery."
        
    },
    {
        id: 3,
        img: Snacks,
        title:"Crunch into Happiness with Our Delicious Snacks!",
        description:
        "Discover a world of flavor with our wide variety of snacks. Whether you crave something salty, sweet, or savory, we have the perfect treat for every taste. Made with the finest ingredients, our snacks are perfect for any time of day, ensuring you always have something delicious to munch on."
        
    },
    

]
const First = () => {
    var settings= {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 800,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "ease-in-out",
        pauseOnHover: false,
        pauseOnFocus: true,
    };
  return (
    <div className='relative overflow-hidden min-h-[550px] size-min-h-[650px] bg-gray-100 flex justify-center items-center  dark:text-white duration-200'>
        <div className='h-[700px] bg-primary/40 absolute -top-1/2 right-0 rounded-3xl rotate-45 -z-9'>

        </div>
        <div className='container pb-8 sm:pb-0'>
            <Slider {...settings}>
                {ImageList.map((data) => (
                    <div>
                    <div className='grid grid-cols-1 sm:grid-cols-2'>
                        <div className='flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10'>
                           <h1 
                            data-aos="zoom-in"
                            data-aos-duration="500"
                            data-aos-once="true"
                           className='text-5xl sm:text-6xl lg:text-7xl font-bold text-black'>
                            {data.title}
    
                           </h1>
                           <p 
                             data-aos="fade-up"
                            data-aos-duration="500"
                            data-aos-delay="100"
                           className='text-sm text-black'>
                           {data.description}
    
                           </p>
                            <div
                             data-aos="fade-up"
                             data-aos-duration="500"
                             data-aos-delay="300"
                            >
                                {/* <button className='bg-gradient-to-r from-black to-black hover:scale-105 duration-200 text-white py-2 px-4 rounded-full font-bold'
                                    onClick={() => handleOrderPopup() }>
                                    Order Now
                                </button> */}
                            </div>
                        </div>
                        <div className='order-1 sm:order-2 '>
                            <div 
                            data-aos="zoom-in"
                            data-aos-once="true"
                            className='relative z-10 '>
                               <img src={data.img} 
                               className='w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-105 lg:scale-120  object-contain mx-auto'/>
                            </div>
                        </div>
    
                    </div>
    
                </div>

                ))}
            
            </Slider>

        </div>
    </div>
  )
}

export default First