import React, { useContext, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import AuthContext from "../context/auth/AuthContext";

import {
  FaUserPlus,
  FaAddressBook,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user, loadUser } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="primary"
      fixed="top"
      // defaultExpanded="false"
    >
      <Container
        style={{
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <LinkContainer
          to="/"
          style={{
            color: "white",
          }}
        >
          <Navbar.Brand>
            <FaAddressBook /> Contact Keeper
          </Navbar.Brand>
        </LinkContainer>
        {/* {user && (
          <Navbar.Text
            style={{
              color: "white",
              display: "flex",
              alignItems: "center",
            }}
          >
            Welcome {user.name}
          </Navbar.Text>
        )} */}
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          style={{ color: "white" }}
        />
        <Navbar.Collapse id="responsive-navbar-nav" style={{ color: "white" }}>
          <Nav className="ml-auto" style={{ color: "white" }}>
            <LinkContainer
              to="/about"
              style={{ color: "white", display: "flex", alignItems: "center" }}
            >
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
            {user && (
              <NavDropdown title={user.name} id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                <LinkContainer to="/">
                  <NavDropdown.Item>Contacts</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={onLogout} href="#!">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}

            {!isAuthenticated && (
              <>
                <LinkContainer
                  to="/login"
                  style={{
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Nav.Link>
                    <FaSignInAlt /> Login
                  </Nav.Link>
                </LinkContainer>

                <LinkContainer
                  to="/register"
                  style={{
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Nav.Link>
                    <FaUserPlus /> Register
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
            {isAuthenticated && (
              <Nav.Link
                style={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={onLogout}
                href="#!"
              >
                <FaSignOutAlt />
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
