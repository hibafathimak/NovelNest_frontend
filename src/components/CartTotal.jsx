import React, { useContext } from 'react';
import Title from './Title';
import { ShopContext } from '../contexts/ShopContext';

const CartTotal = () => {
  const { currency, getCartAmount, delivery_charge } = useContext(ShopContext);

  const subtotal = getCartAmount();
  const shippingFee = subtotal === 0 ? 0 : delivery_charge;
  const total = subtotal === 0 ? 0 : subtotal + shippingFee;

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 space-y-4">
      <Title title1={'Cart'} title2={' Total'} paraStyles={'hidden'} title1Styles={'h3'} />

      <div className="flex justify-between items-center text-gray-700">
        <h5 className="text-lg font-medium">Subtotal:</h5>
        <p className="text-lg font-semibold">{currency} {subtotal.toFixed(2)}</p>
      </div>
      <hr className="border-gray-200" />

      <div className="flex justify-between items-center text-gray-700">
        <h5 className="text-lg font-medium">Shipping Fee:</h5>
        <p className="text-lg font-semibold">
          {currency} {shippingFee.toFixed(2)}
        </p>
      </div>
      <hr className="border-gray-200" />

      <div className="flex justify-between items-center text-gray-900">
        <h5 className="text-xl font-bold">Total:</h5>
        <p className="text-xl font-bold">{currency} {total.toFixed(2)} </p>
      </div>
    </div>
  );
};

export default CartTotal;
