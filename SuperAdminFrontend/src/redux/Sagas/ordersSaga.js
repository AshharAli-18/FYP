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