import * as types from "../actionTypes"

// authReducer.js
const initialState = {
    user: null,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.LOGIN_SUCCESS:
        return {
          ...state,
          user: action.payload,
          error: null,
        };
      case types.LOGIN_FAILURE:
        return {
          ...state,
          user: null,
          error: action.payload,
        };
      default:
        return state;
    }
  };


  
  export default authReducer;
  