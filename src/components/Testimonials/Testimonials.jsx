import React from 'react';
import Slider from 'react-slick';


const TestimonialData =[
    {
        id: 1,
        name: "Maria S.",
        text: "High-quality and delicious. The dry fish adds an amazing depth of flavor to my dishes. Highly recommend for any seafood lover!",
        img: "https://www.perfocal.com/blog/content/images/size/w960/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg",
    },
    {
        id: 2,
        name: "Linda B.",
        text: "Incredible flavors and textures! The sweets are heavenly, and the snacks are always fresh and satisfying. I keep coming back for more.",
        img: "https://expertphotography.b-cdn.net/wp-content/uploads/2018/10/mike-fox-467499-unsplash.jpg",
    },
    {
        id: 3,
        name: "Jason M.",
        text: "These sweets and snacks are simply the best! The variety is fantastic, and everything tastes amazing. Highly recommend!",
        img: "https://media.istockphoto.com/id/1347005975/photo/portrait-of-a-serious-muslim-young-man-looking-at-camera.jpg?s=612x612&w=0&k=20&c=mxRUDCuwDD3ML6-vMaUlTY7Ghqlj2R_LOhWWCB5CTXE=",
    },
    {
        id: 4,
        name: "Hannah W.",
        text: "Exceptional quality! The dry fish is fresh and flavorful. It has elevated my cooking to a whole new level.",
        img: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-2.jpg",
    },
    {
        id: 5,
        name: " Emily J.",
        text: "These peanuts are the best snack ever! Crunchy, fresh, and perfectly roasted. I can't stop munching on them.",
        img: "https://i.pinimg.com/originals/d7/ac/8f/d7ac8f7ec220e555878261e1957dfb83.jpg",
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
                        className='flex flex-col gap-4 shadow-lg py-B px-6 mx-4 rounded-xl'
                        >
                            <div className='mb-4'>
                                <img
                                src={data.img}
                                className='rounded-full w-20 h-20'
                                />

                            </div>
                            <div className='flex flex-col items-center gap-4'>
                                <div className='space-y-3'>
                                <p className='text-sm text-gray-500'>
                                    {data.text}
                                </p>
                                <h1 className='text-xl font-bold text-black/80 dark:text-light'>{data.name}</h1>
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