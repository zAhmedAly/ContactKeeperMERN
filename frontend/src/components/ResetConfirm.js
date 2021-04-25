import React, { useState, useContext, useEffect } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Alerts from "../components/Alerts";
import AlertContext from "../context/alert/AlertContext";
import AuthContext from "../context/auth/AuthContext";

const ResetConfirm = ({ history, match, resetToken }) => {
  // console.log("ResetConfirm resetToken = ", match.params);

  // const resetToken = match.params.resetToken;

  console.log("ResetConfirm resetToken = ", resetToken);

  const [resetPassword, setResetPasswordData] = useState({
    password: "",
    cpassword: "",
  });

  const { password, cpassword } = resetPassword;

  const authContext = useContext(AuthContext);
  const {
    loading,
    resetPasswordConfirm,
    isAuthenticated,
    error,
    clearErrors,
    message,
    clearMessages,
  } = authContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const onChange = (e) => {
    setResetPasswordData({ ...resetPassword, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    } else if (!resetToken) {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, [isAuthenticated, history, resetToken]);

  useEffect(() => {
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
  }, [error, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (password !== cpassword) {
      setAlert("Passwords do not match", "danger");
    } else {
      resetPasswordConfirm(resetToken, password);
      setResetPasswordData({
        password: "",
        cpassword: "",
      });
    }
  };

  const Cancel = () => {
    history.push("/login");
  };

  return (
    <>
      {loading && <div id="cover-spin"></div>}
      {resetToken && (
        <Row>
          <Col></Col>
          <Col md={6}>
            <h2
              className="my-2"
              style={{ color: "darkblue", textAlign: "center" }}
            >
              <strong>Reset Your Password</strong>
            </h2>
            <Alerts />
            <Card className="mb-3">
              <Card.Body>
                <Form onSubmit={onSubmit}>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password *</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={password}
                      placeholder="Enter New Password ..."
                      onChange={onChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicCPassword">
                    <Form.Label>Confirm Password *</Form.Label>
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
                    disabled={!password || !cpassword}
                  >
                    {loading ? "Saving ..." : "Reset Password"}
                  </Button>
                  <Button
                    variant="light"
                    onClick={Cancel}
                    className="btn-block"
                  >
                    Cancel
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

export default ResetConfirm;
