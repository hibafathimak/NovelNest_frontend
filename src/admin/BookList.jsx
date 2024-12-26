import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaEdit, FaTrashAlt, FaCheck, FaTimes } from 'react-icons/fa';
import { deleteProductAPI, getAllProductsAPI } from '../services/allAPI';
import { toast } from 'react-toastify';
import { RiSearch2Line } from 'react-icons/ri';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchBookDetails();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = books.filter((book) =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books);
    }
  }, [searchTerm, books]);

  const fetchBookDetails = async () => {
    setIsLoading(true);
    try {
      const res = await getAllProductsAPI();
      if (res && res.data) {
        setBooks(res.data);
        setFilteredBooks(res.data); 
      } else {
        toast.error('Failed to fetch book details.');
      }
    } catch (error) {
      console.error('Error fetching book details:', error);
      toast.error('An error occurred while fetching the book details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`,
      };
      try {
        const res = await deleteProductAPI(id, reqHeader);
        if (res.status === 200) {
          toast.success('Book deleted successfully!');
          fetchBookDetails();
        } else {
          toast.error(res.response.data);
        }
      } catch (error) {
        console.log(error);
        toast.error('An error occurred while deleting the book.');
      }
    }
  };

  const openModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-4xl font-semibold text-secondary mb-4 sm:mb-6">Book List</h2>

      <div className="inline-flex items-center justify-center bg-white overflow-hidden w-full lg:w-1/3 rounded-full p-2 px-5 mb-4">
        <div className='text-lg cursor-pointer'><RiSearch2Line /></div>

        <input
          type="text"
          placeholder="Search by title or author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-none outline-none w-full text-sm pl-4 bg-white"
        />
      </div>

      {isLoading ? (
        <div className="text-center text-lg text-gray-500">Loading...</div>
      ) : (
        <div className="overflow-hidden sm:w-full">
          <div className="grid grid-cols-1 gap-4">
            {filteredBooks.length === 0 ? (
              <p className="text-center text-gray-500">No books found matching your search.</p>
            ) : (
              filteredBooks.map((book) => (
                <div
                  key={book._id}
                  className="bg-white shadow-lg rounded-xl p-4 flex flex-col gap-2 border border-gray-200 cursor-pointer"
                  onClick={() => openModal(book)}
                >
                  <div>
                    <p className="text-sm font-medium text-secondary">Title: <span className="text-sm text-gray-700">{book.name}</span></p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-secondary">Author: <span className="text-sm text-gray-700">{book.author}</span></p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-secondary">Stock Status: <span className="text-sm text-gray-700">{book.stock}</span></p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-secondary mr-2">Popular:</p>
                    <span className="text-sm text-gray-700">
                      {book.popular ? <FaCheck className="text-lg" /> : <FaTimes className="text-lg" />}
                    </span>
                  </div>

                  <div className="flex justify-end gap-2 sm:-mt-10">
                    <NavLink to={`/admin/edit-book/${book._id}`}>
                      <button className="text-secondary hover:bg-secondary hover:text-white rounded-full p-2">
                        <FaEdit className="text-lg" />
                      </button>
                    </NavLink>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(book._id);
                      }}
                      className="text-tertiary hover:text-white hover:bg-red-500 rounded-full p-2 transition-all duration-300"
                    >
                      <FaTrashAlt className="text-lg" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {isModalOpen && selectedBook && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white px-4 py-2 rounded-lg shadow-lg w-full sm:w-3/4 lg:w-2/3 max-w-3xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Book Details</h2>
        
            <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
              <div className="flex-1 md:w-1/2">
                <div className="mb-4 flexCenter">
                  <img
                    className=" object-cover rounded-lg shadow-md"
                    src={selectedBook.image}
                    alt="Book"
                  />
                </div>
              </div>
        
              <div className="flex-1 md:w-1/2">
              <div className="mb-4">
                  <p className="text-lg font-medium text-secondary">
                    Title: <span className="text-gray-700">{selectedBook.name}</span>
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-medium text-secondary">
                    Author: <span className="text-gray-700">{selectedBook.author}</span>
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-medium text-secondary">
                    Description: <span className="text-gray-700">{selectedBook.description}</span>
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-medium text-secondary">
                    Price: <span className="text-gray-700">${selectedBook.price}</span>
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-medium text-secondary">
                    About: <span className="text-gray-700">{selectedBook.about}</span>
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-medium text-secondary">
                    Stock Status: <span className="text-gray-700">{selectedBook.stock}</span>
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-medium text-secondary">
                    Popular: <span className="text-gray-700">{selectedBook.popular ? 'Yes' : 'No'}</span>
                  </p>
                </div>
                <div className="flex justify-end mt-6">
              <button
                onClick={closeModal}
                className="bg-tertiary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition duration-300"
              >
                Close
              </button>
            </div>
              </div>
            </div>
        
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;
