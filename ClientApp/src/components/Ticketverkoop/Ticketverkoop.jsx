import { InfoTab } from "./InfoTab";
import React, { useState, useEffect, useCallback } from 'react';
export function Ticketverkoop() {

    const [optredenId, setOptredenId] = useState('');
    const [stoelen, setStoelen] = useState([]);
    const [click, setClick] = useState(false);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.get('optredenId') != null) {
            setOptredenId(query.get('optredenId'));
        }
    },);

    function clickButton() {
        if (!click) {
            setClick(true);
            setStoelen([{
                stoelId: 1,
                zaalId: 1,
                rang: 1,
                rij: 1
            },
            {
                stoelId: 2,
                zaalId: 1,
                rang: 2,
                rij: 2
            }
            ]);
        }
        else {
            setClick(false);
            setStoelen([]);
        }
    }

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <label>Ticketverkoop</label>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div >
                <img
                    className="rounded position-absolute top-50 start-50 translate-middle p-5 "
                    src="https://thumbs.dreamstime.com/z/movie-seats-booking-interface-template-ticket-purchase-154897159.jpg"
                    height="900"
                    width="900"
                >
                </img>
                <button onClick={clickButton}>R1 S1 (stoel testknop)</button>
                <br />
                <br />
            </div>
            <InfoTab optredenId={optredenId} gekozenStoelen={stoelen} />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    );
}