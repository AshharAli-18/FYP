import * as types from "../actionTypes"

const initialState={
    customers: [],
    loading: false,
    error: null
};

const customersReducer = (state = initialState, action)=>{
    switch(action.type){
        case types.LOAD_CUSTOMERS_START:
            return {
                ...state,
                loading: true,
            };
        case types.LOAD_CUSTOMERS_SUCCESS:
            return {
                ...state,
                loading: false,
                customers: action.payload,
            };
        case types.LOAD_CUSTOMERS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default customersReducer;