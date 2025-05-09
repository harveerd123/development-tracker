import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

const NavigationBar = () => {
    return (
        <Navbar bg="white" expand="lg" className="shadow-sm">
            <Container fluid className="d-flex justify-content-between">
                <Navbar.Brand as={Link} to="/">Development Tracker</Navbar.Brand>

                <div className="d-flex justify-content-center flex-grow-1">
                    <img
                        src="/src/assets/react.svg"
                        alt="React Logo"
                        style={{ height: '30px', objectFit: 'contain' }} // Adjust size as needed
                    />
                </div>
                
                <Nav className="ms-auto"> 
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/developments">Developments</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
