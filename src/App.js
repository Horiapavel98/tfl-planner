import './App.css';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import BrandNavbar from './BrandNavbar';

const TFL_API_OUTBOUND_JOURNEY_ENDPOINT = "https://api.tfl.gov.uk/journey/journeyresults/1000257/to/1000080"
const TFL_API_INBOUND_JOURNEY_ENDPOINT = "https://api.tfl.gov.uk/journey/journeyresults/1000080/to/1000257"

function App() {

  const [outboundJourneyData, setOutboundJourneyData] = useState()
  const [inboundJourneyData, setInboundJourneyData] = useState()

  let getJourneyData = (json) => {
    var output = ["\n"]
    
    for (let i = 0 ; i < json['journeys'].length; ++i) {
        var journey = json['journeys'][i]
        var legs = journey['legs']
        var duration = journey['duration']
        var leg = legs[0]['departureTime']

        output.push(["Leaving at: ", leg.split("T")[1].substring(0, leg.split("T")[1].length - 3), " with a duration of ", duration, " minutes."])
        output.push("\n")
        output.push("\n")
    }

    return output
  }

  let getOutboundJourneyData = async () => {
    setOutboundJourneyData("Getting data ...")
    const json_response = await fetch(TFL_API_OUTBOUND_JOURNEY_ENDPOINT)
        .then(res => res.json())
    
    
    setOutboundJourneyData(getJourneyData(json_response))
  }

  let getInboundJourneyData = async () => {
    setInboundJourneyData("Getting data ...")
    const json_response = await fetch(TFL_API_INBOUND_JOURNEY_ENDPOINT)
        .then(res => res.json())
    
    setInboundJourneyData(getJourneyData(json_response))
  }
  
  return (
    <>
    <BrandNavbar/>
    <div className="App">
    <div className="Cards">
        <Card className="Card">
            <Card.Body>
                <Card.Title>Wembley Park Station to Farringdon</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-circle" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
                </svg>
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                    Outbound
                </Card.Subtitle>
                <Card.Text className="CardText">
                    {outboundJourneyData}
                </Card.Text>
                <Button onClick={getOutboundJourneyData}>Get next trains!</Button>
            </Card.Body>
        </Card>
        <Card className="Card">
            <Card.Body>
                <Card.Title>Farringdon to Wembley Park Station</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
                </svg>
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                    Inbound
                </Card.Subtitle>
                <Card.Text className="CardText">
                    {inboundJourneyData}
                </Card.Text>
                <Button onClick={getInboundJourneyData}>Get next trains!</Button>
            </Card.Body>
        </Card>
    </div>

    </div>
    </>
  );
}

export default App;
