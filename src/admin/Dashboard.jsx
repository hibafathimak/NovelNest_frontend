import React, { useEffect, useState } from 'react';
import { getAllProductsAPI, getAllOrdersAPI } from '../services/allAPI';
import books from '../assets/bookCollection.png'
import cancelled from '../assets/cancelled.png'
import pending from '../assets/document.png'
import sales from '../assets/procurement.png'
import best from '../assets/best.png'
import completed from '../assets/package.png'


const Dashboard = () => {
  const [totalBooks, setTotalBooks] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [canceledOrders, setCanceledOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [mostPurchasedBooks, setMostPurchasedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDashboardDetails();
  }, []);

  const getDashboardDetails = async () => {
    setIsLoading(true);
    const token = sessionStorage.getItem('token');
    const reqHeader = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      const productsRes = await getAllProductsAPI();
      const ordersRes = await getAllOrdersAPI(reqHeader);

      console.log('Products Response:', productsRes);
      console.log('Orders Response:', ordersRes);

      if (productsRes?.data) {
        setTotalBooks(productsRes.data.length);
      }

      if (ordersRes?.data) {
        const orders = ordersRes.data;

        const pendingOrdersCount = orders.filter((order) => order.status === 'Order Placed').length;
        const completedOrdersCount = orders.filter((order) => order.status === 'Delivered').length;
        const canceledOrdersCount = orders.filter((order) => order.status === 'Cancelled').length;
        setPendingOrders(pendingOrdersCount);
        setCompletedOrders(completedOrdersCount);
        setCanceledOrders(canceledOrdersCount);

        const totalSalesAmount = orders
          .filter((order) => order.status === 'Delivered' || order.status === 'Completed')
          .reduce((sum, order) => {
            const amount = order.amount || 0;
            return sum + amount;
          }, 0);
        setTotalSales(totalSalesAmount+100);

        const bookPurchaseMap = {};
        orders.forEach((order) => {
          if (order.items && typeof order.items === 'object') {
            Object.keys(order.items).forEach((bookId) => {
              const quantity = order.items[bookId];
              if (bookId && quantity) {
                bookPurchaseMap[bookId] = (bookPurchaseMap[bookId] || 0) + quantity;
              }
            });
          }
        });

        const mostPurchasedBooksList = Object.entries(bookPurchaseMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([bookId]) => {
            const book = productsRes.data.find((prod) => prod._id === bookId);
            return book?.name || 'Unknown Book';
          });

        setMostPurchasedBooks(mostPurchasedBooksList);
      }
    } catch (error) {
      console.error('Error fetching dashboard details:', error);
    } finally {
      setIsLoading(false);
    }
  };






  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-xl">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-4xl font-semibold text-secondary mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
       

        <div className="bg-white p-6 rounded-lg shadow-lg">

          <h3 className="text-xl font-semibold text-gray-800 mb-4">Total Books in Inventory</h3>
          <div className="bg-gray-200 h-48 rounded-lg flex  justify-evenly items-center">
          <img className='w-20' src={books} alt="" />

            <span className="text-gray-500">{totalBooks} Total Books</span>
          </div>
        </div>


        <div className="bg-white p-6 rounded-lg shadow-lg">

          <h3 className="text-xl font-semibold text-gray-800 mb-4">Most Purchased Books</h3>
          <div className="bg-gray-200 h-48 rounded-lg flex flex-wrap  justify-evenly items-center">
          <img className='w-20' src={best} alt="" />

            <span className="text-gray-500">
              {mostPurchasedBooks.length > 0 ? (
                <ul>
                  {mostPurchasedBooks.map((book, index) => (
                    <li key={index}>{book}</li>
                  ))}
                </ul>
              ) : (
                'No data available'
              )}
            </span>
          </div>
        </div>



        <div className="bg-white p-6 rounded-lg shadow-lg">

          <h3 className="text-xl font-semibold text-gray-800 mb-4">Total Sales</h3>
          <div className="bg-gray-200 h-48 rounded-lg flex  justify-evenly items-center">
          <img className='w-20' src={sales} alt="" />

            <span className="text-gray-500">${totalSales.toLocaleString()} Total Sales</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Pending Orders</h3>
          <div className="bg-gray-200 h-48 rounded-lg flex  justify-evenly items-center">
          <img className='w-20' src={pending} alt="" />
            <span className="text-gray-500">{pendingOrders} Pending Orders</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">

          <h3 className="text-xl font-semibold text-gray-800 mb-4">Completed Orders</h3>
          <div className="bg-gray-200 h-48 rounded-lg flex  justify-evenly items-center">
          <img className='w-20' src={completed} alt="" />

            <span className="text-gray-500">{completedOrders} Completed Orders</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">

          <h3 className="text-xl font-semibold text-gray-800 mb-4">Canceled Orders</h3>
          <div className="bg-gray-200 h-48 rounded-lg flex  justify-evenly items-center">
          <img className='w-20' src={cancelled} alt="" />

            <span className="text-gray-500">{canceledOrders} Canceled Orders</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
