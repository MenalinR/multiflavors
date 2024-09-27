import React from 'react';
import { Link } from 'react-router-dom';
import img1 from "../../assets/dry.png";
import img2 from "../../assets/muuu.png";
import img3 from "../../assets/laa.png";
import img4 from "../../assets/n.png";
import img5 from "../../assets/dr.png";

const ProductsData = [
   { id: 1,
    img: img1,
    title:"DryFish",
    color:"white",
    aosDelay: "0",
    link: "/DryFishes"
    },
    { id: 2,
        img: img2,
        title:"Snacks",
        color:"white",
        aosDelay: "200",
         link: "/Snacks"
    },
    { id: 3,
        img: img3,
        title:"Sweets",
        color:"white",
        aosDelay: "400",
         link: "/Sweets"
    },
    { id: 4,
        img: img4,
        title:"Nuts",
        color:"white",
        aosDelay: "600",
         link: "/Nuts"
    },
    { id: 5,
        img: img5,
        title:"Fruits",
        color:"white",
        aosDelay: "800",
         link: "/Fruits"
    },
];

const Products = () => {
  return (
    <div className='mt-14 mb-12'>
        <div className='container mx-auto px-4'>
            <div className='text-center mb-10 max-w-[600px] mx-auto'>
                <h1 data-aos="fade-up"  className='text-4xl font-bold '>Our Products</h1>
            </div>
            <div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 place-items-center'>
                    {ProductsData.map((data) => (
                        <div 
                          key={data.id}
                          data-aos="fade-up"
                          data-aos-delay={data.aosDelay}
                          className='space-y-3'
                        >
                            <Link to={data.link}>
                              <img 
                                src={data.img}
                                alt={data.title}
                                className='w-full h-[230px] object-cover rounded-md transition duration-300 ease-in-out transform hover:scale-105' 
                              />
                              <div className='text-center'>
                                <h3 className='font-semibold'>{data.title}</h3>
                              </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default Products;
