import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addToCartAPI, updateCartAPI, getUserCartAPI, getAllProductsAPI, getUserWishlistAPI, addToWishlistAPI, deleteFromWishlistAPI, getSingleProductAPI } from '../services/allAPI';
import { toast } from 'react-toastify';
import fiction from "../assets/categories/fiction.png";
import health from "../assets/categories/health.png";
import business from "../assets/categories/business.png";
import academic from "../assets/categories/academic.png";
import religious from "../assets/categories/religious.png";
import toys from "../assets/categories/toys.png";
import mystery from "../assets/categories/mystery.png";
import fantasy from "../assets/categories/fantasy.png";
import scifi from "../assets/categories/scifi.png";
import selfhelp from "../assets/categories/self-help.png";
import romance from "../assets/categories/romance.png";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const currency = '$';
  const navigate = useNavigate();
  const categories = [
    { name: "fiction", image: fiction },
    { name: "children", image: toys },
    { name: "health", image: health },
    { name: "academic", image: academic },
    { name: "business", image: business },
    { name: "religious", image: religious },
    { name: "fantasy", image: fantasy },
    { name: "self-help", image: selfhelp },
    { name: "mystery", image: mystery },
    { name: "sci-fi", image: scifi },
    { name: "romance", image: romance }
  ];

  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = sessionStorage.getItem('wishlistItems');
    try {
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch {
      sessionStorage.removeItem('wishlistItems');
      return [];
    }
  });

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = sessionStorage.getItem('cartItems');
    try {
      return savedCart ? JSON.parse(savedCart) : {};
    } catch {
      sessionStorage.removeItem('cartItems');
      return {};
    }
  });

  const getCartAmount = () =>
    Object.entries(cartItems).reduce((total, [itemId, qty]) => {
      const item = books.find((book) => book._id === itemId);
      return total + (item?.price || 0) * qty;
    }, 0);

  const CartTotal = getCartAmount();

  const calculateShippingCharges = (CartTotal) => {
    if (CartTotal >= 5.99 && CartTotal < 12.99) {
      return 3.75;
    } else if (CartTotal >= 12.2 && CartTotal < 50) {
      return 5.00;
    } else if (CartTotal >= 50 && CartTotal < 100) {
      return 8.00;
    } else {
      return 10.00;
    }
  };

  const delivery_charge = calculateShippingCharges(CartTotal);
  const token = sessionStorage.getItem('token');
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    if (token && userId) {
      fetchCart();
      fetchWishlist();
    } 
  }, [token, userId]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    sessionStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const fetchProducts = async () => {
    try {
      const response = await getAllProductsAPI();
      if (response.status === 200) {
        setBooks(response.data);
      } else {
        toast.warning("Failed to fetch products.");
      }
    } catch {
      toast.error("Unable to load products.");
    }
  };

  const fetchSingleProduct = async (productId) => {
    try {
      const response = await getSingleProductAPI(productId);
      if (response.status === 200) {
        return response.data;
      } else {
        toast.warning("Failed to fetch product details.");
      }
    } catch {
      toast.error("Unable to load product details.");
    }
  };

  const fetchCart = async () => {
    if (token && userId) {
      const reqHeader = { Authorization: `Bearer ${token}` };
      try {
        const response = await getUserCartAPI(userId, reqHeader);
        setCartItems(response.data);
      } catch {
        toast.error("Failed to load cart.");
      }
    }
  };

  const addToCart = async (itemId) => {
    if (token) {
      const reqHeader = { Authorization: `Bearer ${token}` };
      try {
        await addToCartAPI({ userId, itemId }, reqHeader);
        setCartItems((prevCart) => ({
          ...prevCart,
          [itemId]: (prevCart[itemId] || 0) + 1,
        }));
        toast.success("Item added to cart.");
      } catch {
        toast.error("Failed to add item to cart.");
      }
    } else {
      setCartItems((prevCart) => ({
        ...prevCart,
        [itemId]: (prevCart[itemId] || 0) + 1,
      }));
      toast.info("Item added to cart. Login to save.");
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (token) {
      const reqHeader = { Authorization: `Bearer ${token}` };
      try {
        await updateCartAPI({ userId, itemId, quantity }, reqHeader);
        setCartItems((prevCart) => {
          const updatedCart = { ...prevCart };
          if (quantity > 0) {
            updatedCart[itemId] = quantity;
          } else {
            delete updatedCart[itemId];
          }
          sessionStorage.setItem('cartItems', JSON.stringify(updatedCart));
          return updatedCart;
        });
        toast.success("Cart updated successfully!");
      } catch {
        toast.error("Failed to update the cart.");
      }
    } else {
      setCartItems((prevCart) => {
        const updatedCart = { ...prevCart };
        if (quantity > 0) {
          updatedCart[itemId] = quantity;
        } else {
          delete updatedCart[itemId];
        }
        sessionStorage.setItem('cartItems', JSON.stringify(updatedCart));
        return updatedCart;
      });
      toast.success("Cart updated. Login to save your cart.");
    }
  };

  const fetchWishlist = async () => {
    if (token && userId) {
      const reqHeader = { Authorization: `Bearer ${token}` };
      try {
        const response = await getUserWishlistAPI(userId, reqHeader);
        setWishlistItems(response.data);
        sessionStorage.setItem('wishlistItems', JSON.stringify(response.data));
      } catch {
        toast.error('Failed to load wishlist.');
      }
    }
  };

  const addToWishlist = async (itemId) => {
    if (wishlistItems.includes(itemId)) {
      toast.info('Item already in your wishlist.');
      return; 
    }
    if (token) {
      const reqHeader = { Authorization: `Bearer ${token}` };
      try {
        const response = await addToWishlistAPI(userId, { itemId }, reqHeader);
        if (response.status === 200) {
          setWishlistItems((prevWishlist) => {
            const updatedWishlist = [...prevWishlist, itemId];
            sessionStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
            return updatedWishlist;
          });
          toast.success('Item added to wishlist.');
        } else {
          toast.error(response.response.data);
        }
      } catch {
        toast.error('Failed to add item to wishlist.');
      }
    } else {
      setWishlistItems((prevWishlist) => {
        const updatedWishlist = [...prevWishlist, itemId];
        sessionStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
        return updatedWishlist;
      });
      toast.info('Please log in to save items to your wishlist.');
    }
  };

  const deleteFromWishlist = async (itemId) => {
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');

    if (token) {
      const reqHeader = { Authorization: `Bearer ${token}` };
      try {
        const response = await deleteFromWishlistAPI(itemId, { userId }, reqHeader);
        if (response.status === 200) {
          setWishlistItems((prevItems) => {
            const updatedItems = prevItems.filter((id) => id !== itemId);
            sessionStorage.setItem('wishlistItems', JSON.stringify(updatedItems));
            return updatedItems; 
          });
          toast.success('Item removed from wishlist');
        } else {
          toast.error('Failed to remove item from wishlist');
        }
      } catch {
        toast.error('Error occurred while removing item from wishlist');
      }
    } else {
      setWishlistItems((prevItems) => {
        const updatedItems = prevItems.filter((id) => id !== itemId);
        sessionStorage.setItem('wishlistItems', JSON.stringify(updatedItems));
        return updatedItems;
      });
      toast.success('Item removed from wishlist');
    }
  };

  const getCartCount = () => Object.keys(cartItems).length;
  const getWishlistCount = () => wishlistItems.length;

  const contextValue = {
    books,
    currency,
    navigate,
    cartItems,
    addToCart,
    getCartAmount,
    updateQuantity,
    fetchCart,
    delivery_charge,
    categories,
    setCartItems,
    wishlistItems,
    setWishlistItems,
    addToWishlist,
    deleteFromWishlist,
    fetchWishlist,
    getCartCount,
    getWishlistCount,
    fetchSingleProduct
  };

  return <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
