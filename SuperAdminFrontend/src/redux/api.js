import axios from "axios";

// Products API
export const loadProductsApi = async () =>
  axios.get("http://localhost:5000/api/products");

export const createProductsApi = async (product) =>
  axios.post("http://localhost:5000/api/addproduct1", product);

export const deleteProductsApi = async (productid) =>
  axios.delete(`http://localhost:5000/api/deleteproduct/${productid}`);

export const updateProductsApi = async (productid, productinfo) =>
  axios.put(`http://localhost:5000/api/updateproduct/${productid}`, productinfo);


// Orders API
export const loadOrderssApi = async () =>
  axios.get("http://localhost:5000/api/getorder ");

export const loadOrderDetailApi = async (orderid) =>
  axios.get(`http://localhost:5000/api/orderitem/${orderid}`);

export const deleteOrderApi = async (orderid) =>
  axios.delete(`http://localhost:5000/api/deleteorder/${orderid}`);


// Customers API
export const loadCustomersApi = async () =>
  axios.get("http://localhost:5000/api/getcustomers ");
  
// Reviews API
export const loadReviewsApi = async () =>
  axios.get("http://localhost:5000/api/getReviews ");

// Tenants API
export const loadTenantsApi = async () =>
  axios.get("http://localhost:5000/api/user");

export const createTenantsApi = async (tenant) =>
  axios.post("http://localhost:5000/api/addtenant", tenant);

export const deleteTenantsApi = async (phone) =>
  axios.delete(`http://localhost:5000/api/deleteuser/${phone}`);

export const updateTenantsApi = async (phone, tenantinfo) =>
  axios.put(`http://localhost:5000/api/updateuser/${phone}`, tenantinfo);


// Subscription API
export const loadSubscriptionApi = async () =>
  axios.get("http://localhost:5000/api/getcustomers ");
  
// Payment API
export const loadPaymentApi = async () =>
  axios.get("http://localhost:5000/api/getReviews ");


// login API
  export const logintApi = async ({ phone, password }) =>
  axios.post("http://localhost:5000/api/loginupdated", { phone, password });


// Discounts API

export const createDiscountsApi = async (discount) =>
  axios.post("http://localhost:5000/api/adddiscount", discount);

