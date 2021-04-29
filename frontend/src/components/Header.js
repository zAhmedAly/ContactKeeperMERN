import React, { useContext, useEffect } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import AuthContext from "../context/auth/AuthContext";

import {
  // FaUserPlus,
  FaAddressBook,
  // FaSignInAlt,
  // FaSignOutAlt,
} from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

const Header = ({ history }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user, loadUser, loading } = authContext;

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
      bg="primary"
      variant="dark"
      expand="lg"
      fixed="top"
    >
      <Container>
        {/* <LinkContainer to="/"> */}
        <Navbar.Brand>
          <FaAddressBook /> Contact Keeper
        </Navbar.Brand>
        {/* </LinkContainer> */}

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {user && (
            <Navbar.Text>
              {" "}
              <strong> Logged in as {user.name}</strong>
            </Navbar.Text>
          )}
          <Nav className="ml-auto">
            {!isAuthenticated && !loading && (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </>
            )}
            {isAuthenticated && (
              <>
                <LinkContainer to="/">
                  <Nav.Link>My Contacts</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/profile">
                  <Nav.Link>Profile</Nav.Link>
                </LinkContainer>

                <Nav.Link onClick={onLogout} href="#!">
                  Logout
                </Nav.Link>
              </>
            )}

            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  // return (
  //   <Navbar
  //     style={{
  //       color: "white",
  //       display: "flex",
  //       justifyContent: "space-between",
  //       alignItems: "center",
  //     }}
  //     collapseOnSelect
  //     expand="lg"
  //     bg="primary"
  //     fixed="top"
  //   >
  //     <Container>
  //       <LinkContainer
  //         to="/"
  //         style={{
  //           color: "white",
  //         }}
  //       >
  //         <Navbar.Brand>
  //           <FaAddressBook /> Contact Keeper
  //         </Navbar.Brand>
  //       </LinkContainer>
  //       <Navbar.Toggle
  //         aria-controls="responsive-navbar-nav"
  //         style={{ color: "white" }}
  //       />

  //       <Navbar.Collapse id="responsive-navbar-nav" style={{ color: "white" }}>
  //         <Nav className="ml-auto" style={{ color: "white" }}>
  //           <LinkContainer
  //             to="/about"
  //             style={{ color: "white", display: "flex", alignItems: "center" }}
  //           >
  //             <Nav.Link>About</Nav.Link>
  //           </LinkContainer>
  //           {user && (
  //             <NavDropdown title={user.name} id="collasible-nav-dropdown">
  //               <LinkContainer to="/about">
  //                 <NavDropdown.Item>Profile</NavDropdown.Item>
  //               </LinkContainer>
  //               <LinkContainer to="/">
  //                 <NavDropdown.Item>Contacts</NavDropdown.Item>
  //               </LinkContainer>
  //               <NavDropdown.Divider />
  //               <NavDropdown.Item onClick={onLogout} href="#!">
  //                 Logout
  //               </NavDropdown.Item>
  //             </NavDropdown>
  //           )}

  //           {!isAuthenticated && (
  //             <>
  //               <LinkContainer
  //                 to="/login"
  //                 style={{
  //                   color: "white",
  //                   display: "flex",
  //                   alignItems: "center",
  //                 }}
  //               >
  //                 <Nav.Link>
  //                   <FaSignInAlt /> Login
  //                 </Nav.Link>
  //               </LinkContainer>

  //               <LinkContainer
  //                 to="/register"
  //                 style={{
  //                   color: "white",
  //                   display: "flex",
  //                   alignItems: "center",
  //                 }}
  //               >
  //                 <Nav.Link>
  //                   <FaUserPlus /> Register
  //                 </Nav.Link>
  //               </LinkContainer>
  //             </>
  //           )}
  //           {isAuthenticated && (
  //             <Nav.Link
  //               style={{
  //                 color: "white",
  //                 display: "flex",
  //                 alignItems: "center",
  //               }}
  //               onClick={onLogout}
  //               href="#!"
  //             >
  //               <FaSignOutAlt />
  //               Logout
  //             </Nav.Link>
  //           )}
  //         </Nav>
  //       </Navbar.Collapse>
  //     </Container>
  //   </Navbar>
  // );
};

export default Header;
