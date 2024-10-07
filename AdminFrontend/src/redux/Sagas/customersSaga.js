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


import {  loadCustomersSuccess, loadCustomersError } from "../action";

import { loadCustomersApi } from "../api";


// Generator functions for Loading

function* onLoadCustomersStartAsync () {
    try{
        const response = yield call(loadCustomersApi);
        if(response.status === 200){
            yield delay(500);
            yield put(loadCustomersSuccess(response.data));
        }
    } catch(error) {
        yield put(loadCustomersError(error.response.data));
    }

}


// For Loading orders
function* onLoadCustomers() {
    yield takeEvery(types.LOAD_CUSTOMERS_START, onLoadCustomersStartAsync)
 
}

const customersSaga = [
    fork(onLoadCustomers),
];

export default function* rootCustomersSaga() {
    yield all([...customersSaga]);
}