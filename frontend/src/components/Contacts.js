import React, { useContext, useEffect } from "react";
import { Badge } from "react-bootstrap";
import ContactItem from "./ContactItem";
import ContactContext from "../context/contact/ContactContext";
import SearchContacts from "./SearchContacts";
import AlertContext from "../context/alert/AlertContext";
import AuthContext from "../context/auth/AuthContext";
import Alerts from "./Alerts";
import { useHistory } from "react-router";

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const {
    contacts,
    filtered,
    getContacts,
    clearContacts,
    clearFilter,
    contactsLoading,
    deleteLoading,
    error,
    clearErrors,
    message,
    clearMessages,
  } = contactContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { isAuthenticated, token, logout } = authContext;

  let history = useHistory();

  useEffect(() => {
    if (isAuthenticated && token) {
      getContacts();
    } else {
      logout();
      history.push("/login");
    }

    // eslint-disable-next-line
  }, [isAuthenticated, token]);

  useEffect(() => {
    if (error) {
      let errMsg = error;
      if (error === "Internal Server Error") {
        errMsg = `Not able to connect, Please try again`;
      } else if (
        error === "Session Expired, Please Login" ||
        "No token, authorization failed"
      ) {
        clearContacts();
        clearFilter();
        logout();
      }
      setAlert(errMsg, "danger");
      clearErrors();
    } else if (message) {
      setAlert(message, "success");
      clearMessages();
    }
    // eslint-disable-next-line
  }, [error, message]);

  return (
    <>
      {(contactsLoading || deleteLoading) && <div id="cover-spin"></div>}
      <h2
        style={{
          color: "darkblue",
          // fontWeight: "bold",
          alignContent: "center",
          justifyContent: "center",
          margin: "0.5rem 0",
        }}
      >
        {" "}
        <strong>Your Contacts</strong>
        {(!contactsLoading || !deleteLoading) &&
          contacts !== null &&
          contacts.length > 0 && (
            <Badge
              style={{
                float: "right",
                padding: "0.3rem 0.7rem",
                textAlign: "center",
                alignContent: "center",
                justifyContent: "center",
                margin: " 0.4rem",
                borderRadius: "5px",
                // height: "1rem",
                fontSize: "1rem",
              }}
              variant="info"
              as="div"
            >
              {filtered !== null
                ? `${filtered.length} Contacts`
                : `${contacts.length} Contacts`}
            </Badge>
          )}
      </h2>
      <SearchContacts />
      {!contactsLoading && <Alerts />}

      {contacts !== null && contacts.length === 0 && !contactsLoading && (
        <h5
          className="text-center"
          style={{
            backgroundColor: "black",
            color: "white",
            width: "100%",
            margin: "5px auto",
            padding: "10px",
          }}
        >
          No Contacts, Add a Contact
        </h5>
      )}
      {
        !contactsLoading &&
          contacts !== null &&
          contacts.length > 0 &&
          (filtered !== null
            ? filtered.map((contact) => (
                <ContactItem key={contact._id} contact={contact} />
              ))
            : contacts.map((contact) => (
                <ContactItem key={contact._id} contact={contact} />
              )))
        // :
        // (
        //   <h4
        //     className="text-center"
        //     style={{
        //       backgroundColor: "black",
        //       color: "white",
        //       width: "100%",
        //       margin: "auto",
        //     }}
        //   >
        //     No Contacts
        //   </h4>
        // )
      }
    </>
  );
};

export default Contacts;
