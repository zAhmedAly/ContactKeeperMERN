import { useReducer } from "react";
import axios from "axios";

import ContactContext from "./ContactContext";
import contactReducer from "./ContactReducer";

import {
  GET_CONTACTS_REQUEST,
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_FAIL,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  ADD_CONTACT_REQUEST,
  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_FAIL,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_FAIL,
  DELETE_CONTACT_REQUEST,
  UPDATE_CONTACT_REQUEST,
  UPDATE_CONTACT_SUCCESS,
  UPDATE_CONTACT_FAIL,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_ERRORS,
  CLEAR_CONTACTS,
  CLEAR_MESSAGES,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    filtered: null,
    current: null,
    error: null,
    message: null,
    contactsLoading: false,
    addLoading: false,
    deleteLoading: false,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  const getContacts = async () => {
    dispatch({ type: GET_CONTACTS_REQUEST });
    try {
      const res = await axios.get("/api/contacts");
      setTimeout(() => {
        dispatch({
          type: GET_CONTACTS_SUCCESS,
          payload: res.data,
        });
      }, 1000);
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.response.statusText;
      dispatch({ type: GET_CONTACTS_FAIL, payload: message });
    }
  };

  // Clear Contacts
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  const filterContacts = (keyword) => {
    dispatch({ type: FILTER_CONTACTS, payload: keyword });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  const addContact = async (contact) => {
    dispatch({ type: ADD_CONTACT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/contacts", contact, config);
      console.log("res.data = ", res.data);
      setTimeout(() => {
        dispatch({
          type: ADD_CONTACT_SUCCESS,
          payload: res.data,
        });
        clearFilter();
      }, 1000);
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.response.statusText;
      dispatch({ type: ADD_CONTACT_FAIL, payload: message });
    }
  };

  const deleteContact = async (id) => {
    dispatch({ type: DELETE_CONTACT_REQUEST });
    try {
      await axios.delete(`/api/contacts/${id}`);

      setTimeout(() => {
        dispatch({
          type: DELETE_CONTACT_SUCCESS,
          payload: id,
        });
      }, 1000);
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.response.statusText;
      dispatch({ type: DELETE_CONTACT_FAIL, payload: message });
    }
  };

  const updateContact = async (contact) => {
    dispatch({ type: UPDATE_CONTACT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );

      setTimeout(() => {
        dispatch({
          type: UPDATE_CONTACT_SUCCESS,
          payload: res.data,
        });
      }, 1000);
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.response.statusText;
      dispatch({ type: UPDATE_CONTACT_FAIL, payload: message });
    }
  };

  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  // Clear Messages
  const clearMessages = () => dispatch({ type: CLEAR_MESSAGES });

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        filtered: state.filtered,
        current: state.current,
        error: state.error,
        message: state.message,
        contactsLoading: state.contactsLoading,
        addLoading: state.addLoading,
        deleteLoading: state.deleteLoading,
        getContacts,
        clearContacts,
        filterContacts,
        clearFilter,
        addContact,
        deleteContact,
        updateContact,
        setCurrent,
        clearCurrent,
        clearErrors,
        clearMessages,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
