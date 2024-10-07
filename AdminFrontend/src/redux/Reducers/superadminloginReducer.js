import * as types from "../actionTypes"

// authReducer.js
const initialState = {
  superadmin: null,
  token: null,
  error: null,
};

const superadminauthReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SUPERADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        superadmin: action.payload.data,
        token: action.payload.token,
        error: null,
      };
    case types.SUPERADMIN_LOGIN_FAILURE:
      return {
        ...state,
        superadmin: null,
        token: null,
        error: action.payload,
      };
      case types.SUPERADMIN_LOGOUT:
        return {
          ...state,
          superadmin: null,
          token: null,
          error: null,
        };
      
    default:
      return state;
  }
};

export default superadminauthReducer;

  