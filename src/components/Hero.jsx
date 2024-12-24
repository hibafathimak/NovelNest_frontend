import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import bg from '../assets/book3.png';
import book1 from '../assets/book_4.jpg';
import book2 from '../assets/book_5.jpg';
import book4 from '../assets/book_7.jpg';
import pencil from '../assets/pencil.png';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxStyle = (offset) => ({
    transform: `translateY(${scrollY * offset}px)`,
  });

  return (
    <section className="max-padd-container py-20 xl:py-36">
      <div className="flexCenter flex-col gap-12 xl:flex-row">
        {/* Left Section */}
        <div className="flex flex-1 flex-col pt-12 xl:pt-32">
          <h1 className="h1 max-w-[46rem]">
            Discover{' '}
            <span className="inline-flex">
              <span className="inline-flex items-center justify-center p-5 h-16 bg-secondary w-16 text-white -rotate-[30deg] rounded-full">
                B
              </span>
              ooks
            </span>{' '}
            <img
              src={pencil}
              height={49}
              width={49}
              className="inline-flex relative bottom-2"
              alt="Pencil Icon"
            />{' '}
            That Inspire Your World
          </h1>
          <p>
            Discover a world of stories, knowledge, and inspiration at your fingertips.
            From captivating novels to insightful non-fiction, our collection has
            something for every reader. Explore, shop, and bring home your next great
            read today!
          </p>
          <div className="mt-6">
            <Link className="btn-secondaryOne" to={'/store'}>
              Explore Now
            </Link>
          </div>
        </div>

        <div className="flex flex-1 relative z-10 top-12 sm:top-0 lg:left-10">
          <div className="relative">
            <img
              className="absolute hidden lg:block top-0 left-4 lg:top-1/2 lg:-left-10 w-[80px] lg:w-[100px] rounded-lg"
              src={book1}
              style={parallaxStyle(-0.2)}
              alt="Book 1"
            />
            <img
              className="absolute hidden lg:block bottom-8 lg:bottom-5 lg:-right-10 w-[80px] lg:w-[100px] rounded-lg"
              src={book4}
              style={parallaxStyle(0.2)}
              alt="Book 4"
            />
            <img
              className="absolute hidden lg:block top-10 right-12 lg:-top-10 lg:right-5 w-[80px] lg:w-[100px] rounded-lg"
              src={book2}
              style={parallaxStyle(-0.15)}
              alt="Book 2"
            />
            <img
              className="rounded-2xl w-[300px] lg:w-[450px]"
              src={bg}
              alt="Background"
            />
          
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
