import React, { useState, useContext, useEffect } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Alerts from "./Alerts";
import AlertContext from "../context/alert/AlertContext";
import AuthContext from "../context/auth/AuthContext";

const ResetPassword = ({ history, location }) => {
  const authContext = useContext(AuthContext);
  const {
    loading,
    resetPassword,
    isAuthenticated,
    error,
    clearErrors,
    message,
    clearMessages,
  } = authContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  useEffect(() => {
    if (isAuthenticated && !loading) {
      history.push("/");
    }
    if (error) {
      let errMsg = error;
      if (error === "Internal Server Error") {
        errMsg = `Not able to connect, Please try again`;
      }
      setAlert(errMsg, "danger");
      clearErrors();
    } else if (message) {
      setAlert(message, "success", 10000);
      clearMessages();
    }
    // eslint-disable-next-line
  }, [isAuthenticated, history, error, message]);

  const [email, setEmail] = useState("");

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (email === "") {
      setAlert("Please provide email address", "danger");
    } else {
      console.log("resetPassword email = ", email);
      resetPassword({ email });
    }
    clearErrors();
  };

  const Cancel = () => {
    history.push("/login");
  };
  return (
    <>
      {/* {loading ? (
        <div id="cover-spin"></div>
      ) : ( */}
      {loading && <div id="cover-spin"></div>}

      <Row>
        <Col></Col>
        <Col md={6}>
          <h2
            className="my-2"
            style={{ color: "darkblue", textAlign: "center" }}
          >
            <strong>Forgot My Password</strong>
          </h2>
          <Alerts />
          <Card className="mb-3">
            <Card.Body>
              <Form onSubmit={onSubmit}>
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
                    Enter your email address to receive a reset password link
                  </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" className="btn-block">
                  {loading ? "Sending ..." : "Request Password Reset"}
                </Button>
                <Button variant="light" onClick={Cancel} className="btn-block">
                  Cancel
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>
      {/* )} */}
    </>
  );
};

export default ResetPassword;
