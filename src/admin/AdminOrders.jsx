import React, { useEffect, useState } from 'react';
import { getAllOrdersAPI, getsingleOrdersAPI, getSingleProductAPI, updateOrderStatusAPI } from '../services/allAPI';
import orderbox from "../assets/orderbox.png";
import { toast } from 'react-toastify';

const AdminOrders = () => {
  const [status, setStatus] = useState("Order Placed");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem('role');
    if (token && role === "admin") {
      try {
        const reqHeader = {
          'Authorization': `Bearer ${token}`,
        };
        const response = await getAllOrdersAPI(reqHeader);
        if (response.status === 200) {
          setOrders(response.data);
        } else {
          console.error("Failed to fetch orders");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (e, id) => {
    const updatedStatus = e.target.value;
    setStatus(updatedStatus);

    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const reqHeader = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
        const response = await updateOrderStatusAPI({ id, status: updatedStatus }, reqHeader);

        if (response.status === 200) {
          toast.success('Status Updated!!')
          setOrders(prevOrders =>
            prevOrders.map(order =>
              order._id === id ? { ...order, status: updatedStatus } : order
            )
          );
        } else {
          console.error("Failed to update order status");
        }
      } catch (error) {
        console.error("Error updating order status:", error);
      }
    }
  };

  const openModal = async (orderId) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const reqHeader = {
          'Authorization': `Bearer ${token}`,
        };
        const response = await getsingleOrdersAPI(orderId, reqHeader);
        if (response.status === 200) {
          const orderData = response.data;

          const itemDetails = [];
          for (const itemId in orderData.items) {
            if (orderData.items.hasOwnProperty(itemId)) {
              const itemResponse = await getSingleProductAPI(itemId);
              itemDetails.push({
                ...itemResponse.data,
                quantity: orderData.items[itemId]
              });
            }
          }

          setSelectedOrder({ ...orderData, items: itemDetails });
          setIsModalOpen(true);
        } else {
          console.error("Failed to fetch order details", response);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    } else {
      console.error("Token is missing");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-secondary mb-4">All Orders</h1>

        {/* Card layout for orders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-1 gap-6">
          {orders?.length > 0 ? 
            orders.map((order, index) => (
              <div key={order._id} className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:justify-between sm:flex-row items-start xl:space-x-5 space-y-4 sm:space-y-0">
                <div>
                  <img src={orderbox} className='h-12' alt="Order Box" />
                </div>
                <div className='flex-1'>
                  <h3 className="text-lg font-semibold text-secondary mb-2">SI NO: {index + 1}</h3>
                  <p className="text-sm text-gray-600">User: {order.userInfo.firstName} {order.userInfo.lastName}</p>
                  <p className="text-sm text-gray-600">Amount: ${order.amount}</p>
                  <p className="text-sm text-gray-600 mb-3">Payment: {order.payment ? "Paid" : "Unpaid"}</p>
                 <div className='lg:flexBetween'>
                    <div className="lg:mt-0">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(e, order._id)}
                        disabled={order.status === "Cancelled"}
                        className={`py-1 px-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 ${order.status === "Cancelled" ? "cursor-not-allowed bg-gray-200 text-gray-500" : "focus:ring-blue-500"}`}
                      >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        {order.status === 'Cancelled' && <option value="Cancelled">Cancelled</option>}
                      </select>
                    </div>
                    <button
                      onClick={() => openModal(order._id)}
                      className="text-tertiary mt-4 hover:text-red-800"
                    >
                      View Details
                    </button>
                 </div>
                </div>
              </div>
            )) : 
            <div className="col-span-full text-center py-2">No orders yet</div>
          }
        </div>
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-3/4 lg:w-2/3 max-w-3xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Details</h2>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Products</h3>
              <ul className="space-y-6">
                {selectedOrder.items.map((item, index) => (
                  <li key={index} className="flex flex-col sm:flex-row sm:space-x-5 justify-between items-start sm:items-center border-b pb-4">
                    <div className="flex items-center gap-4 max-w-[65%]">
                      <img src={item.image} className="w-16" alt={item.name} />
                      <p className="font-bold text-gray-800 break-words max-w-xs sm:max-w-none">{item.name}</p>
                    </div>

                    <div className="flex flex-col items-start sm:items-end text-left sm:text-right mt-4 sm:mt-0 space-y-1">
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-sm text-gray-600">Price: ${item.price}</p>
                      <p className="text-sm text-gray-600">Total: ${item.quantity * item.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Shipping Address</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">{selectedOrder.address.street}</p>
                <p className="text-sm text-gray-600">{selectedOrder.address.city}, {selectedOrder.address.state} {selectedOrder.address.zipcode}</p>
                <p className="text-sm text-gray-600">{selectedOrder.address.country}</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600"><strong>Status:</strong> {selectedOrder.status}</p>
              <p className="text-sm text-gray-600"><strong>Payment Status:</strong> {selectedOrder.payment ? "Paid" : "Unpaid"}</p>
            </div>

            <div className="flex justify-end">
              <button onClick={closeModal} className="bg-secondary text-white py-2 px-6 rounded-lg ">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
