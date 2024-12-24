import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/book.png';
import userlogo from '../assets/user.png';
import Navbar from './Navbar';
import { CgMenuLeft } from 'react-icons/cg';
import { RiUserLine, RiShoppingBag4Line } from 'react-icons/ri';
import { TbUserCircle } from 'react-icons/tb';
import { RiPokerHeartsLine } from "react-icons/ri";
import { ShopContext } from '../contexts/ShopContext';

const Header = () => {
    const { navigate, getCartCount, getWishlistCount,setCartItems,setWishlistItems } = useContext(ShopContext);
    const [active, setActive] = useState(false);
    const [menuOpened, setMenuOpened] = useState(false);
    const [cartCount, setCartCount] = useState(0);  // Track cart count in state
    const [wishlistCount, setWishlistCount] = useState(0); // Track wishlist count in state
    const token = sessionStorage.getItem("token");
    const toggleMenu = () => setMenuOpened((prev) => !prev);
    const closeMenu = () => setMenuOpened(false);
    const isAdmin = sessionStorage.getItem('role') === 'admin';

    useEffect(() => {
        setCartCount(getCartCount());
        setWishlistCount(getWishlistCount());
        
        const handleScroll = () => {
            if (menuOpened) setMenuOpened(false);
            setActive(window.scrollY > 30);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [menuOpened, getCartCount, getWishlistCount]);

    const logout = () => {
        sessionStorage.clear();
        setCartItems({});
        setWishlistItems([])
        setCartCount(0); 
        setWishlistCount(0);
        navigate('/');
    };

    if (isAdmin) return null;

    return (
        <header className="fixed top-0 w-full z-50 shadow-sm border-b border-slate-200 bg-white">
            <div className={`${active ? 'bg-white py-2.5' : 'bg-primary py-3'} px-4 lg:px-6 flex items-center justify-between`}>
                <CgMenuLeft
                    onClick={toggleMenu}
                    className="text-2xl sm:text-3xl xl:hidden cursor-pointer text-slate-700 hover:text-primary transition-colors"
                />

                <Link to="/" className="flex items-center">
                    <img src={logo} height={36} width={36} className="hidden sm:block" alt="Logo" />
                    <h4 className="text-lg font-bold text-slate-900 ml-2">NovelNest</h4>
                </Link>

                <div className="hidden xl:block">
                    <Navbar menuOpened={menuOpened} setMenuOpened={setMenuOpened} />
                </div>

                <div className="flex items-center space-x-2">
                    <Link to="/cart" className="relative text-slate-700 hover:text-secondary transition-colors flex items-center">
                        <RiShoppingBag4Line className="text-xl sm:text-2xl" />
                        <span className="absolute -top-1 right-0 transform translate-x-1/2 -translate-y-1/2 bg-gray-300 text-gray-600 text-xs font-medium w-4 h-4 flex items-center justify-center rounded-full shadow">
                            {cartCount}
                        </span>
                    </Link>

                    <Link to="/wishlist" className="relative text-slate-700 hover:text-secondary transition-colors flex items-center">
                        <RiPokerHeartsLine className="text-xl sm:text-2xl" />
                        <span className="absolute -top-1 right-0 transform translate-x-1/2 -translate-y-1/2 bg-gray-300 text-gray-600 text-xs font-medium w-4 h-4 flex items-center justify-center rounded-full shadow">
                            {wishlistCount}
                        </span>
                    </Link>

                    <div className="relative group">
                        {token ? (
                            <TbUserCircle className="text-2xl sm:text-3xl cursor-pointer text-slate-700" />
                        ) : (
                            <button
                                onClick={() => navigate('/login')}
                                className="bg-white flex items-center gap-2 px-3 py-1.5 border rounded-2xl text-sm font-medium text-slate-700 hover:bg-gray-100 transition-colors"
                            >
                                Login <RiUserLine className="text-lg" />
                            </button>
                        )}
                        {token && (
                            <ul className="absolute top-full right-0 mt-2 w-60 text-sm font-medium hidden group-hover:block bg-white border border-gray-200 rounded-lg shadow-lg">
                                <li className='flexCenter flex-col pt-2 border-b'>
                                    <img src={userlogo} className='w-10 rounded-full' alt="User Profile" />
                                    <p className="font-semibold mt-2">{JSON.parse(sessionStorage.getItem('user')).username}</p>
                                    <p className="text-gray-500">{JSON.parse(sessionStorage.getItem('user')).email}</p>
                                </li>
                                <li
                                    onClick={() => navigate('/orders')}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    role="button"
                                    aria-label="View Orders"
                                >
                                    Orders
                                </li>

                                <li
                                    onClick={logout}
                                    className="px-4 py-2 text-red-800 hover:text-tertiary hover:bg-gray-100 cursor-pointer"
                                    role="button"
                                    aria-label="Logout"
                                >
                                    Logout
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            <div
                className={`fixed inset-y-0 left-0 bg-white shadow-lg z-40 transform ${menuOpened ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300 xl:hidden`}
            >
                <button
                    onClick={closeMenu}
                    className="absolute top-4 right-4 text-2xl text-slate-700 hover:text-primary"
                >
                    ✕
                </button>
                <Navbar menuOpened={menuOpened} setMenuOpened={setMenuOpened} />
            </div>

            {menuOpened && (
                <div
                    onClick={closeMenu}
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 xl:hidden"
                />
            )}
        </header>
    );
};


export default Header;
