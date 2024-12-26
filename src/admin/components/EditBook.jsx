import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSave, FaArrowLeft } from 'react-icons/fa';
import upload from '../../assets/upload_icon.png';
import { getSingleProductAPI, editProductAPI } from '../../services/allAPI';
import { toast } from 'react-toastify';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    name: '',
    author: '',
    description: '',
    about: '',
    category: '',
    price: '',
    stock: 'in stock',
    popular: false,
    image: null,
  });

  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      const res = await getSingleProductAPI(id);
      if (res && res.data) {
        setBook({
          name: res.data.name,
          author: res.data.author,
          description: res.data.description,
          about: res.data.about,
          category: res.data.category,
          price: res.data.price,
          stock: res.data.stock,
          popular: res.data.popular,
          image: res.data.image,
        });
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  


 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
    } else {
      toast.error('Please upload a valid image file.');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (book.name && book.author && book.description && book.about && book.category && book.price && book.stock) {
      const formData = new FormData();
      formData.append('name', book.name);
      formData.append('author', book.author);
      formData.append('description', book.description);
      formData.append('about', book.about);
      formData.append('category', book.category);
      formData.append('price', book.price);
      formData.append('stock', book.stock);
      formData.append('popular', book.popular);
      if (image) {
        formData.append('image', image);
      }

      const token = sessionStorage.getItem('token');
      if (token) {
        const reqHeader = {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        };

        try {
          const result = await editProductAPI(id, formData, reqHeader);
          if (result.status === 200) {
            toast.success('Book updated successfully!');
            navigate('/admin/books');
          } else {
            toast.error('Failed to update the book.');
          }
        } catch (error) {
          console.error('Update error:', error);
          toast.error('An error occurred. Please try again.');
        }
      }
    } else {
      toast.error('Please fill out all required fields!');
    }
  };

  const handleCancel = () => {
    navigate('/admin/books');
  };

  return (
    <div className="max-w-3xl p-6">
      <h1 className="text-secondary font-bold text-4xl mb-5">Edit Book</h1>

      {isLoading ? (
        <div className="text-center text-lg">Loading...</div>
      ) : (
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="text-lg font-semibold">Book Name</label>
            <input
              type="text"
              name="name"
              value={book.name}
              onChange={handleChange}
              className="px-4 py-2 ring-1 ring-gray-300 rounded-md w-full mt-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-lg font-semibold">Author</label>
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
              className="px-4 py-2 ring-1 ring-gray-300 rounded-md w-full mt-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-lg font-semibold">Price</label>
            <input
              type="number"
              name="price"
              value={book.price}
              onChange={handleChange}
              className="px-4 py-2 ring-1 ring-gray-300 rounded-md w-full mt-2"
              required
            />
          </div>


          <div className="mb-4 flex items-center">
  <label htmlFor="popular" className="text-lg font-semibold mr-3 cursor-pointer">Add to Popular</label>
  <input
    type="checkbox"
    id="popular"
    name="popular"
    checked={book.popular}
    onChange={handleChange}
    className="h-5 w-5"
  />
</div>

         

          <div className="mb-4">
            <label className="text-lg font-semibold">Stock Status</label>
            <select
              name="stock"
              value={book.stock}
              onChange={handleChange}
              className="px-4 py-2 ring-1 ring-gray-300 rounded-md w-full mt-2"
            >
              <option value="in stock">In Stock</option>
              <option value="out of stock">Out of Stock</option>
              <option value="limited stock">Limited Stock</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="text-lg font-semibold">Category</label>
            <select
              name="category"
              value={book.category}
              onChange={handleChange}
              className="px-4 py-2 ring-1 ring-gray-300 rounded-md w-full mt-2"
            >
              <option value="fiction">Fiction</option>
              <option value="children">Children</option>
              <option value="academic">Academic</option>
              <option value="business">Business</option>
              <option value="health">Health</option>
              <option value="religious">Religious</option>
              <option value="fantasy">Fantasy</option>
              <option value="self-help">Self-help</option>
              <option value="mystery">Mystery</option>
              <option value="sci-fi">Sci-fi</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="text-lg font-semibold">Description</label>
            <textarea
              rows={2}
              name="description"
              value={book.description}
              onChange={handleChange}
              className="px-4 py-2 ring-1 ring-gray-300 rounded-md w-full mt-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-lg font-semibold">About</label>
            <textarea
              rows={5}
              name="about"
              value={book.about}
              onChange={handleChange}
              className="px-4 py-2 ring-1 ring-gray-300 rounded-md w-full mt-2"
              required
            />
          </div>

          <div className="mb-4 w-20">
            <label className="text-lg font-semibold">Upload Image</label>
            <label className="cursor-pointer block mt-2">
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              <div className="flex justify-center items-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-md">
                <img
                  src={image ? URL.createObjectURL(image) : book.image || upload}
                  alt="Book"
                  className="object-contain w-full h-full"
                />
              </div>
            </label>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center px-6 py-3 bg-gray-400 text-white rounded-full hover:bg-gray-500 transition-all"
            >
              <FaArrowLeft className="mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center px-6 py-3 bg-secondary text-white rounded-full hover:bg-gray-600 transition-all"
            >
              <FaSave className="mr-2" />
              Save
            </button>

          </div>
        </form>
      )}
    </div>
  );
};

export default EditBook;
