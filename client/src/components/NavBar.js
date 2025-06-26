import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">ArtCollab</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/artists">Artists</Nav.Link>
          <Nav.Link as={Link} to="/projects">Projects</Nav.Link>
          <Nav.Link as={Link} to="/collaborations">Collaborations</Nav.Link>
          <Nav.Link as={Link} to="/new-artist">New Artist</Nav.Link>
          <Nav.Link as={Link} to="/new-project">New Project</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;