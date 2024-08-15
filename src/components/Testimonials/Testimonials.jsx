import React from 'react';
import Slider from 'react-slick';
import img1 from '../../assets/Testi/dars.jpg'
import img2 from '../../assets/Testi/seles.jpg'
import img3 from '../../assets/Testi/vash.jpg'
import img4 from '../../assets/Testi/mena.jpg'

const TestimonialData =[
    {
        id: 1,
        name: "Dharshini Croos",
        text: "Excellent products from Mannar by a young Engineer in partnership with an IT expert. Genuine home made products made with love.",
        img: img1,
    },
    {
        id: 2,
        name: "Selestina",
        text: "Yummiest homemade food in town 😍😍",
        img: img2
    },
    {
        id: 3,
        name: "Vashni",
        text: "Premium Quality and Ready to cook Dry fish. Must try 🤤",
        img: img3
    },
    {
        id: 4,
        name: "Menalin",
        text: "Wow. Delicious snacks and sweets😋",
        img: img4
    },
    
]
const Testimonials = () => {

    var settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        autoplay: true,
        autoplaypeed: 2000,
        caseEase: "linear",
        pauseOnHover: true,
        pauseOnFocus: true,
        responsive: [
            {
                breakpoint: 10000,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                   
                },
            },
        ],
    };
  return (
    <div className='py-20 mb-10'>
        <div className='container'>
        <div className='text-center mb-10 max-w-[600px] mx-auto'>
            <p 
            data-aos="fade-up" className='text-sm text-black'>
                What our customers are saying

            </p>
            <h1 data-aos="fade-up"  className='text-3xl font-bold'>Testimonials</h1>
        </div>
            <div data-aos="zoom-in">
                <Slider {...settings}>{
                    TestimonialData.map((data) => (
                        <div className='my-6'>
                        <div
    key={data.id}
    className='flex flex-col gap-4 shadow-lg py-4 px-6 mx-4 mb-6 rounded-xl h-[250px] w-[350px] sm:h-[300px] sm:w-[280px] md:h-[250px] md:w-[300px] lg:h-[280px] lg:w-[460px] relative'
>
    <div className='mb-4 flex left-0'>
        <img
            src={data.img}
            className='rounded-full w-10 h-10 sm:w-18 sm:h-18 md:w-22 md:h-22 lg:w-26 lg:h-26'
        />
    </div>
    <div className='flex flex-col items-center justify-between flex-1'>
        <div className='text-center px-2'>
            <p className='text-sm sm:text-base md:text-sm lg:text-lg text-gray-500'>
                {data.text}
            </p>
        </div>
        <div className='text-center px-2'>
            <h1 className='text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold text-black/80 dark:text-light'>
                {data.name}
            </h1>
        </div>
    </div>
    <p className='text-black/20 text-9xl font-serif absolute top-0 right-0'>
        ''
    </p>
</div>


                        </div>
                    ))
                    }

                </Slider>

            </div>

        </div>

    </div>
  )
}

export default Testimonials