import commonAPI from "./commonAPI";
import SERVER_URL from "./serverURL";

// User APIs
export const registerAPI = async (reqBody) => {
  return await commonAPI("POST", `${SERVER_URL}/register`, reqBody);
};

export const loginAPI = async (reqBody) => {
  return await commonAPI("POST", `${SERVER_URL}/login`, reqBody);
};

// Product APIs
export const createProductAPI = async (formData,reqHeader) => {
  return await commonAPI("POST", `${SERVER_URL}/create-product`, formData,reqHeader);
};

export const deleteProductAPI = async (id,reqHeader) => {
  return await commonAPI("DELETE", `${SERVER_URL}/product/${id}/delete`,{}, reqHeader);
};

export const editProductAPI = async (id,reqBody,reqHeader) => {
  return await commonAPI("POST", `${SERVER_URL}/product/${id}/edit`, reqBody,reqHeader);
};

export const getAllProductsAPI = async () => {
  return await commonAPI("GET", `${SERVER_URL}/all-products`,{});
};

export const getSingleProductAPI = async (id) => {
  return await commonAPI("GET", `${SERVER_URL}/product/${id}`,{});
};

// Order APIs
export const createOrderAPI = async (userId,reqBody,reqHeader) => {
  return await commonAPI("POST", `${SERVER_URL}/${userId}/create-order`, reqBody,reqHeader);
};

export const getUserOrdersAPI = async (userId,reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/user/${userId}/orders`,{},reqHeader);
};

export const updateOrderStatusAPI = async (reqBody,reqHeader) => {
  return await commonAPI("PUT", `${SERVER_URL}/update-orders`, reqBody,reqHeader);
};

export const cancelOrderAPI = async (orderId,reqHeader) => {
  return await commonAPI("PUT", `${SERVER_URL}/order/${orderId}/cancel`, {},reqHeader);
};

export const getAllOrdersAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/all-orders`,{},reqHeader);
};

export const getsingleOrdersAPI = async (orderId,reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/order/${orderId}`,{},reqHeader);
};

// Cart APIs
export const addToCartAPI = async (reqBody,reqHeader) => {
  return await commonAPI("POST", `${SERVER_URL}/cart-add`, reqBody,reqHeader);
};

export const updateCartAPI = async (reqBody,reqHeader) => {
  return await commonAPI("PUT", `${SERVER_URL}/cart-update`,reqBody,reqHeader);
};

export const getUserCartAPI = async (userId,reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/${userId}/cart`,{},reqHeader);
};

export const addCartToUserAPI = async (userId,cartData,reqHeader) => {
  return await commonAPI("PUT", `${SERVER_URL}/cart/${userId}/update`,cartData,reqHeader);
};

export const clearCartAPI = async (userId,reqHeader) => {
  return await commonAPI("DELETE", `${SERVER_URL}/cart/${userId}/clear`,{},reqHeader);
};

//wishlist APis
export const addToWishlistAPI = async (userId,reqBody, reqHeader) => {
  return await commonAPI("POST", `${SERVER_URL}/wishlist/${userId}/add`, reqBody, reqHeader);
};

export const deleteFromWishlistAPI = async (itemId,reqBody, reqHeader) => {
  return await commonAPI("DELETE", `${SERVER_URL}/wishlist/${itemId}/delete`, reqBody, reqHeader);
};

export const getUserWishlistAPI = async (userId, reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/${userId}/wishlist`, {}, reqHeader);
};

export const addWishlistToUserAPI = async (userId, wishlistData, reqHeader) => {
  return await commonAPI("PUT", `${SERVER_URL}/wishlist/${userId}/update`, wishlistData, reqHeader);
};

//payments APIs

export const createPaymentAPI = async (reqBody,reqHeader) => {
  return await commonAPI("POST", `${SERVER_URL}/payment/order`,reqBody,reqHeader);
};

export const verifyPaymentAPI = async (reqBody,reqHeader) => {
  return await commonAPI("POST", `${SERVER_URL}/payment/verify`,reqBody,reqHeader);
};

// Review APIs
export const createReviewAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST", `${SERVER_URL}/reviews`, reqBody, reqHeader);
};

export const getAllReviewsAPI = async (bookId) => {
  return await commonAPI("GET", `${SERVER_URL}/reviews/${bookId}`, {});
};

export const updateReviewAPI = async (reviewId, reqBody, reqHeader) => {
  return await commonAPI("PUT", `${SERVER_URL}/reviews/${reviewId}`, reqBody, reqHeader);
};

export const deleteReviewAPI = async (reviewId, reqHeader) => {
  return await commonAPI("DELETE", `${SERVER_URL}/reviews/${reviewId}`, {}, reqHeader);
};


// Message APIs
export const createMessageAPI = async (reqBody) => {
  return await commonAPI("POST", `${SERVER_URL}/messages`, reqBody);
};

export const getAllMessagesAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/messages`, {}, reqHeader);
};

export const getMessageByIdAPI = async (messageId, reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/messages/${messageId}`, {}, reqHeader);
};

export const deleteMessageAPI = async (messageId, reqHeader) => {
  return await commonAPI("DELETE", `${SERVER_URL}/messages/${messageId}`, {}, reqHeader);
};
