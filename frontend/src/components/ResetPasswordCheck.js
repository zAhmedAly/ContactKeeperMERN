import React, { useContext, useEffect } from "react";
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
    clearErrors,
    passwordReset,
  } = authContext;

  console.log("ResetPasswordCheck isAuthenticated 1 = ", isAuthenticated);

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  useEffect(() => {
    if (isAuthenticated && passwordReset) {
      console.log(
        "ResetPasswordCheck useEffect isAuthenticated = ",
        isAuthenticated
      );
      history.push("/");
    } else if (!resetToken) {
      console.log("ResetPasswordCheck useEffect !resetToken = ", resetToken);
      history.push("/login");
    } else {
      console.log("ResetPasswordCheck useEffect resetToken = ", resetToken);
      resetPasswordCheck(resetToken);
    }
    // eslint-disable-next-line
  }, [isAuthenticated, history, resetToken]);

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

  console.log("ResetPasswordCheck isAuthenticated 2 = ", isAuthenticated);
  console.log(
    "ResetPasswordCheck error && !passwordReset=",
    !passwordReset && error
  );

  console.log("ResetPasswordCheck error =", error);
  console.log("ResetPasswordCheck !passwordReset =", !passwordReset);

  return (
    <>
      {/* {loading && <div id="cover-spin"></div>} */}
      {!passwordReset && error ? (
        <>
          <div className="text-center" style={{ marginTop: "10%" }}>
            <h3>Reset Password Link Expried or Not Valid</h3>
            <br />
            <p>
              <a href="/reset-password"> Resend Reset Password Link </a>
            </p>
          </div>
        </>
      ) : (
        <ResetConfirm resetToken={resetToken} />
      )}
    </>
  );
};

export default ResetPasswordCheck;
