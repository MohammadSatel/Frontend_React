import React, { useContext } from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus, FaUser } from 'react-icons/fa';
import { TiHome } from "react-icons/ti";
import '../App.css';
import { UserContext } from '../App';

const NavBar = () => {
    const { uservalue } = useContext(UserContext);
    const [user] = uservalue;

    // Optionally, define a function to handle logout if it's different from login

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/" className="brand">Supermarket</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/categories"><TiHome className="icon" /> Shop</Nav.Link>
                        <NavDropdown title={<span><FaUser className="icon" />{user === 'user' ? ' Account' : user}</span>} id="basic-nav-dropdown">
                            {user === 'user' ? (
                                <>
                                    <NavDropdown.Item as={Link} to="/login">
                                        <FaSignInAlt className="icon" /> Log In
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/register">
                                        <FaUserPlus className="icon" /> Sign Up
                                    </NavDropdown.Item>
                                </>
                            ) : (
                                // Implement logout functionality here if it's different from simply navigating to '/login'
                                <NavDropdown.Item as={Link} to="/login">
                                    <FaSignInAlt className="icon" /> Log Out
                                </NavDropdown.Item>
                            )}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
