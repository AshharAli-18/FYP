import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import { all, fork } from 'redux-saga/effects';
import storage from 'redux-persist/lib/storage'; // Defaults to local storage
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from "./rootReducer";
import rootProductsSaga from "./Sagas/productsSaga";
import rootOrdersSaga from "./Sagas/ordersSaga";
import rootOrderDetailSaga from "./Sagas/orderDetailSaga"
import rootCustomersSaga from "./Sagas/customersSaga";
import rootReviewsSaga from "./Sagas/reviewsSaga";
import rootTenantsSaga from "./Sagas/tenantSaga";
import rootloginSaga from "./Sagas/loginSaga";
import rootDiscountsSaga from "./Sagas/discountsSaga";
import rootsuperadminloginSaga from "./Sagas/superadminloginSaga";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if(process.env.NODE_ENV === "development"){
    middlewares.push(logger)
}

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);

function* rootSaga() {
    yield all([
      fork(rootProductsSaga),
      fork(rootOrdersSaga),
      fork(rootOrderDetailSaga),
      fork(rootCustomersSaga),
      fork(rootReviewsSaga),
      fork(rootTenantsSaga),
      fork(rootloginSaga),
      fork(rootDiscountsSaga),
      fork(rootsuperadminloginSaga),
    ]);
  }

sagaMiddleware.run(rootSaga);

export default store;