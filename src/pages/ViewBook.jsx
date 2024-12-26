import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TbShoppingBagPlus } from 'react-icons/tb';
import { RiHeartLine, RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';
import { ShopContext } from '../contexts/ShopContext';
import Item from '../components/Item';
import Footer from '../components/Footer';
import { createReviewAPI, deleteReviewAPI, getAllReviewsAPI, getSingleProductAPI, updateReviewAPI } from '../services/allAPI';
import { toast } from 'react-toastify';

const ViewBook = () => {
  const { bookId } = useParams();
  const { currency, addToCart, addToWishlist, updateQuantity, cartItems, books } = useContext(ShopContext);

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState(null);

  const user = JSON.parse(sessionStorage.getItem('user'));
  const userId = sessionStorage.getItem('userId');
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    fetchBookData();
    fetchReviews();
    
    window.scrollTo(0,0);
  }, [bookId]);

  const fetchBookData = async () => {
    try {
      const response = await getSingleProductAPI(bookId);
      if (response.status === 200) setBook(response.data);
      else toast.error('Failed to load book details.');
    } catch {
      toast.error('Failed to load book details.');
    } finally {
      setLoading(false); 
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await getAllReviewsAPI(bookId);
      if (response.status === 200) setReviews(response.data);
    } catch {
      toast.error('Failed to load reviews');
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return toast.error('Please write a review.');
    if (rating === 0) return toast.error('Please select a rating.');
    if (!token) return toast.error('Please log in to submit reviews!');

    const reviewData = { bookId, user: userId, username: user.username, comment: reviewText, rating };
    const reqHeader = { Authorization: `Bearer ${token}` };

    try {
      const response = editingReview
        ? await updateReviewAPI(editingReview._id, reviewData, reqHeader)
        : await createReviewAPI(reviewData, reqHeader);
      if (response.status === 200) {
        toast.success(editingReview ? 'Review updated!' : 'Review submitted!');
        setReviewText('');
        setRating(0);
        setEditingReview(null);
        fetchReviews();
      }
    } catch {
      toast.error('Error submitting/updating review.');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!token) return toast.error('Please log in to delete reviews!');
    const reqHeader = { Authorization: `Bearer ${token}` };
    try {
      const response = await deleteReviewAPI(reviewId, reqHeader);
      if (response.status === 200) {
        toast.success('Review deleted!');
        setReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId))
        setReviewText('');
        setRating(0);
        setEditingReview(null);
        fetchReviews();
      }
    } catch {
      toast.error('Error deleting review.');
    }
  };

  const handleAddToWishlist = () => {
    addToWishlist(book._id);
  };

  if (loading || !book) return <div className='mt-40 text-gray-600 h-screen text-center'>Loading...</div>;

  const relatedBooks = books.filter((b) => b.category === book.category && b._id !== bookId);
  const quantityInCart = cartItems[bookId] || 0;
  const stockStatusClass = {
    'in stock': 'text-green-600',
    'out of stock': 'text-red-600',
    'limited stock': 'text-orange-600',
  };

  return (
    <>
      <div className="max-w-6xl mx-auto min-h-screen px-4 py-20">
        <div className="flex flex-col lg:flex-row gap-12 bg-white p-10 rounded-lg shadow-lg">
          <div className="lg:w-2/5 flex justify-center">
            <img className="w-full h-auto rounded-lg shadow-md" src={book.image} alt={book.name} />
          </div>
          <div className="lg:w-3/5 space-y-6">
            <h1 className="text-3xl font-bold text-secondary">{book.name}</h1>
            <p className="text-base text-gray-600 leading-relaxed">{book.description}</p>
            <div className="text-gray-700 space-y-3">
              <p className="text-base">
                <strong>Category:</strong> {book.category}
              </p>
              <p className="text-base">
                <strong>Author:</strong> {book.author}
              </p>
              <p className="text-base">
                <strong>About:</strong> {book.about}
              </p>
              <p className="text-base">
                <strong>Stock:</strong>
                <span className={`font-bold ${stockStatusClass[book.stock]}`}>{book.stock}</span>
              </p>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-semibold text-secondary">
                {currency}
                {book.price.toFixed(2)}
              </h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => updateQuantity(book._id, Math.max(0, quantityInCart - 1))}
                  className="bg-gray-200 hover:bg-gray-300 w-10 h-10 flex items-center justify-center rounded-full"
                  disabled={quantityInCart === 0 || book.stock === 'out of stock'}
                >
                  -
                </button>
                <span className="text-lg font-semibold">{quantityInCart}</span>
                <button
                  onClick={() => updateQuantity(book._id, quantityInCart + 1)}
                  className="bg-gray-200 hover:bg-gray-300 w-10 h-10 flex items-center justify-center rounded-full"
                  disabled={book.stock === 'out of stock'}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => addToCart(book._id)}
                className={`px-6 py-3 w-full sm:w-auto rounded-lg flex items-center justify-center space-x-2 shadow-lg ${
                  book.stock === 'out of stock'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-secondary text-white hover:bg-secondary-dark'
                }`}
                disabled={book.stock === 'out of stock'}
              >
                <TbShoppingBagPlus className="text-xl" />
                <span>{book.stock === 'out of stock' ? 'Unavailable' : 'Add to Cart'}</span>
              </button>
              <button
                onClick={handleAddToWishlist}
                className="px-6 py-3 w-full sm:w-auto rounded-lg flex items-center justify-center space-x-2 shadow-lg bg-tertiary text-white"
              >
                <RiHeartLine className="text-xl" />
                <span>Add to Wishlist</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Reviews</h3>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className="bg-gray-100 p-4 rounded-lg shadow-sm space-y-2 mt-4">
                <p className="text-sm font-semibold">{review.username}</p>
                <p className="text-gray-700">{review.comment}</p>
                <p className="text-yellow-500">{'★'.repeat(review.rating)}</p>
                {review.user === userId && (
                  <div className="flex space-x-4">
                    <button
                      onClick={() => {
                        setEditingReview(review);
                        setReviewText(review.comment);
                        setRating(review.rating);
                      }}
                      className="text-secondary"
                    >
                      <RiEdit2Line className="inline-block" />
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      className="text-tertiary"
                    >
                      <RiDeleteBinLine className="inline-block" />
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to leave one!</p>
          )}

          <form onSubmit={handleReviewSubmit} className="mt-6 space-y-4">
            <textarea
              className="w-full p-3 border rounded-lg"
              placeholder="Write your review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows="4"
            />
            <div className="flex items-center space-x-4">
              <select
                className="p-2 border rounded-lg"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                <option value="0">Rate</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r} Star{r > 1 && 's'}
                  </option>
                ))}
              </select>
              <button type="submit" className="px-6 py-2 bg-secondary text-white rounded-lg">
                {editingReview ? 'Update Review' : 'Submit'}
              </button>
            </div>
          </form>
        </div>

        {relatedBooks.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Related Books</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedBooks.map((relatedBook) => (
                <Item key={relatedBook._id} book={relatedBook} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ViewBook;
