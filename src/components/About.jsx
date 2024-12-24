import React from 'react';
import Title from './Title';
import { FaBook } from "react-icons/fa";    
import { FaCreditCard } from "react-icons/fa";  
import { FaTruck } from "react-icons/fa";    

import about from '../assets/book_image.jpg';

const About = () => {
  return (
    <section className='max-padd-container py-12 xl:py-24'>
      <div className='flexCenter flex-col gap-16 xl:gap-8 xl:flex-row'>
        <div className='flex-1'>
          <Title title1={"Unveiling Our "} title2={"Store's Key Features!"} titleStyles={'pb-10'} paraStyles={'!block'} />
          <div className='flex flex-col items-center gap-y-4'>
            
            <div className='flexCenter gap-x-4'>
              <div className='h-16 min-w-16 bg-secondaryOne flexCenter rounded-md'>
                <FaBook className='text-2xl' />
              </div>
              <div className="">
                <h4 className='medium-18'>A Vast Selection of Books</h4> 
                <p>Explore a wide range of books across various genres, ensuring that you'll find something for every taste. Whether you're looking for the latest bestsellers or timeless classics, we have something for everyone!</p>
              </div>
            </div>

            <div className='flexCenter gap-x-4'>
              <div className='h-16 min-w-16 bg-secondaryOne flexCenter rounded-md'>
                <FaCreditCard className='text-2xl' />
              </div>
              <div className="">
                <h4 className='medium-18'>Secure Payment Options</h4>
                <p>We provide a wide range of secure payment methods to ensure that your transactions are safe and your personal information is protected. Choose from various options like credit/debit cards, digital wallets, and more for a seamless shopping experience.</p>
              </div>
            </div>

            <div className='flexCenter gap-x-4'>
              <div className='h-16 min-w-16 bg-secondaryOne flexCenter rounded-md'>
                <FaTruck className='text-2xl' />
              </div>
              <div className="">
                <h4 className='medium-18'>Easy Returns</h4> 
                <p>If you're not fully satisfied with your purchase, our simple return process allows you to return items hassle-free within a set period. Enjoy a stress-free shopping experience with our no-questions-asked return policy.</p>
              </div>
            </div>
            
          </div>
        </div>
        <div className="flex-1 flexCenter">
  <div className="flexCenter p-6 sm:p-24 sm:max-h-[40rem] sm:max-w-[40rem] w-full h-auto rounded-3xl">
    <img
      src={about}
      alt="aboutImg"
      className="shadow-lg w-full sm:w-[20rem] shadow-secondary rounded-lg object-cover"
    />
  </div>
</div>

      </div>
    </section>
  );
};

export default About;
