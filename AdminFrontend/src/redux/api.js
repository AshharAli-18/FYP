import axios from "axios";

const BASE_URL = "http://localhost:5000/";
//  const BASE_URL = "http://api.dopes.online/";

// Products API
export const loadProductsApi = async () =>
  axios.get(`${BASE_URL}api/products`);

// export const loadProductsApi = async (authToken) => {
//   try {
//     // Include authorization token in request headers
//     const response = await axios.get(`${BASE_URL}api/products`, {
//       headers: {
//         Authorization: `bearer ${authToken}`, // Assuming your API expects a Bearer token
//       },
//     });
//     return response.data;
//   } catch (error) {
//     // Handle errors here
//     console.error('Error loading orders:', error);
//     throw error; // Rethrow the error to be caught by the caller
//   }
// };

export const createProductsApi = async (product) =>
  axios.post(`${BASE_URL}api/addproduct1`, product);

export const deleteProductsApi = async (productid) =>
  axios.delete(`${BASE_URL}api/deleteproduct/${productid}`);

export const updateProductsApi = async (productid, productinfo) =>
  axios.put(`${BASE_URL}api/updateproduct/${productid}`, productinfo);


// Orders API
export const loadOrderssApi = async () =>
  axios.get(`${BASE_URL}api/getorder`);

// export const loadOrderssApi = async (authToken) => {
//   try {
//     // Include authorization token in request headers
//     const response = await axios.get(`${BASE_URL}api/getorder`, {
//       headers: {
//         Authorization: `bearer ${authToken}`, // Assuming your API expects a Bearer token
//       },
//     });
//     return response.data;
//   } catch (error) {
//     // Handle errors here
//     console.error('Error loading orders:', error);
//     throw error; // Rethrow the error to be caught by the caller
//   }
// };

export const loadOrderDetailApi = async (orderid) =>
  axios.get(`${BASE_URL}api/orderitem/${orderid}`);

export const deleteOrderApi = async (orderid) =>
  axios.delete(`${BASE_URL}api/deleteorder/${orderid}`);


// Customers API
export const loadCustomersApi = async () =>
  axios.get(`${BASE_URL}api/getcustomers`);
  
// Reviews API
export const loadReviewsApi = async () =>
  axios.get(`${BASE_URL}api/getReviews`);

// Tenants API
export const loadTenantsApi = async () =>
  axios.get(`${BASE_URL}api/user`);

export const createTenantsApi = async (tenant) =>
  axios.post(`${BASE_URL}api/addtenant`, tenant);

export const deleteTenantsApi = async (phone) =>
  axios.delete(`${BASE_URL}api/deleteuser/${phone}`);

export const updateTenantsApi = async (phone, tenantinfo) =>
  axios.put(`${BASE_URL}api/updateuser/${phone}`, tenantinfo);


// Subscription API
export const loadSubscriptionApi = async () =>
  axios.get(`${BASE_URL}api/getcustomers`);
  
// Payment API
export const loadPaymentApi = async () =>
  axios.get(`${BASE_URL}api/getReviews`);


// login API
export const logintApi = async ({ phone, password }) =>
  axios.post(`${BASE_URL}api/loginupdated`, { phone, password });


// Discounts API

export const createDiscountsApi = async (discount) =>
  axios.post(`${BASE_URL}api/adddiscount`, discount);

// login API
export const superadminloginApi = async ({ phone, password }) =>
  axios.post(`${BASE_URL}api/superadminloginupdated`, { phone, password });
