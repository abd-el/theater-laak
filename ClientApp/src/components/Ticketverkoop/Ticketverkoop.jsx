import { InfoTab } from "./InfoTab";
import React, { useState, useEffect, useCallback } from 'react';
export function Ticketverkoop() {

    const [optredenId, setOptredenId] = useState('');

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.get('optredenId') != null) {
            setOptredenId(query.get('optredenId'));
        }
    },);

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
            </div>
            <InfoTab optredenId={optredenId} />
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