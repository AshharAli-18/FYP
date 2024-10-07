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


import {  loadOrderDetailSuccess, loadOrderDetailError } from "../action";

import { loadOrderDetailApi } from "../api";


// Generator functions for Loading

function* onLoadOrderDetailStartAsync(action) {
    try {
      const response = yield call(loadOrderDetailApi, action.payload);
      if (response.status === 200) {
        yield delay(500);
        yield put(loadOrderDetailSuccess(response.data));
      }
    } catch (error) {
      yield put(loadOrderDetailError(error.response.data));
    }
  }
  

function* onLoadOrderDetail() {
    yield takeEvery(types.LOAD_ORDERDETAIL_START, onLoadOrderDetailStartAsync)
 
}

const OrderDetailSaga = [
    fork(onLoadOrderDetail),
];

export default function* rootOrderDetailSaga() {
    yield all([...OrderDetailSaga ]);
}