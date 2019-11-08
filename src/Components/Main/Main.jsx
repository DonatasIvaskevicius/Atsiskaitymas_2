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
            showedData: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeDay = this.changeDay.bind(this);
    }

    changeDay(day) {

        let filteredTabs = [];
        for (let i of this.state.data) {
            if (i.forecastTimeUtc.substring(0, 10) == day) {
                filteredTabs.push(i)
            }
        }
        this.setState({showedData: filteredTabs})

    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({value: event.target[0].value});
        fetch(`https://api.meteo.lt/v1/places/${event.target[0].value}/forecasts/long-term`)
            .then(response => response.json())
            .then(data => {
                this.setState({places: data.place.name});
                this.setState({data: data.forecastTimestamps});
                this.setState({showedData: ""});

            })
    }

    componentDidMount() {
        fetch(`https://api.meteo.lt/v1/places/${this.state.value}/forecasts/long-term`)
            .then(response => response.json())
            .then(data => {
                this.setState({places: data.place.name});
                this.setState({data: data.forecastTimestamps})
            })

    }

    render() {
        let weatherTime = [];
        let uniqueWeatherTime = [];
        if (this.state.data.length > 0)
            weatherTime = this.state.data.map((item) =>
                (item.forecastTimeUtc.substring(0, 10)));

        uniqueWeatherTime = weatherTime.filter((v, i, a) => a.indexOf(v) === i);


        const uniqueWeatherTimeTabs = uniqueWeatherTime.map((item) =>
            <Nav.Item>
                <Nav.Link onClick={() => this.changeDay(item)}>{item}</Nav.Link>
            </Nav.Item>);


        let filteredDays = [];

        if (this.state.data.length > 0) {
            for (let i of this.state.data)
                if (i.forecastTimeUtc.substring(0, 10) == uniqueWeatherTime[0]) {
                    filteredDays.push(i)
                }
        }

        let weatherCards = [];
        if (this.state.showedData == []) {
            weatherCards = filteredDays.map((item) =>
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

        } else {
            weatherCards = this.state.showedData.map((item) =>
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
        }

        return (
            <main>
                <h1>{this.state.places}</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" defaultValue={this.state.value}/>
                    <input type="submit" value="Submit"/>
                </form>
                <Card>
                    <Card.Header>
                        <Nav variant="tabs" defaultActiveKey="#first">
                            {uniqueWeatherTimeTabs}
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


