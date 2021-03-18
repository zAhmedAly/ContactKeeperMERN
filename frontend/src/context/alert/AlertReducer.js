import { SET_ALERT, CLEAR_ALERT } from "../types";

const AlertReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return {
        ...state,
        alerts: [payload, ...state.alerts],
      };
    case CLEAR_ALERT:
      return {
        ...state,
        alerts:
          state.alerts !== null
            ? state.alerts.filter((alert) => payload !== alert.id)
            : null,
      };
    default:
      return state;
  }
};

export default AlertReducer;
