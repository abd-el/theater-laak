import React from "react";
import { Card, Button, CardTitle, CardText, Container, CardImg, CardImgOverlay } from 'reactstrap';
import { Figure } from "./Figure";
import './Reservering.css'


export function Reservering() {

    return (
        <div style={{ position: 'relative', top: '100px', color: 'white', background: 'grey' }}>
            <Container fluid={true} className='col-md-10'>
                <Figure />

                <Card body className="text-start mb-3 bg-dark h4">
                    <CardTitle>1e rang</CardTitle>
                    <CardText>50€ per stoel</CardText>
                </Card>
                <Card body className="text-start mb-3 bg-dark h4">
                    <CardTitle>2e rang</CardTitle>
                    <CardText>25€ per stoel</CardText>
                </Card>
                <Card body className="text-start mb-3 bg-dark h4">
                    <CardTitle>3e rang</CardTitle>
                    <CardText>10€ per stoel</CardText>
                </Card>
            </Container>
        </div>
    );
}