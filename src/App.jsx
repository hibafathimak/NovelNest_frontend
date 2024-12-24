import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Header from './components/Header';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import ViewBook from './pages/ViewBook';
import PageNotFound from './pages/PageNotFound';
import AdminRoutes from './admin/AdminRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Wishlist from './pages/Wishlist';
import ProtectedRoute from './contexts/ProtectedRoute';
import Unauthorised from './pages/Unauthorised';

function App() {
  const isAuthenticated = !!sessionStorage.getItem('token'); // Check if token exists in sessionStorage
  const userRole = sessionStorage.getItem('role'); // Get the user role from sessionStorage

  return (
    <main className="overflow-hidden bg-primary">
      <ToastContainer
        className={'mt-10'}
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/books/:bookId" element={<ViewBook />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin/*" element={
          <ProtectedRoute isAuthenticated={isAuthenticated} requiredRole="admin" userRole={userRole}>
            <AdminRoutes />
          </ProtectedRoute>
        } />
        <Route path="/unauthorised" element={<Unauthorised />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </main>
  );
}

export default App;
