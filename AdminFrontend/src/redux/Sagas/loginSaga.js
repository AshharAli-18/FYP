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


import {  loginSuccess, loginFailure } from "../action";

import { logintApi } from "../api";


// Generator functions for Loading

function* handleLoginRequest(action) {
  try {
    const { phone, password } = action.payload;
    const response = yield call(logintApi, { phone, password });
    const { data, token } = response;
    yield put(loginSuccess(data, token));
  } catch (error) {
    console.error("Login request failed:", error.message);
    yield put(loginFailure(error.message));
  }
}

  

// For Loading orders
function* watchLoginRequest() {
    yield takeLatest(types.LOGIN_REQUEST, handleLoginRequest);
  }

const loginSaga = [
    fork(watchLoginRequest),
];

export default function* rootloginSaga() {
    yield all([...loginSaga]);
}