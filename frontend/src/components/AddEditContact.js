import React, { useState, useContext, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

import ContactContext from "../context/contact/ContactContext";

const AddEditContact = () => {
  const [contact, setContact] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  const { name, email, phone, type } = contact;

  const contactContext = useContext(ContactContext);

  const {
    addLoading,
    addContact,
    updateContact,
    current,
    clearCurrent,
  } = contactContext;

  const [open, setOpen] = useState(false);

  const onChange = (e) => {
    setOpen(true);
    if (e.target.name === "phone") {
      const formattedPhone = handleInput(e.target.value);
      setContact({ ...contact, phone: formattedPhone });
    } else {
      setContact({ ...contact, [e.target.name]: e.target.value });
    }
  };

  useEffect(
    () => {
      if (current !== null) {
        setContact(current);
        setOpen(true);
      } else {
        setContact({
          name: "",
          email: "",
          phone: "",
          type: "personal",
        });
      }
    },
    // eslint-disable-next-line
    [current]
  );

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearForm();
  };

  const onSubmitWide = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearFormWide();
  };

  const clearForm = () => {
    setContact({
      id: "",
      name: "",
      email: "",
      phone: "",
      type: "personal",
    });
    setOpen(!open);
    clearCurrent();
  };

  const clearFormWide = () => {
    setContact({
      id: "",
      name: "",
      email: "",
      phone: "",
      type: "personal",
    });
    clearCurrent();
  };

  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const handleInput = (value) => {
    const newPhone = value.replace(phoneRegex, "($1) $2-$3");
    return newPhone;
  };

  return (
    <div className="mb-3">
      <div className="d-lg-none d-md-block">
        {!open && !addLoading ? (
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            className="btn-block btn-lg"
          >
            <FaPlus /> Add Contact
          </Button>
        ) : (
          <>
            <h2
              className="my-2"
              style={{ color: "darkblue", textAlign: "center" }}
            >
              {current ? (
                <strong>Update Contact</strong>
              ) : (
                <strong>Add Contact</strong>
              )}
            </h2>

            <Card className="mb-3">
              <Card.Body>
                <Form onSubmit={onSubmit}>
                  <Form.Group controlId="formBasicContactName">
                    <Form.Label>Contact Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={name}
                      placeholder="Enter contact name"
                      onChange={onChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address *</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={email}
                      placeholder="user@example.com"
                      onChange={onChange}
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="formBasicPhone">
                    <Form.Label>Phone *</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={handleInput(phone)}
                      placeholder="Phone number xxx-xxx-xxxx"
                      onChange={onChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Label className="mr-4">Contact Type </Form.Label>
                    <Form.Check
                      inline
                      type="radio"
                      label="Personal"
                      name="type"
                      value="personal"
                      checked={type === "personal"}
                      onChange={onChange}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="Professional"
                      name="type"
                      value="professional"
                      checked={type === "professional"}
                      onChange={onChange}
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="btn-block"
                    disabled={!name || !email || !phone}
                  >
                    {addLoading ? (
                      <>Saving ...</>
                    ) : current ? (
                      "Update Contact"
                    ) : (
                      "Add Contact"
                    )}
                  </Button>
                  <Button
                    variant="light"
                    className="btn-block"
                    onClick={clearForm}
                  >
                    Cancel
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </>
        )}
      </div>
      <div className="d-none d-lg-block">
        <h2 className="my-2" style={{ color: "darkblue", textAlign: "center" }}>
          {current ? (
            <strong>Update Contact</strong>
          ) : (
            <strong>Add Contact</strong>
          )}
        </h2>

        <Card className="mb-3">
          <Card.Body>
            <Form onSubmit={onSubmitWide}>
              <Form.Group controlId="formBasicContactName">
                <Form.Label>Contact Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Enter contact name"
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address *</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  placeholder="user@example.com"
                  onChange={onChange}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicPhone">
                <Form.Label>Phone *</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={handleInput(phone)}
                  placeholder="Phone number xxx-xxx-xxxx"
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Label className="mr-4">Contact Type </Form.Label>
                <Form.Check
                  inline
                  type="radio"
                  label="Personal"
                  name="type"
                  value="personal"
                  checked={type === "personal"}
                  onChange={onChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Professional"
                  name="type"
                  value="professional"
                  checked={type === "professional"}
                  onChange={onChange}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="btn-block"
                disabled={!name || !email || !phone}
              >
                {addLoading ? (
                  <>Saving ...</>
                ) : current ? (
                  "Update Contact"
                ) : (
                  "Add Contact"
                )}
              </Button>
              <Button
                variant="light"
                className="btn-block"
                onClick={clearFormWide}
              >
                Cancel
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default AddEditContact;
