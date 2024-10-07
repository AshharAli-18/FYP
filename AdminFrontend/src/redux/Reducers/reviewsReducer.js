import * as types from "../actionTypes"

const initialState={
    reviews: [],
    loading: false,
    error: null
};

const reviewsReducer = (state = initialState, action)=>{
    switch(action.type){
        case types.LOAD_REVIEWS_START:
            return {
                ...state,
                loading: true,
            };
        case types.LOAD_REVIEWS_SUCCESS:
            return {
                ...state,
                loading: false,
                reviews: action.payload,
            };
        case types.LOAD_REVIEWS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default reviewsReducer;