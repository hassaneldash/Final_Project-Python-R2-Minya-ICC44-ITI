import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector hook
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navv({ userName }) {
  const favorites = useSelector(state => state.favorites); // Get favorites from Redux store

  return (
    <Navbar expand="lg" className="MainNav" style={{ borderRadius: '3%', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/home" className='FontColor'>
              <FontAwesomeIcon icon={faHome} /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/favorites" className='FontColor'>
              <FontAwesomeIcon icon={faHeart} /> Favorites ({favorites.length})
            </Nav.Link>
          </Nav>

          {userName ? (
            <NavDropdown
              title={<span style={{ color: 'black' }}><FontAwesomeIcon icon={faUser} /> Hello <span>{userName}</span></span>}
              id="navbarScrollingDropdown"
              className="Dropdown"
              style={{ marginRight: '30px', marginLeft: '50px', zIndex: '1000' }}
            >
            </NavDropdown>
          ) : (
            <NavDropdown
              title={<span style={{ color: 'black' }}><FontAwesomeIcon icon={faUser} /></span>}
              id="navbarScrollingDropdown"
              className="Dropdown"
              style={{ marginRight: '30px', marginLeft: '50px', zIndex: '1000' }}
            >
              <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/signup">SignUp</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navv;
