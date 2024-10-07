import * as types from "../actionTypes"

const initialState={
    orders: [],
    loading: false,
    error: null
};

const ordersReducer = (state = initialState, action)=>{
    switch(action.type){
        case types.LOAD_ORDERS_START:
        case types.DELETE_ORDER_START:
            return {
                ...state,
                loading: true,
            };
        case types.LOAD_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
            };
        case types.DELETE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: state.orders.filter((item)=> item.id !== action.payload),
            };
        case types.LOAD_ORDERS_ERROR:
        case types.DELETE_ORDER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default ordersReducer;