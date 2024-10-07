import * as types from "../actionTypes"

const initialState={
    tenants: [],
    loading: false,
    error: null
};

const tenantsReducer = (state = initialState, action)=>{
    switch(action.type){
        case types.LOAD_TENANTS_START:
        case types.CREATE_TENANTS_START:
        case types.DELETE_TENANTS_START:
        case types.UPDATE_TENANTS_START:
            return {
                ...state,
                loading: true,
            };
        case types.LOAD_TENANTS_SUCCESS:
            return {
                ...state,
                loading: false,
                tenants: action.payload,
            };
        case types.CREATE_TENANTS_SUCCESS:
        case types.UPDATE_TENANTS_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case types.DELETE_TENANTS_SUCCESS:
            return {
                ...state,
                loading: false,
                tenants: state.tenants.filter((item)=> item.id !== action.payload),
            };
        case types.LOAD_TENANTS_ERROR:
        case types.CREATE_TENANTS_ERROR:
        case types.DELETE_TENANTS_ERROR:
        case types.UPDATE_TENANTS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default tenantsReducer;