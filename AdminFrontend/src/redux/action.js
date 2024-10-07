import * as types from "./actionTypes"

 

 
// Action for get products
export const loadproductsstart = (authToken) => ({
   type: types.LOAD_PRODUCTS_START,
   // payload: authToken,
});

export const loadproductsuccess = (products) => ({
    type: types.LOAD_PRODUCTS_SUCCESS,
    payload: products,
 });

 export const loadproductserror = (error) => ({
    type: types.LOAD_PRODUCTS_ERROR,
    payload: error,
 });

 
   // Action for delete product
 export const deleteProductStart = (productid) => ({
   type: types.DELETE_PRODUCT_START,
   payload: productid,
});

export const deleteProductSuccess= (productid) => ({
    type: types.DELETE_PRODUCT_SUCCESS,
    payload: productid,
 });

 export const deleteProductError = (error) => ({
    type: types.CREATE_PRODUCT_ERROR,
    payload: error,
 });
 
// Action for update product
 export const updateProductStart = (productinfo) => ({
   type: types.UPDATE_PRODUCT_START,
   payload: productinfo,
});

export const updateProductSuccess= () => ({
    type: types.UPDATE_PRODUCT_SUCCESS,
 });

 export const updateProductError = (error) => ({
    type: types.UPDATE_PRODUCT_ERROR,
    payload: error,
 });

 // Action for get orders
export const loadOrdersStart = (authToken) => ({
   type: types.LOAD_ORDERS_START,
   payload: authToken,
});

export const loadOrdersSuccess = (orders) => ({
    type: types.LOAD_ORDERS_SUCCESS,
    payload: orders,
 });

 export const loadOrdersError = (error) => ({
    type: types.LOAD_ORDERS_ERROR,
    payload: error,
 });

  // Action for get order details
export const loadOrderDetailStart = (orderid) => ({
   type: types.LOAD_ORDERDETAIL_START,
   payload: orderid,
});

export const loadOrderDetailSuccess = (orderdetail) => ({
    type: types.LOAD_ORDERDETAIL_SUCCESS,
    payload: orderdetail,
 });

 export const loadOrderDetailError = (error) => ({
    type: types.LOAD_ORDERDETAIL_ERROR,
    payload: error,
 });

  // Action for delete order
  export const deleteOrderStart = (orderid) => ({
   type: types.DELETE_ORDER_START,
   payload: orderid,
});

export const deleteOrderSuccess= (orderid) => ({
    type: types.DELETE_ORDER_SUCCESS,
    payload: orderid,
 });

 export const deleteOrderError = (error) => ({
    type: types.DELETE_ORDER_ERROR,
    payload: error,
 });



 // Action for get Customers
export const loadCustomersStart = () => ({
   type: types.LOAD_CUSTOMERS_START,
});

export const loadCustomersSuccess = (customers) => ({
    type: types.LOAD_CUSTOMERS_SUCCESS,
    payload: customers,
 });

 export const loadCustomersError = (error) => ({
    type: types.LOAD_CUSTOMERS_ERROR,
    payload: error,
 });


  // Action for get Reviews
export const loadReviewsStart = () => ({
   type: types.LOAD_REVIEWS_START,
});

export const loadReviewsSuccess = (reviews) => ({
    type: types.LOAD_REVIEWS_SUCCESS,
    payload: reviews,
 });

 export const loadReviewsError = (error) => ({
    type: types.LOAD_REVIEWS_ERROR,
    payload: error,
 });


 // Action for get tenants
export const loadtenantsstart = () => ({
   type: types.LOAD_TENANTS_START,
});

export const loadtenantssuccess = (tenants) => ({
    type: types.LOAD_TENANTS_SUCCESS,
    payload: tenants,
 });

 export const loadtenantserror = (error) => ({
    type: types.LOAD_TENANTS_ERROR,
    payload: error,
 });

 // Action for add tenant
 export const createtenantsstart = (tenant) => ({
    type: types.CREATE_TENANTS_START,
    payload: tenant,
 });
 
 export const createtenantssuccess = () => ({
     type: types.CREATE_TENANTS_SUCCESS,
  });
 
  export const createtenantserror = (error) => ({
     type: types.CREATE_TENANTS_ERROR,
     payload: error,
  });

// Action for delete product
 export const deletetenantsStart = (tenantid) => ({
   type: types.DELETE_TENANTS_START,
   payload: tenantid,
});

export const deletetenantsSuccess= (tenantid) => ({
    type: types.DELETE_TENANTS_SUCCESS,
    payload: tenantid,
 });

 export const deletetenantsError = (error) => ({
    type: types.CREATE_TENANTS_ERROR,
    payload: error,
 });
 
// Action for update tenant
 export const updatetenantsStart = (tenantinfo) => ({
   type: types.UPDATE_TENANTS_START,
   payload: tenantinfo,
});

export const updatetenantsSuccess= () => ({
    type: types.UPDATE_TENANTS_SUCCESS,
 });

 export const updatetenantsError = (error) => ({
    type: types.UPDATE_TENANTS_ERROR,
    payload: error,
 });


 // Action for get Subscriptions
export const loadSubscriptionStart = () => ({
   type: types.LOAD_SUBSCRIPTION_START,
});

export const loadSubscriptionSuccess = (subscriptions) => ({
    type: types.LOAD_CUSTOMERS_SUCCESS,
    payload: subscriptions,
 });

 export const loadSubscriptionError = (error) => ({
    type: types.LOAD_CUSTOMERS_ERROR,
    payload: error,
 });


  // Action for get Payment
export const loadPaymentStart = () => ({
   type: types.LOAD_PAYMENT_START,
});

export const loadPaymentSuccess = (payments) => ({
    type: types.LOAD_PAYMENT_SUCCESS,
    payload: payments,
 });

 export const loadPaymentError = (error) => ({
    type: types.LOAD_PAYMENT_ERROR,
    payload: error,
 });


   // Actions for login
   export const loginRequest = (phone, password) => ({
      type: types.LOGIN_REQUEST,
      payload: { phone, password },
   });
   
   export const loginSuccess = (data, token) => ({
      type: types.LOGIN_SUCCESS,
      payload: { data, token },
   });
   
   
   export const loginFailure = (error) => ({
      type: types.LOGIN_FAILURE,
      payload: error,
   });
// actions.js
export const logout = () => ({
   type: types.LOGOUT,
 });
 

//  // Action for get discounts
// export const loaddiscountstart = () => ({
//    type: types.LOAD_DISCOUNTS_START,
// });

// export const loadproducsuccess = (discounts) => ({
//     type: types.LOAD_DISCOUNTS_SUCCESS,
//     payload: discounts,
//  });

//  export const loaddiscountserror = (error) => ({
//     type: types.LOAD_DISCOUNTS_ERROR,
//     payload: error,
//  });


// Action for add discount
export const creatediscountsstart = (discount) => ({
   type: types.CREATE_DISCOUNTS_START,
   payload: discount,
});

export const creatediscountssuccess = () => ({
    type: types.CREATE_DISCOUNTS_SUCCESS,
 });

 export const creatediscountserror = (error) => ({
    type: types.CREATE_DISCOUNTS_ERROR,
    payload: error,
 });


  // Actions for superadmin login
  export const superadminloginRequest = (phone, password) => ({
   type: types.SUPERADMIN_LOGIN_REQUEST,
   payload: { phone, password },
});

export const superadminloginSuccess = (data, token) => ({
   type: types.SUPERADMIN_LOGIN_SUCCESS,
   payload: { data, token },
});


export const superadminloginFailure = (error) => ({
   type: types.SUPERADMIN_LOGIN_FAILURE,
   payload: error,
});
// actions.js
export const superadminlogout = () => ({
type: types.SUPERADMIN_LOGOUT,
});



