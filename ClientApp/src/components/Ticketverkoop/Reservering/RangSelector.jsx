import React from "react";
import { Figure } from "./Figure";
import { Container, Card, CardTitle, CardText } from "reactstrap";

export function RangSelector({ setRangId, setShowStoelen }) {

    const handleRangClick = (id) => {
        console.log(id);
        setRangId(id);
        setShowStoelen(true);
    }

    return (
        <Container fluid={true} className='col-md-10 position-relative'>
            <Figure />

            <Card className="cardBtn text-start mb-3 bg-dark h4" onClick={() => handleRangClick(1)} >
                <CardTitle>1e rang</CardTitle>
                <CardText>€10 extra per stoel</CardText>
            </Card>

            <Card className="cardBtn text-start mb-3 bg-dark h4" onClick={() => handleRangClick(2)}>
                <CardTitle>2e rang</CardTitle>
                <CardText>€5 extra per stoel</CardText>
            </Card>

            <Card className="cardBtn text-start mb-3 bg-dark h4" onClick={() => handleRangClick(3)}>
                <CardTitle>3e rang</CardTitle>
                <CardText>€1,50 extra per stoel</CardText>
            </Card>
        </Container>
    );
}