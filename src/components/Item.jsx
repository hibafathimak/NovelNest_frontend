import React, { useContext } from 'react';
import { TbShoppingBagPlus } from 'react-icons/tb';
import { ShopContext } from '../contexts/ShopContext';
import { Link } from 'react-router-dom';
import { RiHeartLine } from "react-icons/ri";

const Item = ({ book }) => {
    const { currency, addToCart, addToWishlist } = useContext(ShopContext);

    return (
        <div>
            <div className="flexCenter bg-primary p-5 rounded-3xl overflow-hidden relative group h-72"> {/* Set a fixed height */}
                <img
                    style={{ maxWidth: '150px', maxHeight: '100%' }}
                    className="shadow-xl shadow-slate-900/30"
                    src={book.image}
                    alt="bookimg"
                />
            </div>
            <div className="p-3">
                <div className="flex items-start justify-between">
                    <Link to={`/books/${book._id}`} className="no-underline flex-1">
                        <h4 className="h4 text-start line-clamp-1 !my-0 cursor-pointer">{book.name}</h4>
                    </Link>
                    <div className="flex gap-2">
                        <span onClick={() => addToCart(book._id)} className="flexCenter h-8 w-8 rounded cursor-pointer hover:bg-primary">
                            <TbShoppingBagPlus className="text-lg" />
                        </span>
                        <span onClick={() => addToWishlist(book._id)} className="flexCenter h-8 w-8 rounded cursor-pointer hover:bg-primary">
                            <RiHeartLine className="text-lg" />
                        </span>
                    </div>
                </div>
                <div className="flexBetween pt-1">
                    <p className="font-bold capitalize">{book.category}</p>
                    <h5 className="h5 text-secondary pr-2">
                        {currency}{book.price}
                    </h5>
                </div>
                <p className="py-1 text-start">{book.description}</p>
            </div>
        </div>
    );
}

export default Item;
