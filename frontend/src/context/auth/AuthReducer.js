import {
  AUTH_ERROR,
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  RESET_PASSWORD_CHECK_FAIL,
  RESET_PASSWORD_CHECK_SUCCESS,
  RESET_PASSWORD_CONFIRM_FAIL,
  RESET_PASSWORD_CONFIRM_REQUEST,
  RESET_PASSWORD_CONFIRM_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  USER_LOADED,
} from "../types";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      localStorage.setItem("isAuthenticated", state.isAuthenticated);
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        error: null,
      };

    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case RESET_PASSWORD_REQUEST:
    case RESET_PASSWORD_CONFIRM_REQUEST:
      return { ...state, loading: true };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        token: action.payload.token,
      };

    case RESET_PASSWORD_SUCCESS:
    case RESET_PASSWORD_CONFIRM_SUCCESS:
      return {
        ...state,
        message: action.payload,
        loading: false,
        error: null,
      };

    case RESET_PASSWORD_CHECK_SUCCESS:
      return {
        ...state,
        message: null,
        loading: false,
        error: null,
      };

    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
    case RESET_PASSWORD_FAIL:
    case RESET_PASSWORD_CHECK_FAIL:
    case RESET_PASSWORD_CONFIRM_FAIL:
      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userInfo");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
        message: null,
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
    case CLEAR_MESSAGES:
      return {
        ...state,
        message: null,
      };

    default:
      return state;
  }
};

export default AuthReducer;
