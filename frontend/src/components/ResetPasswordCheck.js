import React, { useContext, useEffect } from "react";
import Alerts from "./Alerts";
import AlertContext from "../context/alert/AlertContext";
import AuthContext from "../context/auth/AuthContext";
import ResetConfirm from "./ResetConfirm";

const ResetPasswordCheck = ({ history, match }) => {
  console.log("ResetPasswordCheck resetToken = ", match.params);

  const resetToken = match.params.resetToken;

  console.log("ResetPasswordCheck resetToken = ", resetToken);

  const authContext = useContext(AuthContext);
  const {
    loading,
    resetPasswordCheck,
    isAuthenticated,
    error,
    clearErrors,
  } = authContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    } else if (!resetToken) {
      history.push("/login");
    }
    resetPasswordCheck(resetToken);
    // eslint-disable-next-line
  }, [isAuthenticated, history]);

  useEffect(() => {
    if (error) {
      let errMsg = error;
      console.log("ResetPasswordCheck ERROR ", errMsg);
      if (error === "Internal Server Error") {
        errMsg = `Not able to connect, Please try again`;
      }
      setAlert(errMsg, "danger", 10000);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error]);

  return (
    <>
      {/* {loading && <div id="cover-spin"></div>} */}
      {error && !loading ? (
        <>
          <Alerts />
          <p
            style={{
              float: "right",
            }}
          >
            <a href="/reset-password"> Resend Reset Password Link </a>
          </p>
        </>
      ) : (
        <ResetConfirm resetToken={resetToken} />
      )}
    </>
  );
};

export default ResetPasswordCheck;
