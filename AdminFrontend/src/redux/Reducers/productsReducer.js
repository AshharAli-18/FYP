import * as types from "../actionTypes"

const initialState={
    products: [],
    loading: false,
    error: null
};

const productsReducer = (state = initialState, action)=>{
    switch(action.type){
        case types.LOAD_PRODUCTS_START:
        case types.CREATE_PRODUCT_START:
        case types.DELETE_PRODUCT_START:
        case types.UPDATE_PRODUCT_START:
            return {
                ...state,
                loading: true,
            };
        case types.LOAD_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
            };
        case types.CREATE_PRODUCT_SUCCESS:
        case types.UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case types.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: state.products.filter((item)=> item.id !== action.payload),
            };
        case types.LOAD_PRODUCTS_ERROR:
        case types.CREATE_PRODUCT_ERROR:
        case types.DELETE_PRODUCT_ERROR:
        case types.UPDATE_PRODUCT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default productsReducer;