import React, { useRef, useEffect, useContext, useState } from "react";
import { Form } from "react-bootstrap";
import ContactContext from "../context/contact/ContactContext";

const SearchContacts = () => {
  const contactContext = useContext(ContactContext);

  const keyword = useRef("");

  const { filtered, filterContacts, clearFilter, contacts } = contactContext;

  const [radioValue, setRadioValue] = useState("name");
  const radios = [
    { name: "Name", value: "name" },
    { name: "Type", value: "type" },
    { name: "Email", value: "email" },
    { name: "Phone", value: "phone" },
  ];

  useEffect(() => {
    if (filtered === null) {
      keyword.current.value = "";
    }
  });

  console.log("<<< FILTER TYPE 1 >>> ", radioValue);

  const onChange = (e) => {
    if (keyword.current.value !== "") {
      console.log("<<< FILTER TYPE 2 >>> ", radioValue);
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <>
      <Form className="py-1">
        <Form.Control
          type="text"
          ref={keyword}
          placeholder="Search Contacts"
          className="mr-sm-2"
          onChange={onChange}
          disabled={contacts && contacts.length !== 0 ? false : true}
        />

        <Form.Group controlId="formBasicCheckbox" className="py-2">
          {radios.map((radio, index) => (
            <Form.Check
              key={index}
              inline
              type="radio"
              label={radio.name}
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            />
          ))}
        </Form.Group>
      </Form>
    </>
  );
};

export default SearchContacts;
