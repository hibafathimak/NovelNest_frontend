import React, { useState, useEffect, useContext } from 'react';
import Title from "../components/Title";
import { getUserOrdersAPI, getSingleProductAPI, cancelOrderAPI } from '../services/allAPI';
import { toast } from 'react-toastify';
import { ShopContext } from '../contexts/ShopContext';

const OrdersComponent = () => {
  const { books } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookDetailsMap, setBookDetailsMap] = useState({});
  const [filter, setFilter] = useState("All");


  useEffect(() => {
    const fetchOrders = async () => {
      const token = sessionStorage.getItem('token');
      if (token) {
        try {
          const userId = sessionStorage.getItem('userId');
          const reqHeader = { Authorization: `Bearer ${token}` };
          const response = await getUserOrdersAPI(userId, reqHeader);
          if (response.status === 200) {
            setOrders(response.data);
          }
        } catch {
          toast.error('An error occurred while fetching orders.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrders();
  }, []);

  const cancelOrder = async (OrderId) => {
    if (sessionStorage.getItem('token')) {
      const reqHeader = { Authorization: `Bearer ${sessionStorage.getItem('token')}` };
      try {
        const response = await cancelOrderAPI(OrderId, reqHeader);
        if (response.status === 200) {
          toast.success("Order cancelled");
          setOrders(prevOrders =>
            prevOrders.map(order =>
              order._id === OrderId ? { ...order, status: 'Cancelled' } : order
            )
          );
        } else {
          toast.error(response.response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchBookDetails = async () => {
      const allItemIds = [...new Set(orders.flatMap(order => Object.keys(order.items)))];
      for (const itemId of allItemIds) {
        if (!bookDetailsMap[itemId]) {
          const bookFromContext = books.find(book => book.id === itemId);
          if (bookFromContext) {
            setBookDetailsMap(prev => ({ ...prev, [itemId]: bookFromContext }));
          } else {
            try {
              const response = await getSingleProductAPI(itemId);
              if (response.status === 200) {
                setBookDetailsMap(prev => ({ ...prev, [itemId]: response.data }));
              }
            } catch (error) {
              console.error(`Failed to fetch book details for ${itemId}:`, error);
            }
          }
        }
      }
    };

    if (orders.length > 0) {
      fetchBookDetails();
    }
  }, [orders, books, bookDetailsMap]);

  const filteredOrders = filter === "All" ? orders : orders.filter(order => order.status === filter);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-primary pt-24 px-10 space-y-6 min-h-screen">
      <Title title1="Orders " title2="List" paraStyles="hidden" titleStyles="h3" />
      
      {/* Filter Dropdown */}
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="py-2 px-4 border rounded text-gray-700"
        >
          <option value="All">All</option>
          <option value="Order Placed">Order Placed</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center text-gray-500">No orders available.</div>
      ) : (
        filteredOrders.map(({ _id, items, paymentMethod, status, date }, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6 mb-4">
            <div className="font-bold text-gray-800 text-xl">Order Date: {new Date(date).toLocaleDateString()}</div>
            <div className="flexBetween mt-2">
              <p className="text-gray-500">Payment Method: {paymentMethod}</p>
              <p className="text-gray-500">
                <span
                  className={`px-4 py-3 rounded-full text-white text-sm ${
                    status === 'Order Placed' ? 'bg-blue-500' :
                    status === 'Delivered' ? 'bg-green-500' :
                    status === 'Cancelled' ? 'bg-gray-500' : 'bg-orange-500'
                  }`}
                >
                  {status}
                </span>
              </p>
            </div>
            <div className="mt-4">
              {Object.entries(items).map(([itemId, quantity]) => {
                const bookDetails = bookDetailsMap[itemId];
                if (quantity > 0 && bookDetails) {
                  return (
                    <div key={itemId} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg mb-4">
                      <div className="flex items-center space-x-4">
                        <img src={bookDetails.image || '/placeholder-book.jpg'} alt={bookDetails.title || 'Book cover'} className="w-16 object-cover rounded" />
                        <div>
                          <h3 className="font-bold text-gray-800 text-lg">{bookDetails.name || 'Loading...'}</h3>
                          <p className="text-gray-500 text-sm">Price: ${bookDetails.price || 'N/A'}</p>
                          <p className="text-gray-500 text-sm">Quantity: {quantity}</p>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
           { status=="Order Placed" && <button
              onClick={() => cancelOrder(_id)}
            className='btn-secondary h-10'
            >
              Cancel
            </button>}
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersComponent;
