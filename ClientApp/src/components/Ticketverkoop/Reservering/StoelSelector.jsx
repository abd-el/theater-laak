import React from "react";
import { useState } from "react";
import { Figure } from "./Figure";
import { Container } from "reactstrap";
import { InfoTab } from "../InfoTab";

export function StoelSelector({ Stoelen, rangId, optredenId }) {

    const [selectie, setSelectie] = useState([]);

    const handleStoelClick = (e) => {
        const attr = e.target.attributes;
        const obj = {
            stoelId: attr.stoelid.value,
            zaalId: 0,
            rang: rangId,
            rij: attr.rijid.value
        }
        if (!selectie) {
            setSelectie([obj]);
        }
        else if (selectie.length == 5) {
            console.log("max aantal stoelen bereikt");
            return
        }
        else {
            setSelectie([...selectie, obj]);
        }
    }

    return (
        <Container fluid={true} className='col-md-10 position-relative'>
            <Figure />
            <table className="stoeltabel table table-responsive d-flex table-hover table-bordered table-dark bg-dark position-relative">
                <tbody>
                    <tr>
                        <th scope="row">Rij 1</th>
                        {!Stoelen ? <td>Leeg</td> :
                            Array.from(Stoelen)
                                .map((currentValue, index) => {
                                    if (currentValue.rij == 1) {
                                        return (
                                            <td
                                                onClick={handleStoelClick}
                                                className="datacell p-3 h5"
                                                key={index}
                                                stoelid={currentValue.stoelId}
                                                rijid={currentValue.rij}>
                                                Stoel {currentValue.stoelId}
                                            </td>)
                                    }

                                })
                        }
                    </tr>
                    <tr>
                        <th scope="row" >Rij 2</th>
                        {!Stoelen ? <td>Leeg</td> :
                            Array.from(Stoelen)
                                .map((currentValue, index) => {
                                    if (currentValue.rij == 2) {
                                        return (
                                            <td
                                                onClick={handleStoelClick}
                                                className="datacell p-3 h5"
                                                key={index}
                                                stoelid={currentValue.stoelId}
                                                rijid={currentValue.rij}>
                                                Stoel {currentValue.stoelId}
                                            </td>)
                                    }

                                })
                        }
                    </tr>
                    <tr>
                        <th scope="row">Rij 3</th>
                        {!Stoelen ? <td>Leeg</td> :
                            Array.from(Stoelen)
                                .map((currentValue, index) => {
                                    if (currentValue.rij == 3) {
                                        return (
                                            <td
                                                onClick={handleStoelClick}
                                                className="datacell p-3 h5"
                                                key={index}
                                                stoelid={currentValue.stoelId}
                                                rijid={currentValue.rij}>
                                                Stoel {currentValue.stoelId}
                                            </td>)
                                    }

                                })
                        }
                    </tr>
                    <tr>
                        <th scope="row">Rij 4</th>
                        {!Stoelen ? <td>Leeg</td> :
                            Array.from(Stoelen)
                                .map((currentValue, index) => {
                                    if (currentValue.rij == 4) {
                                        return (
                                            <td
                                                onClick={handleStoelClick}
                                                className="datacell p-3 h5"
                                                key={index}
                                                stoelid={currentValue.stoelId}
                                                rijid={currentValue.rij}>
                                                Stoel {currentValue.stoelId}
                                            </td>)
                                    }

                                })
                        }
                    </tr>
                </tbody>
            </table>
            <InfoTab optredenId={optredenId} gekozenStoelen={selectie} />
        </Container>
    );


}