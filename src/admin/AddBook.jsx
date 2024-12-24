import React, { useState } from 'react';
import upload from '../assets/upload_icon.png';
import { TbTrash } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
import { createProductAPI } from '../services/allAPI';
import { toast } from 'react-toastify';

const AddBook = () => {
  const [productName, setProductName] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [about, setAbout] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('in stock');
  const [image, setImage] = useState(null);
  const [popular, setPopular] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
    } else {
      toast('Please upload a valid image file.');
    }
  };

  const handleCheckboxChange = () => {
    setPopular(!popular);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (productName && description && category && author && about && price && image && stock) {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("author", author);
      formData.append("about", about);
      formData.append("price", price);
      formData.append("popular", popular);
      formData.append("image", image);
      formData.append("stock", stock);

      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        };
        try {
          const result = await createProductAPI(formData, reqHeader);
          if (result.status == 200) {
            toast.success("Product added successfully!");
            setProductName('');
            setAuthor('');
            setPrice('');
            setDescription('');
            setAbout('');
            setCategory('');
            setStock('in stock');
            setImage(null);
            setPopular(false);
          } else {
            toast.error(result.response.data);
          }
        } catch (error) {
          console.error(error);
          toast.error("An error occurred. Please try again.");
        }
      }
    } else {
      toast.error("Please Fill The Form Completely!!");
    }
  };

  return (
    <div className="max-w-3xl p-5">
      <h1 className="text-secondary font-bold text-4xl mb-5">Add A New Product</h1>

      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="mb-4">
          <label className="text-lg font-semibold">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Write here..."
            className="px-4 py-2 ring-1 ring-gray-300 rounded-md w-full mt-2"
          />
        </div>

        {/* Product Author */}
        <div className="mb-4">
          <label className="text-lg font-semibold">Product Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Write here..."
            className="px-4 py-2 ring-1 ring-gray-300 rounded-md w-full mt-2"
          />
        </div>

        {/* Product Description */}
        <div className="mb-4">
          <label className="text-lg font-semibold">Product Description</label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write here..."
            className="px-4 py-2 ring-1 ring-gray-300 rounded-md w-full mt-2"
          />
        </div>

        {/* Product About */}
        <div className="mb-4">
          <label className="text-lg font-semibold">Product About</label>
          <textarea
            rows={5}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Write here..."
            className="px-4 py-2 ring-1 ring-gray-300 rounded-md w-full mt-2"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="text-lg font-semibold">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 ring-1 ring-gray-300 rounded-md w-full mt-2"
          >
            <option value="" disabled>Select a category</option>
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

        {/* Stock Status */}
        <div className="mb-4">
          <label className="text-lg font-semibold">Stock Status</label>
          <select
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="px-4 py-2 ring-1 ring-gray-300 rounded-md w-full mt-2"
          >
            <option value="in stock">In Stock</option>
            <option value="out of stock">Out of Stock</option>
            <option value="limited stock">Limited Stock</option>
          </select>
        </div>

        {/* Product Price */}
        <div className="mb-4">
          <label className="text-lg font-semibold">Product Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Write here..."
            className="px-4 py-2 ring-1 ring-gray-300 rounded-md w-full mt-2"
          />
        </div>

        {/* Popular Checkbox */}
        <div className="mb-4 flex items-center">
          <label htmlFor="popular" className="text-lg font-semibold mr-3 cursor-pointer">Add to Popular</label>
          <input
            type="checkbox"
            checked={popular}
            onChange={handleCheckboxChange}
            className="h-5 w-5"
            id="popular"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4 w-20">
          <label className="text-lg font-semibold">Upload Image</label>
          <label className="cursor-pointer block mt-2">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <div className="flex justify-center items-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-md">
              <img
                src={image ? URL.createObjectURL(image) : upload}
                alt="Upload Icon"
                className="object-contain w-full h-full"
              />
            </div>
          </label>
          {image && (
            <button
              type="button"
              onClick={() => setImage(null)}
              className="mt-2 text-red-500 flex items-center gap-2"
            >
              <TbTrash className="text-lg" />
              Remove Image
            </button>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            type="submit"
            className="flex items-center px-6 py-3 bg-slate-900 text-white rounded-full hover:bg-purple-950 transition-all"
          >
            <FaPlus className="mr-2" />
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
