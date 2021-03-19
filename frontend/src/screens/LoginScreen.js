import React, { useState, useContext, useEffect } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Alerts from "../components/Alerts";
import AlertContext from "../context/alert/AlertContext";
import AuthContext from "../context/auth/AuthContext";

const LoginScreen = ({ history, location }) => {
  const authContext = useContext(AuthContext);
  const { loading, login, isAuthenticated, error, clearErrors } = authContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  useEffect(() => {
    if (isAuthenticated && !loading) {
      history.push("/");
    }

    if (error) {
      let errMsg = error;
      if (error === "Internal Server Error") {
        errMsg = `${error} ... Please Try again`;
      }
      setAlert(errMsg, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [isAuthenticated, history, error]);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = loginData;

  const onChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please fill in all fields", "danger");
    } else {
      login({
        email,
        password,
      });
    }
  };

  return (
    <>
      {loading ? (
        <div id="cover-spin"></div>
      ) : (
        <Row>
          <Col></Col>
          <Col md={6}>
            <h2
              className="my-2"
              style={{ color: "darkblue", textAlign: "center" }}
            >
              <strong>User Login</strong>
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
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password *</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={password}
                      placeholder="Enter Password ..."
                      onChange={onChange}
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="btn-block"
                    // disabled={!email || !password}
                  >
                    {loading ? "LoggingIn ..." : "User Login"}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      )}
    </>
  );
};

export default LoginScreen;
