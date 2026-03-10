import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function NavbarComponent() {
  return (
    <Navbar expand="lg" className="glass-nav py-3 px-4 fixed-top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <span className="font-display fs-3 tracking-widest text-uppercase">Gastro<span className="text-gold">Guide</span></span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" className="text-dark fw-600 px-3 mx-1 text-uppercase small tracking-wider">Restaurantes</Nav.Link>
            <Nav.Link as={Link} to="/admin" className="btn-premium ms-lg-3 mt-3 mt-lg-0">Panel de Control</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
