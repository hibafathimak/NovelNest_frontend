import React from 'react';
import { TbHomeFilled } from 'react-icons/tb';
import { IoLibrary, IoMailOpen } from 'react-icons/io5';
import { FaRegWindowClose } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Navbar = ({ menuOpened, setMenuOpened }) => {
  const navItems = [
    { to: '/', label: 'Home', icon: <TbHomeFilled /> },
    { to: '/shop', label: 'Shop', icon: <IoLibrary /> },
    { to: '/contact', label: 'Contact', icon: <IoMailOpen /> },
  ];

  return (
    <nav 
      className={`
        fixed top-0 left-0 z-40 w-[250px] h-screen 
        bg-white shadow-xl text-xl
        transform transition-transform duration-300 ease-in-out
        ${menuOpened 
          ? 'translate-x-0' 
          : '-translate-x-full'
        }
        xl:relative xl:transform-none
        xl:h-auto xl:w-auto xl:flex xl:items-center xl:space-x-6 xl:bg-transparent xl:shadow-none
      `}
    >
      {/* Close button for mobile sidebar */}
      {menuOpened && (
       <>
            <h4 className='text-secondary text-center text-xl mt-[50%] font-bold'>NovelNest</h4>
            <button
              onClick={() => setMenuOpened(false)}
              className="absolute top-4 right-4 text-2xl text-secondary xl:hidden"
              aria-label="Close menu"
            >
              <FaRegWindowClose />
            </button>
       </>
      )}

      <div className="flex flex-col pt-16 xl:pt-0 xl:flex-row gap-4 p-6 xl:p-0">
        {navItems.map(({ to, label, icon }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) => `
              flex items-center gap-3 px-2 py-2 rounded-sm  text-sm font-medium transition
              ${isActive 
                ? 'border-b-2 border-secondary text-secondary' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-secondary'
              }
              xl:hover:bg-transparent
            `}
            onClick={() => setMenuOpened(false)}
          >
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;