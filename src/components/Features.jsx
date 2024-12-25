import React from 'react';
import filter from "../assets/features/filter.png";
import rating from "../assets/features/rating.png";
import wishlist from "../assets/features/wishlist.png";
import secure from "../assets/features/secure.png";
import Title from './Title';

const Features = () => {
  return (
    <section className='max-padd-container py-32'>
      <Title title1={'Features '} title2={'of our website'} titleStyles={'pb-10 mb-10'} paraStyles={'!block'} />
      <div className='max-padd-container grid grid-cols-2  lg:grid-cols-4 gap-5 gap-y-12'>
        
        <div className="flexCenter flex-col gap-3">
          <img src={filter} alt="" height={44} width={44} />
          <div className='flexCenter flex-col'>
            <h5 className='h5 text-center'>Advanced Search and Filters</h5>
            <hr className='w-8 bg-secondary h-1 rounded-full border-none mb-2' />
            <p className='text-center'>
              Easily locate your desired books with search and filter options for genres, authors, and price ranges.
            </p>
          </div>
        </div>
        
        <div className="flexCenter flex-col gap-3">
          <img src={rating} alt="" height={44} width={44} />
          <div className='flexCenter flex-col'>
            <h5 className='h5 text-center'>Customer Ratings and Reviews</h5>
            <hr className='w-8 bg-secondary h-1 rounded-full border-none mb-2' />
            <p className='text-center'>
              Read honest customer feedback, ratings, and reviews to make well-informed purchase decisions.
            </p>
          </div>
        </div>
        
        <div className="flexCenter flex-col gap-3">
          <img src={wishlist} alt="" height={44} width={44} />
          <div className='flexCenter flex-col'>
            <h5 className='h5 text-center'>Wishlist Management</h5>
            <hr className='w-8 bg-secondary h-1 rounded-full border-none mb-2' />
            <p className='text-center'>
              Save your preferred books to a wishlist for quick access and easy purchase at any time.
            </p>
          </div>
        </div>
        
        <div className="flexCenter flex-col gap-3">
          <img src={secure} alt="" height={44} width={44} />
          <div className='flexCenter flex-col'>
            <h5 className='h5 text-center'>Secure Shopping Experience</h5>
            <hr className='w-8 bg-secondary h-1 rounded-full border-none mb-2' />
            <p className='text-center'>
              Enjoy peace of mind knowing that your data and transactions are always securely handled.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Features;
