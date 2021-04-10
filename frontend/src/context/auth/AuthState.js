import { useReducer } from "react";
import axios from "axios";

import AuthContext from "./AuthContext";
import authReducer from "./AuthReducer";
import setAuthToken from "../../utils/setAuthToken";

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
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  USER_LOADED,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: false,
    user: null,
    error: null,
    message: null,
    resetEmail: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get("/api/auth");

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (error) {
      if (error.response.status !== 403) {
        const message =
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.response.statusText;
        dispatch({ type: AUTH_ERROR, payload: message });
      }
    }
  };

  const resetPassword = async (email) => {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/auth/resetpassword", email, config);

      setTimeout(() => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          payload: res.data,
        });
      }, 5000);
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.response.statusText;
      dispatch({ type: RESET_PASSWORD_FAIL, payload: message });
    }
  };

  const login = async (loginData) => {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/auth", loginData, config);

      setTimeout(() => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        loadUser();
      }, 1000);
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.response.statusText;
      dispatch({ type: LOGIN_FAIL, payload: message });
    }
  };

  const register = async (registerData) => {
    dispatch({ type: REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/users", registerData, config);

      setTimeout(() => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
        loadUser();
      }, 1000);
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.response.statusText;
      dispatch({ type: REGISTER_FAIL, payload: message });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
        resetPassword,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
