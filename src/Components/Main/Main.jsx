import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import ListGroup from "react-bootstrap/ListGroup";
import CardDeck from "react-bootstrap/CardDeck";


class Main extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
            value: "Kaunas",
            places: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }


    handleSubmit(event) {
        event.preventDefault();
        this.setState({value: event.target[0].value})
        fetch(`https://cors-anywhere.herokuapp.com/https://api.meteo.lt/v1/places/${event.target[0].value}/forecasts/long-term`)
            .then(response => response.json())
            .then(data => {this.setState({places: data.place.name}); this.setState({data: data.forecastTimestamps})})
    }

    componentDidMount() {
        fetch(`https://cors-anywhere.herokuapp.com/https://api.meteo.lt/v1/places/${this.state.value}/forecasts/long-term`)
            .then(response => response.json())
            .then(data => {this.setState({places: data.place.name}); this.setState({data: data.forecastTimestamps})})

    }

    render() {

        let weatherTime = [];
        let uniqueWeatherTime = [];
        if(this.state.data.length > 0)
         weatherTime = this.state.data.map((item) =>
            (item.forecastTimeUtc.substring(0, 10)));

        uniqueWeatherTime = weatherTime.filter((v, i, a) => a.indexOf(v) === i);

        console.log(uniqueWeatherTime)


        const weatherCards = this.state.data.map((item) =>
            <Card style={{minWidth: "10rem", maxWidth: "10rem"}}>
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="text-center">{item.forecastTimeUtc}</ListGroup.Item>
                        <ListGroup.Item className="text-center">{item.airTemperature}</ListGroup.Item>
                        <ListGroup.Item className="text-center">{item.windDirection}</ListGroup.Item>
                        <ListGroup.Item className="text-center">{item.windGust}</ListGroup.Item>
                        <ListGroup.Item className="text-center">{item.conditionCode}</ListGroup.Item>
                        <ListGroup.Item className="text-center">{item.cloudCover}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>);

        return (
            <main>
                {uniqueWeatherTime}
                <h1>{this.state.places}</h1>
                <form onSubmit={this.handleSubmit}>
                        <input type="text" defaultValue={this.state.value}/>
                    <input type="submit" value="Submit"/>
                </form>
                <Card>
                    <Card.Header>
                        <Nav variant="tabs" defaultActiveKey="#first">
                            <Nav.Item>
                                <Nav.Link href="#first">Today</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#second">Monday</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <Card.Body>
                        <CardDeck>
                            {weatherCards}
                        </CardDeck>
                    </Card.Body>
                </Card>
            </main>
        );
    }
}

Main.propTypes = {};

export default Main;


