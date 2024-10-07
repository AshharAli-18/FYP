import {
    take,
    takeEvery,
    takeLatest,
    put,
    all,
    delay,
    fork,
    call,
} from "redux-saga/effects";

import * as types from "../actionTypes"


import { loadproductsuccess, loadproductserror, createproductsuccess, createproducterror, deleteProductSuccess, deleteProductError, updateProductSuccess, updateProductError, loadOrdersSuccess, loadOrdersError } from "../action";

import { loadProductsApi, createProductsApi, deleteProductsApi, updateProductsApi, loadOrderssApi } from "../api";


// Generator functions for Loading
// function* onLoadProductsStartAsync (authToken) {
//     try{
//         const response = yield call(loadProductsApi, authToken);
//         if(response.status === 200){
//             yield delay(500);
//             yield put(loadproductsuccess(response.data));
//         }
//     } catch(error) {
//         yield put(loadproductserror(error.response.data));
//     }

// }


function* onLoadProductsStartAsync () {
    try{
        const response = yield call(loadProductsApi);
        if(response.status === 200){
            yield delay(500);
            yield put(loadproductsuccess(response.data));
        }
    } catch(error) {
        yield put(loadproductserror(error.response.data));
    }

}

function* onLoadOrdersStartAsync () {
    try{
        const response = yield call(loadOrderssApi);
        if(response.status === 200){
            yield delay(500);
            yield put(loadOrdersSuccess(response.data));
        }
    } catch(error) {
        yield put(loadOrdersError(error.response.data));
    }

}


// Generator functions for Adding
function* onCreateProductsStartAsync ({payload}) {
    try{
        const response = yield call(createProductsApi, payload);
        if(response.status === 200){
            yield put(createproductsuccess(response.data));
        }
    } catch(error) {
        yield put(createproducterror(error.response.data));
    }

}


// Generator functions for Deleting
function* onDeleteProductStartAsync (productid) {
    try{
        const response = yield call(deleteProductsApi, productid);
        if(response.status === 200){
            yield delay(500);
            yield put(deleteProductSuccess(productid));
        }
    } catch(error) {
        yield put(deleteProductError(error.response.data));
    }


}



// Generator functions for Updating
function* onUpdateProductStartAsync({ payload }) {
    try {
      console.log("Payload",payload);
      const response = yield call(updateProductsApi, payload.productid, payload.productinfo);
      if (response.status === 200) {
        yield put(updateProductSuccess());
      }
    } catch (error) {
      yield put(updateProductError(error.response.data));
    }
  }
  

//  function* onLoadProducts() {
//     while(true){
//         const {payload: authToken} = yield take(types.LOAD_PRODUCTS_START);
//         yield call(onLoadProductsStartAsync, authToken)
//     }
// }

// For Loading products
function* onLoadProducts() {
    yield takeEvery(types.LOAD_PRODUCTS_START, onLoadProductsStartAsync)
 
}

// On Creating products
function* onCreateProducts() {
    yield takeLatest(types.CREATE_PRODUCT_START, onCreateProductsStartAsync)
 
}

// On deleting products
function* onDeleteProduct() {
    while(true){
        const {payload: productid} = yield take(types.DELETE_PRODUCT_START);
        yield call(onDeleteProductStartAsync, productid)
    }
}

// On updating products
function* onUpdateProduct() {
    yield takeLatest(types.UPDATE_PRODUCT_START, onUpdateProductStartAsync)
 
}

// For Loading orders
function* onLoadOrders() {
    yield takeEvery(types.LOAD_ORDERS_START, onLoadOrdersStartAsync)
 
}

const productSaga = [
    fork(onLoadProducts),
    fork(onCreateProducts),
    fork(onDeleteProduct),
    fork(onUpdateProduct)
];

export default function* rootProductsSaga() {
    yield all([...productSaga]);
}