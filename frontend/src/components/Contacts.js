import React, { useContext, useEffect } from "react";
import { Badge } from "react-bootstrap";
import ContactItem from "./ContactItem";
import ContactContext from "../context/contact/ContactContext";
import SearchContacts from "./SearchContacts";
import AlertContext from "../context/alert/AlertContext";
import AuthContext from "../context/auth/AuthContext";
import Alerts from "./Alerts";

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const {
    contacts,
    filtered,
    getContacts,
    clearContacts,
    clearFilter,
    contactsLoading,
    error,
    clearErrors,
    message,
    clearMessages,
  } = contactContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { logout } = authContext;

  useEffect(() => {
    getContacts();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (error) {
      let errMsg = error;
      if (error === "Internal Server Error") {
        errMsg = `Not able to connect, Please try again`;
      } else if (error === "Session Expired, Please Login") {
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
      <h3
        style={{
          color: "darkblue",
          fontWeight: "bold",
          alignContent: "center",
          justifyContent: "center",
          margin: "0.5rem 0",
        }}
      >
        {" "}
        <strong>Your Contacts</strong>
        {!contactsLoading && contacts !== null && contacts.length > 0 && (
          <Badge
            style={{
              float: "right",
              padding: "0.3rem 0.7rem",
              textAlign: "center",
              alignContent: "center",
              justifyContent: "center",
              margin: " 0.3rem",
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
      </h3>
      <SearchContacts />
      {!contactsLoading && <Alerts />}

      {!contactsLoading &&
        (contacts !== null && contacts.length > 0 ? (
          filtered !== null ? (
            filtered.map((contact) => (
              <ContactItem key={contact._id} contact={contact} />
            ))
          ) : (
            contacts.map((contact) => (
              <ContactItem key={contact._id} contact={contact} />
            ))
          )
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignitems: "center",
              marginTop: "10%",
            }}
          >
            <p
              className="text-center"
              style={{
                backgroundColor: "black",
                color: "white",
                width: "100%",
              }}
            >
              <span>No Contacts</span>
            </p>
          </div>
        ))}
    </>
  );
};

export default Contacts;
