import React, { useEffect, useRef, useState } from "react";
import { Card, Button, CardTitle, CardText, Container, CardImg, CardImgOverlay, Table, TableProps } from 'reactstrap';
import { Figure } from "./Figure";
import { InfoTab } from "../InfoTab";
import './Reservering.css'
import { backendApi } from "../../api";


export function Reservering({ optredenId }) {
    const [hideRangSelectie, setHideRangSelectie] = useState(false);
    const [hideStoelen, setHideStoelen] = useState(true);
    const [Stoelen, setStoelen] = useState();
    const [selectie, setSelectie] = useState([]);
    const [rangId, setRangId] = useState();


    useEffect(() => {
        const stoelen = addStoelen(200);
        setStoelen(stoelen);

        const getData = async () => {
            const resp = await backendApi.get(`api/optreden/GetStoelen?optredenId=${optredenId}`);
            console.log(resp.statusText);
            console.log(resp.data);
        }
        getData();

    }, [optredenId]);


    const addStoelen = (aantal) => {
        const rij = [];
        for (let index = 0; index < aantal; index++) {
            let rijNummer;
            if (index < 50) rijNummer = 1;
            else if (index < 100) rijNummer = 2;
            else if (index < 150) rijNummer = 3;
            else rijNummer = 4;


            rij.push({
                stoelid: index + 1,
                rijid: rijNummer,
            });
        }
        return rij;
    }


    const handleStoelClick = (e) => {
        const attr = e.target.attributes;
        const obj = {
            stoelId: attr.stoelid.value,
            zaalId: 3,
            rang: rangId,
            rij: attr.rijid.value
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
        console.log(e.target);
        setRangId(e.target.parentNode.id);
        setHideRangSelectie(true);
        setHideStoelen(false);
    }


    return (
        <div className='ReserveringContainer pb-2'>
            <Container fluid={true} className='col-md-10 position-relative' hidden={hideRangSelectie}>
                <Figure />

                <Card className="cardBtn text-start mb-3 bg-dark h4" id={1} onClick={handleRangClick} >
                    <CardTitle>1e rang</CardTitle>
                    <CardText>€10 extra per stoel</CardText>
                </Card>

                <Card className="cardBtn text-start mb-3 bg-dark h4" id={2} onClick={handleRangClick}>
                    <CardTitle>2e rang</CardTitle>
                    <CardText>€5 extra per stoel</CardText>
                </Card>

                <Card className="cardBtn text-start mb-3 bg-dark h4" id={3} onClick={handleRangClick}>
                    <CardTitle>3e rang</CardTitle>
                    <CardText>€1,50 extra per stoel</CardText>
                </Card>
            </Container>

            <Container fluid={true} className='col-md-10 position-relative' hidden={hideStoelen}>
                <Figure />
                <table className="stoeltabel table table-responsive d-flex table-hover table-bordered table-dark bg-dark position-relative">
                    <tbody>
                        <tr>
                            <th scope="row">Rij 1</th>
                            {!Stoelen ? <td>Leeg</td> :
                                Array.from(Stoelen)
                                    .slice(0, 50)
                                    .map((currentValue, index) => {
                                        return (
                                            <td
                                                onClick={handleStoelClick}
                                                className="datacell p-3 h5"
                                                key={index}
                                                stoelid={currentValue.stoelid}
                                                rijid={currentValue.rijid}>
                                                Stoel {currentValue.stoelid}
                                            </td>)
                                    })
                            }
                        </tr>
                        <tr>
                            <th scope="row" >Rij 2</th>
                            {!Stoelen ? <td>Leeg</td> : Array.from(Stoelen).slice(50, 100)

                                .map((currentValue, index) => {
                                    return (
                                        <td
                                            onClick={handleStoelClick}
                                            className="datacell p-3 h5"
                                            key={index}
                                            stoelid={currentValue.stoelid}
                                            rijid={currentValue.rijid}>
                                            Stoel {currentValue.stoelid}
                                        </td>)
                                })

                            }
                        </tr>
                        <tr>
                            <th scope="row">Rij 3</th>
                            {!Stoelen ? <td>Leeg</td> : Array.from(Stoelen).slice(100, 150)
                                .map((currentValue, index) => {
                                    return (
                                        <td
                                            onClick={handleStoelClick}
                                            className="datacell p-3 h5"
                                            key={index}
                                            stoelid={currentValue.stoelid}
                                            rijid={currentValue.rijid}>
                                            Stoel {currentValue.stoelid}
                                        </td>)
                                })
                            }
                        </tr>
                        <tr>
                            <th scope="row">Rij 4</th>
                            {!Stoelen ? <td>Leeg</td> : Array.from(Stoelen).slice(150, 200)

                                .map((currentValue, index) => {
                                    return (
                                        <td
                                            onClick={handleStoelClick}
                                            className="datacell p-3 h5"
                                            key={index}
                                            stoelid={currentValue.stoelid}
                                            rijid={currentValue.rijid}>
                                            Stoel {currentValue.stoelid}
                                        </td>)
                                })
                            }
                        </tr>
                    </tbody>
                </table>
                <InfoTab optredenId={optredenId} gekozenStoelen={selectie} />
            </Container>
        </div>
    );
}