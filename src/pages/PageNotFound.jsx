import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="flex-col flexCenter max-h-screen bg-white px-4 py-20">
      <div className="text-center flex-col flexCenter">
        <img
        className='mt-4'
          width={'50%'}
          src="https://cdn.dribbble.com/users/2046015/screenshots/6015680/08_404.gif"
          alt="Page Not Found"
        />
                <h1 className="text-8xl font-bold text-secondary mb-3">404</h1>

        <p className="text-2xl text-gray-600 mb-5">Oops! Page Not Found</p>
        <p className="text-lg text-gray-500 mb-5">
          The page you are looking for might have been removed,
          had its name changed, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="bg-secondary hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Go to Homepage
        </Link>
        <div className="mt-5 text-gray-400">
          <p>Need help? Contact our support team</p>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
