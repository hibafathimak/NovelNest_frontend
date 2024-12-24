import React from 'react'
import img from '../assets/forbidden.png'

const Unauthorised = () => {
  return (
    <div className='h-screen flex items-center flex-col justify-center bg-gray-100'>
        <img src={img} className='w-32' alt="" />
        <h1 className='text-3xl font-semibold text-tertiary my-4'>Access Denied</h1>
        <p className='text-lg text-gray-600'>
          You do not have permission to view this page.
        </p>
    </div>
  )
}

export default Unauthorised;
