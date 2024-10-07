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


import { superadminloginSuccess, superadminloginFailure } from "../action";

import { superadminloginApi } from "../api";


// Generator functions for Loading

function* handleLoginRequest(action) {
  try {
    const { phone, password } = action.payload;
    const response = yield call(superadminloginApi, { phone, password });
    const { data, token } = response;
    yield put(superadminloginSuccess(data, token));
  } catch (error) {
    console.error("Login request failed:", error.message);
    yield put(superadminloginFailure(error.message));
  }
}

  

// For Loading orders
function* watchLoginRequest() {
    yield takeLatest(types.SUPERADMIN_LOGIN_REQUEST, handleLoginRequest);
  }

const superadminloginSaga = [
    fork(watchLoginRequest),
];

export default function* rootsuperadminloginSaga() {
    yield all([...superadminloginSaga]);
}