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


import { loadtenantssuccess, loadtenantserror, createtenantssuccess, createtenantserror, deletetenantsSuccess, deletetenantsError, updatetenantsSuccess, updatetenantsError } from "../action";

import { loadTenantsApi, createTenantsApi, deleteTenantsApi, updateTenantsApi } from "../api";


// Generator functions for Loading
function* onLoadTenantsStartAsync () {
    try{
        const response = yield call(loadTenantsApi);
        if(response.status === 200){
            yield delay(500);
            yield put(loadtenantssuccess(response.data));
        }
    } catch(error) {
        yield put(loadtenantserror(error.response.data));
    }

}


// Generator functions for Adding
function* onCreateTenantsStartAsync ({payload}) {
    try{
        const response = yield call(createTenantsApi, payload);
        if(response.status === 200){
            yield put(createtenantssuccess(response.data));
        }
    } catch(error) {
        yield put(createtenantserror(error.response.data));
    }

}


// Generator functions for Deleting
function* onDeleteTenantsStartAsync (tenantid) {
    try{
        const response = yield call(deleteTenantsApi, tenantid);
        if(response.status === 200){
            yield delay(500);
            yield put(deletetenantsSuccess(tenantid));
        }
    } catch(error) {
        yield put(deletetenantsError(error.response.data));
    }


 }


// Generator functions for Updating
function* onUpdatetenantStartAsync({ payload }) {
    try {
      const response = yield call(updateTenantsApi, payload.phone, payload.tenantinfo);
      if (response.status === 200) {
        yield put(updatetenantsSuccess());
      }
    } catch (error) {
      yield put(updatetenantsError(error.response.data));
    }
  }
  


// For Loading products
function* onLoadTenants() {
    yield takeEvery(types.LOAD_TENANTS_START, onLoadTenantsStartAsync)
 
}

// On Creating products
function* onCreateTenants() {
    yield takeLatest(types.CREATE_TENANTS_START, onCreateTenantsStartAsync)
 
}

// On deleting products
function* onDeleteTenant() {
    while(true){
        const {payload: tenanttid} = yield take(types.DELETE_TENANTS_START);
        yield call(onDeleteTenantsStartAsync, tenanttid)
    }
}

// On updating products
function* onUpdateTenant() {
    yield takeLatest(types.UPDATE_TENANTS_START, onUpdatetenantStartAsync)
 
}



const tenantSaga = [
    fork(onLoadTenants),
    fork(onCreateTenants),
    fork(onDeleteTenant),
    fork(onUpdateTenant)
];

export default function* rootTenantsSaga() {
    yield all([...tenantSaga]);
}