import { combineReducers } from "redux";

import productsReducer from "./Reducers/productsReducer";
import ordersReducer from "./Reducers/ordersReducer";
import orderDetailReducer from "./Reducers/orderDetailReducer";
import customersReducer from "./Reducers/customersReducer";
import reviewsReducer from "./Reducers/reviewsReducer";
import tenantsReducer from "./Reducers/tenantReducer";
import authReducer from "./Reducers/loginReducer";
import discountsReducer from "./Reducers/discountsReducer";
import superadminauthReducer from "./Reducers/superadminloginReducer";

const rootReducer= combineReducers({
    data: productsReducer,
    orders: ordersReducer,
    orderDetails: orderDetailReducer,
    customers: customersReducer,
    reviews: reviewsReducer,
    tenants: tenantsReducer,
    user: authReducer,
    discounts: discountsReducer,
    superadmin: superadminauthReducer,

})

export default rootReducer;