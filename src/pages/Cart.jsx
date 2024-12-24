import React, { useContext } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../contexts/ShopContext';
import { FaMinus, FaPlus } from "react-icons/fa";
import { TbTrash } from 'react-icons/tb';
import CartTotal from '../components/CartTotal';
import cart from '../assets/wishlist.png'
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';

const Cart = () => {
    const { books, navigate, currency, cartItems, updateQuantity } = useContext(ShopContext);
    
    const placeOrder = (e) => {
        e.preventDefault();
        
        if (Object.keys(cartItems).length === 0) {
          toast.error("Your cart is empty! Add items to the cart before placing an order.");
          return;
        }
      
        if (sessionStorage.getItem("token")) {
          navigate('/place-order');
        } else {
          toast.error('Login to Place Order!');
          navigate('/login');
        }
    };

    return (
       <>
            <section className='max-padd-container'>
                <div className='pt-28 h-screen'>
                    <Title title1={'Cart '} title2={'Items'} title1Styles={'h1'} paraStyles={'hidden'} />
                    
                    <div className='xl:flex lg:gap-6'>
                        {Object.keys(cartItems).length > 0 ? 
                        <div className='xl:w-2/3 mt-6'>
                            {books.map((item) => {
                                if (cartItems[item._id] > 0) {
                                    return (
                                        <div key={item._id} className='bg-white p-4 mt-3 rounded-lg shadow-md'>
                                            <div className='flex gap-4'>
                                                <img src={item.image} alt="ItemImg" className='w-16 rounded object-cover' />
                                                <div className='flex flex-col w-full'>
                                                    <h5 className='h5 !my-0 line-clamp-1'>{item.name}</h5>
                                                    <div className='flex items-start justify-between mt-2'>
                                                        <div>
                                                            <p className='mb-3 text-sm text-gray-600'>{item.category}</p>
                                                            <div className='flex items-center ring-1 ring-slate-900/5 rounded-full overflow-hidden bg-primary'>
                                                                <button 
                                                                    onClick={() => updateQuantity(item._id, cartItems[item._id] - 1)} 
                                                                    className='p-2 bg-white rounded-full shadow-md'>
                                                                    <FaMinus className='text-xs' />
                                                                </button>
                                                                <p className='px-4'>{cartItems[item._id]}</p>
                                                                <button 
                                                                    onClick={() => updateQuantity(item._id, cartItems[item._id] + 1)} 
                                                                    className='p-2 bg-white rounded-full shadow-md'>
                                                                    <FaPlus className='text-xs' />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <h4 className='h4 text-secondaryOne'>{currency}{item.price}</h4>
                                                        <TbTrash 
                                                            onClick={() => updateQuantity(item._id, 0)} 
                                                            className='cursor-pointer text-xl text-secondary' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                        :
                        <div className='text-xl text-secondaryOne w-full'>
                            <h4 className="flex items-center justify-center">
                                <img src={cart} className='w-10 me-5' alt="" />
                              No Items in Cart ...
                              <span className="ml-3">
                                <Link 
                                  className='flex items-center text-secondary font-semibold transition-all duration-300 ease-in-out '
                                  to={'/shop'}
                                >
                                  Shop Items
                                  <FaArrowRight className='ml-2 transition-all duration-300 ease-in-out hover:translate-x-2' />
                                </Link>
                              </span>
                            </h4>
                        </div>
                        }
        
                        <div className='xl:w-1/3 mt-10 lg:mt-0'>
                            <CartTotal />
                            <button onClick={(e) => placeOrder(e)} className='btn-secondaryOne mt-7 w-full'>Proceed to Checkout</button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />

       </>
    );
};

export default Cart;
