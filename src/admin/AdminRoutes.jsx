import { Route, Routes } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import Dashboard from "./Dashboard";
import AddBook from "./AddBook";
import BookList from "./BookList";
import AdminOrders from "./AdminOrders";
import EditBook from "./components/EditBook";
import Messages from "./Messages";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="add-book" element={<AddBook />} />
        <Route path="books" element={<BookList />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="messages" element={<Messages />} />
        <Route path="edit-book/:id" element={<EditBook />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
