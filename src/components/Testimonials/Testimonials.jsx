import React from 'react';
import Slider from 'react-slick';
import img1 from '../../assets/Testi/dars.jpg';
import img2 from '../../assets/Testi/seles.jpg';
import img3 from '../../assets/Testi/vashni.jpg';
import img4 from '../../assets/Testi/mena.jpg';

const TestimonialData = [
    {
        id: 1,
        name: "Dharshini Croos",
        text: "Excellent products from Mannar by a young Engineer in partnership with an IT expert. Genuine homemade products made with love.",
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
];

const Testimonials = () => {

    var settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
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
            <div className='container mx-auto px-4'>
                <div className='text-center mb-10 max-w-[600px] mx-auto'>
                    <p data-aos="fade-up" className='text-sm text-black'>
                        What our customers are saying
                    </p>
                    <h1 data-aos="fade-up" className='text-3xl font-bold'>
                        Testimonials
                    </h1>
                </div>
                <div data-aos="zoom-in">
                    <Slider {...settings}>
                        {TestimonialData.map((data) => (
                            <div key={data.id} className='my-6'>
                                <div className='flex flex-col items-center gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl bg-white min-h-[300px]'>
                                    <div className='mb-4'>
                                        <img
                                            src={data.img}
                                            alt={data.name}
                                            className='rounded-full w-20 h-20'
                                        />
                                    </div>
                                    <div className='flex flex-col items-center text-center'>
                                        <p className='text-sm text-gray-500 overflow-hidden text-ellipsis'>
                                            {data.text}
                                        </p>
                                        <h1 className='text-xl font-bold text-black/80'>
                                            {data.name}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default Testimonials;
