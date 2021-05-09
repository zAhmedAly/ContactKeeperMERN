import React, { useState, useContext, useEffect } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Alerts from "../components/Alerts";
import AlertContext from "../context/alert/AlertContext";
import AuthContext from "../context/auth/AuthContext";

const RegisterScreen = ({ history }) => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const { name, email, password, cpassword } = registerData;

  const authContext = useContext(AuthContext);
  const {
    loading,
    register,
    isAuthenticated,
    error,
    clearErrors,
  } = authContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const onChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }

    if (error) {
      let errMsg = error;
      if (error === "Internal Server Error") {
        errMsg = `Not able to connect, Please try again`;
      }
      setAlert(errMsg, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [isAuthenticated, history, error]);

  const onSubmit = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (password !== cpassword) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  return (
    <>
      {loading && <div id="cover-spin"></div>}
      <Row>
        <Col></Col>
        <Col md={6}>
          <h2
            className="my-2"
            style={{ color: "darkblue", textAlign: "center" }}
          >
            <strong>Register User</strong>
          </h2>
          <Alerts />
          <Card className="mb-3">
            <Card.Body>
              <Form onSubmit={onSubmit}>
                <Form.Group controlId="formBasicContactName">
                  <Form.Label>
                    <strong>Name *</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={name}
                    placeholder="Enter user name"
                    onChange={onChange}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>
                    <strong>Email Address *</strong>
                  </Form.Label>
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
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>
                    <strong>Password *</strong>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Enter Password ..."
                    onChange={onChange}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicCPassword">
                  <Form.Label>
                    <strong>Confirm Password *</strong>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="cpassword"
                    value={cpassword}
                    placeholder="Confirm Password ..."
                    onChange={onChange}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="btn-block"
                  disabled={!name || !email || !password || !cpassword}
                >
                  {loading ? "Saving ..." : "Register User"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>
      {/* <div style={{ width: "60%", margin: "auto" }}></div> */}
    </>
  );
};

export default RegisterScreen;
