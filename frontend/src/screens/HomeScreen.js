// import { useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import AddEditContact from "../components/AddEditContact";
import Contacts from "../components/Contacts";
// import AuthContext from "../context/auth/AuthContext";
// import ContactContext from "../context/contact/ContactContext";

const HomeScreen = () => {
  return (
    <>
      <Row>
        <Col lg={6}>
          <AddEditContact />
        </Col>
        <Col />
        <Col lg={5}>
          <Contacts />
        </Col>
      </Row>
    </>
  );
};

export default HomeScreen;
