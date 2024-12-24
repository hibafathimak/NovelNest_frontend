import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaListAlt } from "react-icons/fa";
import { MdFactCheck } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { LuMessagesSquare } from "react-icons/lu";
import {  FaSquarePlus } from "react-icons/fa6";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import logo from '../../assets/book.png';

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const logout=()=>{
    sessionStorage.clear()
    navigate('/')
  }

  return (

    <div
      className={`fixed z-50 top-0 left-0 h-screen bg-white shadow-lg transition-all duration-300 
        ${isMobileMenuOpen ? 'w-64' : 'w-20'} sm:w-64`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <Link to="/admin" className="flex items-center text-secondary font-bold text-xl group">
          <img src={logo} alt="Logo" className="h-8 w-8 group-hover:rotate-12 transition-transform" />
          <span
            className={`pl-2 transition-all duration-300 ${isMobileMenuOpen ? 'inline' : 'hidden'} md:inline`}
          >
            NovelNest
          </span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="sm:hidden text-gray-600 hover:text-secondary"
        >
          {isMobileMenuOpen ? (
            <RiMenuFoldLine className="text-2xl" />
          ) : (
            <RiMenuUnfoldLine className="text-2xl" />
          )}
        </button>
      </div>

      {/* Menu Section */}
      <div className="flex flex-col justify-between h-full">
        <nav className="flex flex-col gap-y-2 p-3 flex-grow">
          {/* Add Item Link */}
          <NavLink
            to="/admin/add-book"
            className={({ isActive }) =>
              `flex items-center gap-x-3 py-2.5 px-4 rounded-xl cursor-pointer transition-all duration-300 group ${
                isActive
                  ? 'text-white bg-secondary shadow-md shadow-secondary/30'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-secondary'
              }`
            }
          >
            <FaSquarePlus className="text-xl group-hover:scale-110 transition-transform" />
            <span className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:block text-sm font-medium`}>
              Add Item
            </span>
          </NavLink>

          {/* List Link */}
          <NavLink
            to="/admin/books"
            className={({ isActive }) =>
              `flex items-center gap-x-3 py-2.5 px-4 rounded-xl cursor-pointer transition-all duration-300 group ${
                isActive
                  ? 'text-white bg-secondary shadow-md shadow-secondary/30'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-secondary'
              }`
            }
          >
            <FaListAlt className="text-xl group-hover:scale-110 transition-transform" />
            <span className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:block text-sm font-medium`}>
              List
            </span>
          </NavLink>

          {/* Orders Link */}
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `flex items-center gap-x-3 py-2.5 px-4 rounded-xl cursor-pointer transition-all duration-300 group ${
                isActive
                  ? 'text-white bg-secondary shadow-md shadow-secondary/30'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-secondary'
              }`
            }
          >
            <MdFactCheck className="text-xl group-hover:scale-110 transition-transform" />
            <span className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:block text-sm font-medium`}>
              Orders
            </span>
          </NavLink>

          <NavLink
            to="/admin/messages"
            className={({ isActive }) =>
              `flex items-center gap-x-3 py-2.5 px-4 rounded-xl cursor-pointer transition-all duration-300 group ${
                isActive
                  ? 'text-white bg-secondary shadow-md shadow-secondary/30'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-secondary'
              }`
            }
          >
            <LuMessagesSquare className="text-xl group-hover:scale-110 transition-transform" />
            <span className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:block text-sm font-medium`}>
              Messages
            </span>
          </NavLink>

          <div className="border-t border-gray-100">
          <button onClick={logout}
            className="w-full flex items-center gap-x-3 py-2.5 px-4 rounded-xl 
             text-gray-600 hover:bg-gray-100 hover:text-secondary transition-all duration-300 "
          >
            <BiLogOut className="text-xl group-hover:scale-110 transition-transform" />
            <span className={`${isMobileMenuOpen ? 'block' : 'hidden'}  sm:block text-sm font-medium`}>
              Logout
            </span>
          </button>
        </div>
        </nav>

        
      </div>
   
     
    </div>
  );
};

export default Sidebar;