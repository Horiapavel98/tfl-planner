import React, { Component } from 'react';
import { Navbar, Container } from 'react-bootstrap';

class BrandNavbar extends Component {
    render() {
        return (
            <div>
                <Navbar variant="dark" bg="dark">
                    <Container>
                        <Navbar.Brand>TFL Planner</Navbar.Brand>
                        <Navbar.Collapse className="NavbarText">
                            <Navbar.Text>
                                by Horia Pavel, v0.1.1
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default BrandNavbar;
