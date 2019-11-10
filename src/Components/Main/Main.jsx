import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import ListGroup from "react-bootstrap/ListGroup";
import CardDeck from "react-bootstrap/CardDeck";
import style from './main.scss';
import CardGroup from "react-bootstrap/CardGroup";


class Main extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
            value: this.props.searchInfo,
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
        this.setState({value: this.props.searchInfo});

        fetch(`https://api.meteo.lt/v1/places/${this.state.value}/forecasts/long-term`)
            .then(response => response.json())
            .then(data => {
                this.setState({places: data.place.name});
                this.setState({data: data.forecastTimestamps});
                this.setState({showedData: ""});

            })
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.searchInfo !== prevProps.searchInfo) {
            fetch(`https://api.meteo.lt/v1/places/${this.props.searchInfo}/forecasts/long-term`)
                .then(response => response.json())
                .then(data => {
                    this.setState({places: data.place.name});
                    this.setState({data: data.forecastTimestamps});
                    this.setState({showedData: ""});})
        }
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

        uniqueWeatherTime = weatherTime.filter((v, i, a) => a.indexOf(v) === i); //rasta stackoverflow


        function WeekDay(item) {
            let i = new Date(item).getDay();
            if (i == 0) return "Sekmadienis";
            else if (i == 1) return "Pirmadienis";
            else if (i == 2) return "Antradienis";
            else if (i == 3) return "Treciadienis";
            else if (i == 4) return "Ketvirtadienis";
            else if (i == 5) return "Penktadienis";
            else if (i == 6) return "Šeštadienis"
        }

        const uniqueWeatherTimeTabs = uniqueWeatherTime.map((item) =>
            <Nav.Item>
                <Nav.Link onClick={() => this.changeDay(item)}>{WeekDay(item)}</Nav.Link>
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
                <Card  style={{minWidth: "10rem", maxWidth: "10rem",}}>
                    <Card.Body >
                        <ListGroup  variant="flush">
                            <ListGroup.Item
                                className="Scroll text-center">Time: {item.forecastTimeUtc.substring(10, 16)}</ListGroup.Item>
                            <ListGroup.Item className="Scroll text-center">{item.airTemperature} °C</ListGroup.Item>
                            <ListGroup.Item className="Scroll text-center">Wind: {item.windGust}</ListGroup.Item>
                            <ListGroup.Item className="Scroll text-center">Condition: {item.conditionCode}</ListGroup.Item>
                            <ListGroup.Item className="Scroll text-center">Cloud cover: {item.cloudCover}</ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>);

        } else {
            weatherCards = this.state.showedData.map((item) =>
                <Card  style={{minWidth: "10rem", maxWidth: "10rem"}}>
                    <Card.Body  >
                        <ListGroup  variant="flush">
                            <ListGroup.Item
                                className="Scroll text-center">Time: {item.forecastTimeUtc.substring(10, 16)}</ListGroup.Item>
                            <ListGroup.Item className="Scroll text-center">{item.airTemperature} °C</ListGroup.Item>
                            <ListGroup.Item className="Scroll text-center">Wind: {item.windGust}</ListGroup.Item>
                            <ListGroup.Item className="Scroll text-center">Condition: {item.conditionCode}</ListGroup.Item>
                            <ListGroup.Item className="Scroll text-center">Cloud cover: {item.cloudCover}</ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>);
        }


        return (
            <main>
                <h1>{this.state.places}</h1>
                <Card >
                    <Card.Header className="CardTabs">
                        <Nav variant="tabs" defaultActiveKey="#first">
                            {uniqueWeatherTimeTabs}
                        </Nav>
                    </Card.Header>
                    <Card.Body className="mainCard">
                        <CardGroup className="mainCardCards">
                            {weatherCards}
                        </CardGroup>
                    </Card.Body>
                </Card>
            </main>
        );
    }
}

Main.propTypes = {};

export default Main;


