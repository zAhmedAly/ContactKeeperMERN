import React from "react";

const ErrorFallback = ({ error }) => {
  return (
    <div role="alert">
      <p>Oops, there was an error:</p>
      <p style={{ color: "red" }}>{error.message}</p>
    </div>
  );
};

export default ErrorFallback;
