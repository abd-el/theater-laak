import React, { useEffect, useRef, useState } from "react";
import { Card, Button, CardTitle, CardText, Container, CardImg, CardImgOverlay, Table, TableProps } from 'reactstrap';
import { Figure } from "./Figure";
import './Reservering.css'


export function Reservering() {
    const [hideRangSelectie, setHideRangSelectie] = useState(false);
    const [hideStoelen, setHideStoelen] = useState(true);
    const [Stoelen, setStoelen] = useState();
    const [selectie, setSelectie] = useState([]);
    const [rangId, setRangId] = useState();


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

            
            // <td
            //     onClick={handleStoelClick}
            //     className="datacell p-3 h5"
            //     key={index}
            //     stoelnr={index + 1}
            //     rijnr={rijNummer}>
            //     Stoel {index + 1}
            // </td>

            rij.push({
                stoelNr: index + 1,
                rijNr: rijNummer,
                stoel: index + 1,    
            });
        }
        return rij;
    }


    const handleStoelClick = (e) => {
        const _rangId = document.getElementById('rang').innerText;
        const attr = e.target.attributes;
        const obj = {
            rangId: rangId,
            rijId: attr.rijnr.value,
            stoelId: attr.stoelnr.value,
        }
        if (!selectie) {
            setSelectie([obj]);
        }
        else {
            setSelectie([...selectie, obj]);
        }
    }


    useEffect(() => {
        console.log(selectie);
    }, [selectie]);


    const handleRangClick = (e) => {
        setRangId(e.target.parentNode.id);
        setHideRangSelectie(true);
        setHideStoelen(false);
    }


    return (
        <div className='ReserveringContainer'>
            <Container fluid={true} className='col-md-10' hidden={hideRangSelectie}>
                <Figure />

                <Card className="cardBtn text-start mb-3 bg-dark h4" id={1} onClick={handleRangClick} >
                    <CardTitle>1e rang</CardTitle>
                    <CardText>50€ per stoel</CardText>
                </Card>
                <Card className="cardBtn text-start mb-3 bg-dark h4" id={2} onClick={handleRangClick}>
                    <CardTitle>2e rang</CardTitle>
                    <CardText>25€ per stoel</CardText>
                </Card>
                <Card className="cardBtn text-start mb-3 bg-dark h4" id={3} onClick={handleRangClick}>
                    <CardTitle>3e rang</CardTitle>
                    <CardText>10€ per stoel</CardText>
                </Card>
            </Container>

            <Container fluid={true} className='col-md-10' hidden={hideStoelen}>
                <Figure />

                <table className="stoeltabel table table-responsive d-flex table-hover table-bordered table-dark bg-dark">
                    <tbody>
                        <tr>
                            <th scope="row">Rij 1</th>
                            {!Stoelen ? <td>Leeg</td> :
                                Array.from(Stoelen)
                                .slice(0, 50)
                                .map((currentValue, index) => {
                                    return (<td
                                        onClick={handleStoelClick}
                                        className="datacell p-3 h5"
                                        key={index}
                                        stoelnr={currentValue.stoelNr}
                                        rijnr={currentValue.rijNr}>
                                        Stoel {currentValue.stoelNr}
                                    </td>)
                                })
                            }
                        </tr>
                        <tr>
                            <th scope="row" >Rij 2</th>
                            {!Stoelen ? <td>Leeg</td> : Array.from(Stoelen).slice(50, 100)

                                .map((currentValue, index) => {
                                    return (<td
                                        onClick={handleStoelClick}
                                        className="datacell p-3 h5"
                                        key={index}
                                        stoelnr={currentValue.stoelNr}
                                        rijnr={currentValue.rijNr}>
                                        Stoel {currentValue.stoelNr}
                                    </td>)
                                })

                            }
                        </tr>
                        <tr>
                            <th scope="row">Rij 3</th>
                            {!Stoelen ? <td>Leeg</td> : Array.from(Stoelen).slice(100, 150)
                                .map((currentValue, index) => {
                                    return (<td
                                        onClick={handleStoelClick}
                                        className="datacell p-3 h5"
                                        key={index}
                                        stoelnr={currentValue.stoelNr}
                                        rijnr={currentValue.rijNr}>
                                        Stoel {currentValue.stoelNr}
                                    </td>)
                                })
                            }
                        </tr>
                        <tr>
                            <th scope="row">Rij 4</th>
                            {!Stoelen ? <td>Leeg</td> : Array.from(Stoelen).slice(150, 200)

                                .map((currentValue, index) => {
                                    return (<td
                                        onClick={handleStoelClick}
                                        className="datacell p-3 h5"
                                        key={index}
                                        stoelnr={currentValue.stoelNr}
                                        rijnr={currentValue.rijNr}>
                                        Stoel {currentValue.stoelNr}
                                    </td>)
                                })
                            }
                        </tr>
                    </tbody>
                </table>

            </Container>

            <h3 id="rang" hidden={true}>{rangId}</h3>

        </div>
    );
}