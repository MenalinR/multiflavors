import React from 'react';
import img1 from "../../assets/dry.png";
import img2 from "../../assets/mu.png";
import img3 from "../../assets/la.png";
import img4 from "../../assets/n.png";
import img5 from "../../assets/milk.png";

const ProductsData = [
   { id: 1,
    img: img1,
    title:"DryFish",
    color:"white",
    aosDelay: "0",

    },
    { id: 2,
        img: img2,
        title:"Muruku",
        color:"white",
        aosDelay: "200",
    
        },
        { id: 3,
            img: img3,
            title:"Laddu",
            color:"white",
            aosDelay: "400",
        
            },
            { id: 4,
                img: img4,
                title:"Nuts",
                color:"white",
                aosDelay: "600",
            
                },
                { id: 5,
                    img: img5,
                    title:"Sweets",
                    color:"white",
                    aosDelay: "800",
                
                    },

]

const Products = () => {
  return (
    <div className='mt-14 mb-12'>
        <div className='container'>
            <div className='text-center mb-10 max-w-[600px] mx-auto'>

                <h1 data-aos="fade-up"  className='text-4xl font-bold '>Our Products</h1>
            </div>
            <div>
                <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5'>
                    {
                        ProductsData.map((data) => (
                            <div  
                            data-aos="fade-up"
                            data-aos-delay={data.aosDelay}
                            className='space-y-3'>
                                <img 
                                src={data.img}
                                className='h-[220px] w-[200px] object-cover rounded-md '/>

                            <div className='text-center'>
                                <h3 className='font-semibold'>{data.title}</h3>
                            </div>

                            </div>

                        ))
                    }

                </div>
            </div>
        </div>
    </div>
  )
}

export default Products