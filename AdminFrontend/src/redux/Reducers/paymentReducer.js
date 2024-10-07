import * as types from "../actionTypes"

const initialState={
    payments: [],
    loading: false,
    error: null
};

const paymentsReducer = (state = initialState, action)=>{
    switch(action.type){
        case types.LOAD_PAYMENT_START:
            return {
                ...state,
                loading: true,
            };
        case types.LOAD_PAYMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                payments: action.payload,
            };
        case types.LOAD_PAYMENT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default paymentsReducer;