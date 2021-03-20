import {
  AUTH_ERROR,
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  USER_LOADED,
} from "../types";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        error: null,
      };

    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return { ...state, loading: true };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        loading: false,
        isAuthenticated: true,
        token: action.payload.token,
      };

    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };

    // case AUTH_ERROR:
    //   return {
    //     ...state,
    //     loading: false,
    //     user: null,
    //     error: action.payload,
    //   };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default AuthReducer;
