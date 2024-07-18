import React from 'react';
import FooterLogo from '../../assets/multi.svg';
import Banner from '../../assets/footer.jpg';
import { FaInstagram, FaFacebook, FaLocationArrow, FaMobileAlt } from 'react-icons/fa';

const BannerImg = {
  backgroundImage: `url(${Banner})`,
  backgroundPosition: 'bottom',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  height: '100%',
  width: '100%',
};

const FooterLinks = [
  {
    title: 'Home',
    link: '/#',
  },
  {
    title: 'About',
    link: '/#about',
  },
  {
    title: 'Contact',
    link: '/#contact',
  },
  {
    title: 'Block',
    link: '/#block',
  },
];

const Footer = () => {
  return (
    <div style={BannerImg} className="text-white mb-0">
      <div className="container">
        <div className="grid md:grid-cols-3 py-44 pt-5">
          <div className="py-8 px-4">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
              <img src={FooterLogo} className="w-12 uppercase rounded-full" alt="Footer Logo" />
              Mannar Flavors
            </h1>
            <p>This is the footer</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
            <div className="py-8 px-4">
              <h2 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3">Important Links</h2>
              <ul className="flex flex-col gap-3">
                {FooterLinks.map((link) => (
                  <li
                    className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300"
                    key={link.title}
                  >
                    <a href={link.link}>{link.title}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="py-8 px-4 pl-8">
              <h2 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3">Important Links</h2>
              <ul className="flex flex-col gap-3">
                {FooterLinks.map((link) => (
                  <li
                    className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300"
                    key={link.title}
                  >
                    <a href={link.link}>{link.title}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="py-8 px-4">
              <div className="flex items-center gap-3">
                <a href="#">
                  <FaInstagram className="text-3xl" />
                </a>
                <a href="#">
                  <FaFacebook className="text-3xl" />
                </a>
              </div>

              <div className="mt-6 ">
                <div className="flex items-center gap-5">
                  <FaLocationArrow />
                  <p>Maddumagewatta, Housing Scheme, Nugegoda</p>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <FaMobileAlt />
                  <p>+94 0777031212</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
