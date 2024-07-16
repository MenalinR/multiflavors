import React from 'react'
import FooterLogo from "../../assets/mnr.svg";
import  Banner from "../../assets/footer.jpg"

const BannerImg = {
    backgroundImage: ` url(${Banner})`,
    backgroundPosition: "bottom",
    backgroundRepeat: "no-repeat",
    backgroundSize:"cover",
    height:"100%",
    width:"100%",
};

const FooterLinks = [
    {
        title: "Home",
        link: "/#",
    },
    {
        title: "About",
        link: "/#about",
    },
    {
        title: "Contact",
        link: "/#contact",
    },
    {
        title: "Block",
        link: "/#block",
    },
]
const Footer = () => {
  return (
    <div style={BannerImg} 
    className='text-white mb-0'>
        <div className='container'>
            <div className='grid md:grid-cols-3 pv-44 pt-5'>
                <div className='py-8 px-4'>
                    <h1 className='sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3'>
                        <img src={FooterLogo}
                        className='w-12 uppercase rounded-full' />
                        Mannar Flavors</h1>
                    <p>
                        hefjehtrhjrn
                    </p>
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10'>
                    <div>
                        <div className='py-8 px-4'>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Footer