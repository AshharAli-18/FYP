import * as types from "../actionTypes"

const initialState={
    subscriptions: [],
    loading: false,
    error: null
};

const subscriptionsReducer = (state = initialState, action)=>{
    switch(action.type){
        case types.LOAD_SUBSCRIPTION_START:
            return {
                ...state,
                loading: true,
            };
        case types.LOAD_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                loading: false,
                subscriptions: action.payload,
            };
        case types.LOAD_SUBSCRIPTION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default subscriptionsReducer;