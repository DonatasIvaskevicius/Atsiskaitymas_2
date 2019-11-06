import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";


class Navi extends Component {
    render() {
        return (
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Wheater</Navbar.Brand>
                    <Form inline className="ml-auto">
                        <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                        <Button variant="outline-light">Search</Button>
                    </Form>
                </Container>
            </Navbar>
        );
    }
}

Navi.propTypes = {};

export default Navi;
