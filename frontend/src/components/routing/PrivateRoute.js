import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading, loadUser, user } = authContext;
  console.log("<<< isAuthenticated >>> = ", isAuthenticated);
  console.log("<<< loading >>> = ", loading);
  console.log("<<< USER >>> = ", user);

  console.log(
    "<<< !isAuthenticated && !loading >>> = ",
    !isAuthenticated && !loading
  );

  useEffect(() => {
    if (user === null) {
      loadUser();
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
