import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

function NavBar({ user, setUser }) {
  const history = useHistory();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    history.push("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">ArtCollab</Navbar.Brand>
        <Nav className="me-auto">
          <Link className="nav-link" to="/artists">Artists</Link>
          <Link className="nav-link" to="/projects">Projects</Link>
          <Link className="nav-link" to="/collaborations">Collaborations</Link>
          {user && (
            <Link className="nav-link" to="/new-project">New Project</Link>
          )}
        </Nav>
        <Nav className="ms-auto">
          {!user && (
            <>
              <Link className="nav-link" to="/signin">Sign In</Link>
              <Link className="nav-link" to="/signup">Sign Up</Link>
            </>
          )}
          {user && (
            <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
