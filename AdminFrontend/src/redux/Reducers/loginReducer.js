import * as types from "../actionTypes"

// authReducer.js
const initialState = {
  user: null,
  token: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.data,
        token: action.payload.token,
        error: null,
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        token: null,
        error: action.payload,
      };
      case types.LOGOUT:
        return {
          ...state,
          user: null,
          token: null,
          error: null,
        };
      
    default:
      return state;
  }
};

export default authReducer;

  