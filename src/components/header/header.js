import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap'
import Login from "../auth/login";

export default function Header(props) {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">ToDo App</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home"> 🏠 Home</Nav.Link>
                </Nav>
                <Login />
            </Container>
        </Navbar>
    )
}