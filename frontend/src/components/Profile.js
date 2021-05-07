import React from "react";
import { Col, Row } from "react-bootstrap";

const Profile = () => {
  return (
    <>
      <Row>
        <Col />
        <Col md={6}>
          <h2
            className="my-2"
            style={{ color: "darkblue", textAlign: "center" }}
          >
            <strong>User Profile</strong>
          </h2>
        </Col>
        <Col />
      </Row>
    </>
  );
};

export default Profile;
