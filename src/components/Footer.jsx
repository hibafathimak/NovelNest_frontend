import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/book.png';
import { IoMdSend } from "react-icons/io";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className='bg-white py-5 mt-10'>
      <div className='p-6  xl:p-8'>
        <div className='rounded-tr-3xl rounded-tl-3xl pb-4'>
          <h3 className='h3 text-lg'>Discover books that ignite your imagination</h3>
          <p className='text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni, ducimus iste?</p>
          <hr className='my-6 bg-slate-900/30 h-[2px]' />
          {/* container */}
          <div className='flex justify-between flex-wrap gap-4'>
            <div className='max-w-sm'>
              {/* logo */}
              <Link to={'/'} className='flex-1 flex items-center justify-start'>
                <img src={logo} alt="" height={30} width={30} className='hidden sm:flex mr-2' />
                <h4 className='bold-20'>NovelNest</h4>
              </Link>
              <p className='py-2 text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla recusandae voluptatibus excepturi nostrum cum delectus repellat?</p>
              <div className="flex items-center h-[2.5rem] bg-transparent max-w-[180px] rounded-full ring-1 ring-slate-500/5 mb-4 ps-4 px-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent py-3 text-sm outline-none border-none placeholder-gray-400"
                />
                <button className="btn-secondary -ms-20 text-sm rounded-full">
                  <IoMdSend className='text-xl' />
                </button>
              </div>
            </div>

            {/* Footer Links */}
            <div className='flex justify-between flex-wrap gap-6'>
              <FooterColumn title="Learn More">
                <ul className='flex flex-col gap-2 regular-14 text-gray-20'>
                  <Link to='/about-us'>About Us</Link>
                  <Link to='/latest-books'>Latest Books</Link>
                  <Link to='/hot-offers'>Hot Offers</Link>
                  <Link to='/popular-books'>Popular Books</Link>
                  <Link to='/faq'>FAQ</Link>
                  <Link to='/privacy-policy'>Privacy Policy</Link>
                </ul>
              </FooterColumn>
              <FooterColumn title="Our Community">
                <ul className='flex flex-col gap-2 regular-14 text-gray-20'>
                  <Link to='/terms-and-conditions'>Terms and Conditions</Link>
                  <Link to='/special-offers'>Special Offers</Link>
                  <Link to='/customer-reviews'>Customer Reviews</Link>
                </ul>
              </FooterColumn>
              <FooterColumn title="Contact Us">
                <div className='flex flex-col gap-2'>
                  <Link to='/' className='flex gap-2 md:flex-col lg:flex-row'>
                    <p className='text-sm'>Contact Number:</p><p className='bold-15 text-sm'>123-456-7890</p>
                  </Link>
                  <Link to='mailto:info@NovelNest.com' className='flex gap-2 md:flex-col lg:flex-row'>
                    <p className='text-sm'>Email Address:</p><p className='bold-15 text-sm'>info@NovelNest.com</p>
                  </Link>
                </div>
              </FooterColumn>
              <FooterColumn title="Social">
                <ul className='flex gap-4'>
                  <Link to='https://facebook.com'><FaFacebook className='text-xl' /></Link>
                  <Link to='https://instagram.com'><FaInstagram className='text-xl' /></Link>
                  <Link to='https://twitter.com'><FaTwitter className='text-xl' /></Link>
                  <Link to='https://youtube.com'><FaYoutube className='text-xl' /></Link>
                  <Link to='https://linkedin.com'><FaLinkedin className='text-xl' /></Link>
                </ul>
              </FooterColumn>
            </div>
          </div>
        </div>
      </div>
      {/* copyrights */}
      <div className='text-dark bg-primary medium-14 py-1 px-6 mx-4 flex justify-between items-center'>
        <span className='text-sm'>2024 NovelNest</span>
        <span className='text-secondaryOne text-sm'>All rights reserved</span>
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, children }) => {
  return (
    <div className='flex flex-col gap-4'>
      <h4 className='bold-16 text-secondaryOne'>{title}</h4>
      {children}
    </div>
  );
};

export default Footer;
