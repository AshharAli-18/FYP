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


import {  loadPaymentSuccess, loadPaymentError } from "../action";

import { loadPaymentApi } from "../api";


// Generator functions for Loading

function* onLoadPaymentStartAsync () {
    try{
        const response = yield call(loadPaymentApi);
        if(response.status === 200){
            yield delay(500);
            yield put(loadPaymentSuccess(response.data));
        }
    } catch(error) {
        yield put(loadPaymentError(error.response.data));
    }

}


// For Loading orders
function* onLoadPayment() {
    yield takeEvery(types.LOAD_PAYMENT_START, onLoadPaymentStartAsync)
 
}

const paymentSaga = [
    fork(onLoadPayment),
];

export default function* rootPaymentSaga() {
    yield all([...paymentSaga]);
}