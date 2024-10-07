import * as types from "../actionTypes"

const initialState={
    orderDetail: [],
    loading: false,
    error: null
};

const orderDetailReducer = (state = initialState, action)=>{
    switch(action.type){
        case types.LOAD_ORDERDETAIL_START:
            return {
                ...state,
                loading: true,
            };
        case types.LOAD_ORDERDETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                orderDetail: action.payload,
            };
        case types.LOAD_ORDERDETAIL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default orderDetailReducer;