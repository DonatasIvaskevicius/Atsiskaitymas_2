import React from 'react';
import './App.css';
import Main from "../Main/Main";
import Navi from "../Navi/Navi";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"



function App() {
    return (
        <Container>
            <Row>
                <Col>
                    <Navi/>
                </Col>
            </Row>
            <Row>
                <Col>
                  <Main/>
                </Col>
            </Row>
            <Row>
            </Row>
        </Container>
    );
}

export default App;
