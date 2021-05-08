import {
  GET_CONTACTS_REQUEST,
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_FAIL,
  CLEAR_FILTER,
  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_FAIL,
  ADD_CONTACT_REQUEST,
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
  FILTER_CONTACTS_BY_NAME,
  FILTER_CONTACTS_BY_TYPE,
  FILTER_CONTACTS_BY_PHONE,
  FILTER_CONTACTS_BY_EMAIL,
} from "../types";

const ContactReducer = (state, action) => {
  switch (action.type) {
    case GET_CONTACTS_REQUEST:
      return {
        ...state,
        contactsLoading: true,
        contacts: null,
        filtered: null,
      };
    case GET_CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: action.payload.sort((a, b) => (a.name > b.name ? 1 : -1)),
        filtered: null,
        contactsLoading: false,
      };
    case GET_CONTACTS_FAIL:
      return {
        ...state,
        error: action.payload,
        contactsLoading: false,
        message: null,
        contacts: null,
      };
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        filtered: null,
        error: null,
        current: null,
        message: null,
      };
    case FILTER_CONTACTS_BY_NAME:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          return contact.name
            .toLowerCase()
            .includes(action.payload.toLowerCase());
        }),
      };
    case FILTER_CONTACTS_BY_TYPE:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          return contact.type
            .toLowerCase()
            .includes(action.payload.toLowerCase());
        }),
      };
    case FILTER_CONTACTS_BY_PHONE:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          return contact.phone
            .toLowerCase()
            .includes(action.payload.toLowerCase());
        }),
      };
    case FILTER_CONTACTS_BY_EMAIL:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          return contact.email
            .toLowerCase()
            .includes(action.payload.toLowerCase());
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case ADD_CONTACT_REQUEST:
      return { ...state, addLoading: true };
    case ADD_CONTACT_SUCCESS:
      const contactsList = [action.payload, ...state.contacts];
      return {
        ...state,
        contacts: contactsList.sort((a, b) => (a.name > b.name ? 1 : -1)),
        addLoading: false,
        message: "Contact Added Successfully",
      };
    case ADD_CONTACT_FAIL:
      return {
        ...state,
        error: action.payload,
        addLoading: false,
      };
    case DELETE_CONTACT_REQUEST:
      return { ...state, deleteLoading: true };
    case DELETE_CONTACT_SUCCESS:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => action.payload !== contact._id
        ),
        filtered:
          state.filtered !== null
            ? state.filtered.filter((contact) => action.payload !== contact._id)
            : null,
        deleteLoading: false,
        message: "Contact Deleted Successfully",
      };
    case DELETE_CONTACT_FAIL:
      return {
        ...state,
        error: action.payload,
        deleteLoading: false,
      };
    case UPDATE_CONTACT_REQUEST:
      return { ...state, addLoading: true };
    case UPDATE_CONTACT_SUCCESS:
      return {
        ...state,
        contacts: state.contacts
          .map((contact) =>
            contact._id === action.payload._id ? action.payload : contact
          )
          .sort((a, b) => (a.name > b.name ? 1 : -1)),
        filtered:
          state.filtered !== null
            ? state.filtered
                .map((contact) =>
                  contact._id === action.payload._id ? action.payload : contact
                )
                .sort((a, b) => (a.name > b.name ? 1 : -1))
            : null,
        addLoading: false,
        message: "Contact Updated Successfully",
      };
    case UPDATE_CONTACT_FAIL:
      return {
        ...state,
        error: action.payload,
        addLoading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
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

export default ContactReducer;
