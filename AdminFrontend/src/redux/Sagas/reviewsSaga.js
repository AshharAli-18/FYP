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


import {  loadReviewsSuccess, loadReviewsError } from "../action";

import { loadReviewsApi } from "../api";


// Generator functions for Loading

function* onLoadReviewsStartAsync () {
    try{
        const response = yield call(loadReviewsApi);
        if(response.status === 200){
            yield delay(500);
            yield put(loadReviewsSuccess(response.data));
        }
    } catch(error) {
        yield put(loadReviewsError(error.response.data));
    }

}


// For Loading orders
function* onLoadReviews() {
    yield takeEvery(types.LOAD_REVIEWS_START, onLoadReviewsStartAsync)
 
}

const reviewsSaga = [
    fork(onLoadReviews),
];

export default function* rootReviewsSaga() {
    yield all([...reviewsSaga]);
}