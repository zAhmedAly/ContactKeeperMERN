import React, { useRef, useEffect, useContext } from "react";
import { Form } from "react-bootstrap";
import ContactContext from "../context/contact/ContactContext";

const SearchContacts = () => {
  const contactContext = useContext(ContactContext);

  const keyword = useRef("");

  const { filtered, filterContacts, clearFilter, contacts } = contactContext;

  useEffect(() => {
    if (filtered === null) {
      keyword.current.value = "";
    }
  });

  const onChange = (e) => {
    if (keyword.current.value !== "") {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <>
      <Form className="py-2">
        <Form.Control
          type="text"
          ref={keyword}
          placeholder="Search Contacts"
          className="mr-sm-2"
          onChange={onChange}
          disabled={contacts && contacts.length !== 0 ? false : true}
        />
      </Form>
    </>
  );
};

export default SearchContacts;
