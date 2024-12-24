import React, {  useEffect, useState } from 'react';
import Title from './Title';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import Item from './Item';
import { getAllProductsAPI } from '../services/allAPI';

const NewArrivals = () => {
    
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);
  
  const fetchProducts = async () => {
    try {
      const response = await getAllProductsAPI();
      if (response.status === 200) {
        const allProducts = response.data;
        const randomProducts = allProducts
          .sort(() => Math.random() - 0.5) 
          .slice(0, 7); 
        setNewArrivals(randomProducts);
      }
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  return (
    <section className="max-padd-container bg-white py-16">
      <Title title1={'New'} title2={'Arrivals'} titleStyles={'pb-10'} paraStyles={'!block'} />
      <>
        <Swiper
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            400: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            700: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
          modules={[Pagination, Autoplay]}
          className="h-[588px] sm:h-[488px] xl:h-[499px] mt-5"
        >
          {newArrivals.map((book) => (
            <SwiperSlide key={book._id}>
              <Item book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    </section>
  );
};

export default NewArrivals;
