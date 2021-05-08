import React, { useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import AlertContext from "../context/alert/AlertContext";
import AuthContext from "../context/auth/AuthContext";
import ResetConfirm from "./ResetConfirm";

const ResetPasswordCheck = ({ history, match }) => {
  // console.log("ResetPasswordCheck resetToken = ", match.params);

  const resetToken = match.params.resetToken || null;

  // console.log("ResetPasswordCheck resetToken = ", resetToken);

  const authContext = useContext(AuthContext);
  const {
    resetPasswordCheck,
    isAuthenticated,
    error,
    passwordReset,
  } = authContext;

  // console.log("ResetPasswordCheck isAuthenticated 1 = ", isAuthenticated);

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  useEffect(() => {
    if (isAuthenticated && !passwordReset) {
      // console.log(
      //   "ResetPasswordCheck useEffect isAuthenticated = ",
      //   isAuthenticated
      // );
      history.push("/");
    } else if (!resetToken) {
      // console.log("ResetPasswordCheck useEffect !resetToken = ", resetToken);
      history.push("/login");
    } else {
      // console.log("ResetPasswordCheck useEffect resetToken = ", resetToken);
      resetPasswordCheck(resetToken);
    }
    // eslint-disable-next-line
  }, [isAuthenticated, passwordReset, history, resetToken]);

  useEffect(() => {
    if (error) {
      let errMsg = error;
      // console.log("ResetPasswordCheck ERROR ", errMsg);
      if (error === "Internal Server Error") {
        errMsg = `Connection Error, Please try again`;
      }
      setAlert(errMsg, "danger");
      // clearErrors();
    }
    // eslint-disable-next-line
  }, [error]);

  // console.log("ResetPasswordCheck isAuthenticated 2 = ", isAuthenticated);
  // console.log("ResetPasswordCheck error =", error);
  // console.log("ResetPasswordCheck !passwordReset =", !passwordReset);
  // console.log("ResetPasswordCheck !loading =", !loading);

  // console.log(
  //   "ResetPasswordCheck !isAuthenticated && !passwordReset && !loading  =",
  //   !isAuthenticated && !passwordReset && !loading
  // );

  return (
    <>
      {/* {loading && <div id="cover-spin"></div>} */}
      {!isAuthenticated && !passwordReset && error && (
        <>
          <div className="text-center" style={{ marginTop: "10%" }}>
            <Row>
              <Col />
              <Col md={6}>
                <h4>Reset Password Link Expried or Not Valid</h4>
              </Col>
              <Col />
            </Row>
            <br />
            <p>
              <Row>
                <Col />
                <Col md={6} style={{ marginBottom: "10px" }}>
                  <a href="/reset-password"> Resend Reset Password Link </a>
                </Col>
                <Col />
              </Row>
              <Row>
                <Col />
                <Col md={6} float="right">
                  <a href="/login"> Relogin </a>
                </Col>
                <Col />
              </Row>
            </p>
          </div>
        </>
      )}

      {passwordReset && <ResetConfirm resetToken={resetToken} />}
    </>
  );
};

export default ResetPasswordCheck;
