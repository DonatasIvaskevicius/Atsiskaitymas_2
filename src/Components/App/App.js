import React, {Component} from 'react';
import Main from "../Main/Main";
import Navi from "../Navi/Navi";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import './app.scss'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SearchInfo: "Kaunas"
            // SearchInfoChange: (text) => {console.log(text)}
        }

    }
    render()
    {
        return (
            <Container>
                <Row>
                    <Col>
                        <Navi
                            searchInfo={this.state.SearchInfo}
                            searchInfoChange={(text) => this.setState({SearchInfo: text})}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Main searchInfo={this.state.SearchInfo}/>
                    </Col>
                </Row>
                <Row>
                </Row>
            </Container>
        );
    }
}

export default App;
