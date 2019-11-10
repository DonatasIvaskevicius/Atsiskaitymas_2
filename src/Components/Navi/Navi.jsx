import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import './navi.scss'


class Navi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SearchInfo: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.searchInfoChange(event.target[0].value)


    }

    render(props) {
        return (
            <Navbar bg="primary" variant="dark">
                    <Navbar.Brand href="/">Weather</Navbar.Brand>
                    <Form inline className="ml-auto" onSubmit={this.handleSubmit}>
                        <FormControl type="text" placeholder="Paieška"
                                     className="mr-sm-2"

                        />
                        <Button variant="outline-light" type="submit">Search</Button>
                    </Form>
            </Navbar>
        );
    }
}

Navi.propTypes = {};

export default Navi;
