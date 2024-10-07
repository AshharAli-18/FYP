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


import {  loadSubscriptionSuccess, loadSubscriptionError } from "../action";

import { loadSubscriptionApi } from "../api";


// Generator functions for Loading

function* onLoadSubscriptionStartAsync () {
    try{
        const response = yield call(loadSubscriptionApi);
        if(response.status === 200){
            yield delay(500);
            yield put(loadSubscriptionSuccess(response.data));
        }
    } catch(error) {
        yield put(loadSubscriptionError(error.response.data));
    }

}


// For Loading orders
function* onLoadSubscription() {
    yield takeEvery(types.LOAD_SUBSCRIPTION_START, onLoadSubscriptionStartAsync)
 
}

const subscriptionSaga = [
    fork(onLoadSubscription),
];

export default function* rootSubscriptionSaga() {
    yield all([...subscriptionSaga]);
}