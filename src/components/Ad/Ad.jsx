import React from 'react';
import Slider from 'react-slick';
import Ad1 from '../../assets/Ad/ad1.jpg';
import Ad2 from '../../assets/Ad/ad2.jpg';
import Ad3 from '../../assets/Ad/ad3.jpg';
import Ad4 from '../../assets/Ad/ad4.jpg';
import Ad5 from '../../assets/Ad/ad5.jpg';
import Ad6 from '../../assets/Ad/ad6.png';
import Ad7 from '../../assets/Ad/ad7.png';
import Ad8 from '../../assets/Ad/ad8.png';
import Ad9 from '../../assets/Ad/ad9.png';
import Ad10 from '../../assets/Ad/ad10.png';

const AdData = [
    { id: 1, img: Ad1 },
    { id: 2, img: Ad2 },
    { id: 3, img: Ad3 },
    { id: 4, img: Ad4 },
    { id: 5, img: Ad5 },
];

const AdDatas = [
    { id: 1, img: Ad6 },
    { id: 2, img: Ad7 },
    { id: 3, img: Ad8 },
    { id: 4, img: Ad9 },
    { id: 5, img: Ad10 },
];

const Ad = () => {
    const settings = {
        dots: true,
        arrows: true, // Enable arrows
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: 'linear',
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
        <div className="mt-16 mb-10">
            <div className="container mx-auto px-4">
                {/* Dry Nuts Slider */}
                <div className="text-center mb-10 max-w-[600px] mx-auto">
                    <h1 data-aos="fade-up" className="text-3xl font-bold">Dry Nuts</h1>
                </div>
                <Slider {...settings}>
                    {AdData.map((data, index) => (
                        <div key={index} className="px-2">
                            <img
                                src={data.img}
                                alt={`Dry Nut ${index + 1}`}
                                className="h-[250px] sm:h-[300px] md:h-[350px] w-full object-contain rounded-md"
                            />
                        </div>
                    ))}
                </Slider>

                {/* Snacks Slider */}
                <div className="text-center mb-10 max-w-[600px] mx-auto pt-12">
                    <h1 data-aos="fade-up" className="text-3xl font-bold">Snacks</h1>
                </div>
                <Slider {...settings}>
                    {AdDatas.map((data, index) => (
                        <div key={index} className="px-2">
                            <img
                                src={data.img}
                                alt={`Snack ${index + 1}`}
                                className="h-[250px] sm:h-[300px] md:h-[350px] w-full object-contain rounded-md"
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Ad;
