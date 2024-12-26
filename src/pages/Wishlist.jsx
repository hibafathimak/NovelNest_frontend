import React, { useContext, useEffect, useState } from 'react';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TbShoppingBagPlus } from "react-icons/tb";
import { ShopContext } from '../contexts/ShopContext';
import { Link } from 'react-router-dom';
import wishlist from '../assets/shopping-list.png';
import { FaArrowRight } from 'react-icons/fa6';
import Title from '../components/Title';
import Footer from '../components/Footer';

const Wishlist = () => {
  const {
    wishlistItems,
    fetchSingleProduct,
    addToCart,
    deleteFromWishlist,
  } = useContext(ShopContext);

  const [wishlistDetails, setWishlistDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getWishlistDetails = async () => {
      setLoading(true);
      const details = [];
      for (let itemId of wishlistItems) {
        if (itemId) {
          const product = await fetchSingleProduct(itemId);
          details.push(product);
        }
      }
      setWishlistDetails(details);
      setLoading(false);
    };

    if (wishlistItems.length > 0) {
      getWishlistDetails();
    }
  }, [wishlistItems, fetchSingleProduct]);

  const handleDelete = (item) => {
    deleteFromWishlist(item);
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    handleDelete(item);
  };

  return (
    <>
      <div className="p-6 max-w-6xl mx-auto min-h-screen mt-16">
        <Title title1={'Wish'} title2={'List'} paraStyles={'hidden'} title1Styles={'h1'} />
        {loading ? (
          <div className="text-center text-gray-500">
            Loading...
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="flex items-center justify-center">
            <img src={wishlist} className='w-14 me-5' alt="" />
            <p className='text-center text-lg text-gray-500'>
              No items in your wishlist
            </p>
            <span className="ml-3">
              <Link 
                className='flex items-center text-secondary font-semibold transition-all duration-300 ease-in-out'
                to={'/shop'}
              >
                Shop Items
                <FaArrowRight className='ms-2 transition-all duration-300 ease-in-out hover:translate-x-2' />
              </Link>
            </span>
          </div>
        ) : (
          <div className="sm:block md:grid gap-8 md:grid-cols-3">
            {wishlistDetails.map((item) => (
              <div
                key={item._id}
                className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
              >
                <div className="flexCenter bg-primary p-5 rounded-3xl overflow-hidden relative group">
                  <img 
                    style={{ maxWidth: '150px' }} 
                    className='shadow-xl shadow-slate-900/30' 
                    src={item.image} 
                    alt={item.name} 
                  />
                </div>
                <div className="p-3">
                  <div className="flexBetween">
                    <Link to={`/books/${item._id}`} className="no-underline">
                      <h4 className="h4 text-start line-clamp-1 !my-0 cursor-pointer">{item.name}</h4>
                    </Link>
                    <span 
                      onClick={() => handleAddToCart(item._id)} 
                      className='flexCenter h-8 w-8 rounded cursor-pointer hover:bg-primary'
                      title="Add to Cart"
                    >
                      <TbShoppingBagPlus className='text-lg' />
                    </span>
    
                    <span 
                      onClick={() => handleDelete(item._id)} 
                      className='flexCenter h-8 w-8 rounded cursor-pointer hover:bg-primary'
                      title="Remove from Wishlist"
                    >
                      <MdOutlineDeleteOutline className='text-lg' />
                    </span>
                  </div>
                  <div className="flexBetween pt-1">
                    <p className='font-bold capitalize'>{item.category}</p>
                    <h5 className='h5 text-secondary pr-2'>${item.price.toFixed(2)}</h5>
                  </div>
                  <p className='py-1 text-start'>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;
