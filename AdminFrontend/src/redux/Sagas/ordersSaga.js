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


import {  loadOrdersSuccess, loadOrdersError, deleteOrderError, deleteOrderSuccess } from "../action";

import { loadOrderssApi, deleteOrderApi } from "../api";


// Generator functions for Loading

// function* onLoadOrdersStartAsync (authToken) {
 function* onLoadOrdersStartAsync () {
    try{
        
        // const authtoken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWFsaWsiLCJpYXQiOjE3MTUxMDA3MTcsImV4cCI6MTcxNTE4NzExN30.CPckLEVQ_FW_-XOntjNK6jhoI6dQ_dqGBm5ETz54RUY";
        // const response = yield call(loadOrderssApi, authToken);
        const response = yield call(loadOrderssApi);
        if(response.status === 200){
            yield delay(500);
            yield put(loadOrdersSuccess(response.data));
        }
    } catch(error) {
        yield put(loadOrdersError(error.response.data));
    }

}


// Generator functions for Deleting
function* onDeleteOrderStartAsync (orderid) {
    try{
        const response = yield call(deleteOrderApi, orderid);
        if(response.status === 200){
            yield delay(500);
            yield put(deleteOrderSuccess(orderid));
        }
    } catch(error) {
        yield put(deleteOrderError(error.response.data));
    }


}


  

// On deleting order
function* onDeleteOrder() {
    while(true){
        const {payload: orderid} = yield take(types.DELETE_ORDER_START);
        yield call(onDeleteOrderStartAsync, orderid)
    }
}


// function* onLoadOrders() {
//     while(true){
//         const {payload: authToken} = yield take(types.LOAD_ORDERS_START);
//         yield call(onLoadOrdersStartAsync, authToken)
//     }
// }

// For Loading orders
function* onLoadOrders() {
    yield takeEvery(types.LOAD_ORDERS_START, onLoadOrdersStartAsync)
 
}

const OrdersSaga = [
    fork(onLoadOrders),
    fork(onDeleteOrder)
];

export default function* rootOrdersSaga() {
    yield all([...OrdersSaga]);
}