import React, { useEffect, useState } from "react";
import { Card, Button, CardTitle, CardText, Container, CardImg, CardImgOverlay, Table, TableProps } from 'reactstrap';
import { Figure } from "./Figure";
import './Reservering.css'


export function Reservering() {
    const [hideRangSelectie, setHideRangSelectie] = useState(false);
    const [hideEersteRang, setHideEersteRang] = useState(true);
    const [hideTweedeRang, setHideTweedeRang] = useState(true);
    const [hideDerdeRang, setHideDerdeRang] = useState(true);
    const [Stoelen, setStoelen] = useState();


    useEffect(() => {
        const stoelen = addStoelen(200);
        setStoelen(stoelen);
    }, []);
    

    const addStoelen = (aantal) => {
        const rij = [];
        for (let index = 0; index < aantal; index++) {
            let rijNummer;
            if (index < 50) rijNummer = 1;
            else if (index < 100) rijNummer = 2;
            else if (index < 150) rijNummer = 3;
            else rijNummer = 4;

            rij.push(
                <td 
                    onClick={handleStoelClick}
                    className="datacell p-3 h5"
                    key={index}
                    stoelnr={index + 1}
                    rijnr={rijNummer}>
                    Stoel {index + 1}
                </td>
            );
        }
        return rij;
    }

    const handleStoelClick = (e) => {
        console.log(e.target.attributes.rijnr.value);
        console.log(e.target.attributes.stoelnr.value);
    }


    const handleRangClick = (e) => {
        setHideRangSelectie(true);
        setHideEersteRang(false);
    }


    return (
        <div style={{ position: 'relative', top: '50px', color: 'white', background: 'grey', paddingBottom: '1px' }}>
            <Container fluid={true} className='col-md-10' hidden={hideRangSelectie}>
                <Figure />

                <Card className="cardBtn text-start mb-3 bg-dark h4" onClick={handleRangClick} >
                    <CardTitle>1e rang</CardTitle>
                    <CardText>50€ per stoel</CardText>
                </Card>
                <Card className="cardBtn text-start mb-3 bg-dark h4">
                    <CardTitle>2e rang</CardTitle>
                    <CardText>25€ per stoel</CardText>
                </Card>
                <Card className="cardBtn text-start mb-3 bg-dark h4">
                    <CardTitle>3e rang</CardTitle>
                    <CardText>10€ per stoel</CardText>
                </Card>
            </Container>

            <Container fluid={true} className='col-md-10' hidden={hideEersteRang}>
                <Figure />

                <table className="table table-responsive d-flex table-hover table-bordered table-dark bg-dark">
                    <tbody>
                        <tr>
                            <th scope="row">Rij 1</th>
                            {!Stoelen ? <td>Leeg</td> :
                                Array.from(Stoelen).slice(0, 50)

                                    .map((currentValue) => {
                                        return currentValue;
                                    })

                            }
                        </tr>
                        <tr>
                            <th scope="row" >Rij 2</th>
                            {!Stoelen ? <td>Leeg</td> : Array.from(Stoelen).slice(50, 100)

                                .map((currentValue) => {
                                    return currentValue;
                                })

                            }
                        </tr>
                        <tr>
                            <th scope="row">Rij 3</th>
                            {!Stoelen ? <td>Leeg</td> : Array.from(Stoelen).slice(100, 150)

                                .map((currentValue) => {
                                    return currentValue;
                                })

                            }
                        </tr>
                        <tr>
                            <th scope="row">Rij 4</th>
                            {!Stoelen ? <td>Leeg</td> : Array.from(Stoelen).slice(150, 200)

                                .map((currentValue) => {
                                    return currentValue;
                                })

                            }
                        </tr>
                    </tbody>
                </table>

            </Container>
        </div>
    );
}