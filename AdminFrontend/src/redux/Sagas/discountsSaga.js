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

import {  creatediscountssuccess, creatediscountserror } from "../action";

import {  createDiscountsApi } from "../api";


// Generator functions for Adding
function* onCreateDiscountsStartAsync ({payload}) {
    try{
        const response = yield call(createDiscountsApi, payload);
        if(response.status === 200){
            yield put(creatediscountssuccess(response.data));
        }
    } catch(error) {
        yield put(creatediscountserror(error.response.data));
    }

}


// On Creating discounts
function* onCreateDiscounts() {
    yield takeLatest(types.CREATE_DISCOUNTS_START, onCreateDiscountsStartAsync)
 
}

const discountSaga = [
    fork(onCreateDiscounts)
];

export default function* rootDiscountsSaga() {
    yield all([...discountSaga]);
}