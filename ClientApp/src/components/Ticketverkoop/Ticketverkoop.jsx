import { InfoTab } from "./InfoTab";
import React, { useState, useEffect, useCallback } from 'react';
import { Reservering } from "./Reservering/Reservering";
export function Ticketverkoop() {

    const [optredenId, setOptredenId] = useState('');
    const [stoelen, setStoelen] = useState([]);
    const [click, setClick] = useState(false);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.get('optredenId') != null) {
            setOptredenId(query.get('optredenId'));
        }
    });

    function clickButton() {
        if (!click) {
            setClick(true);
            setStoelen([{
                stoelId: 1,
                zaalId: 3,
                rang: 1,
                rij: 1
            },
            {
                stoelId: 2,
                zaalId: 3,
                rang: 2,
                rij: 1
            },
            {
                stoelId: 3,
                zaalId: 3,
                rang: 3,
                rij: 1
            },
            ]);
        }
        else {
            setClick(false);
            setStoelen([]);
        }
    }

    return (
        <div>
            <Reservering optredenId={optredenId}/>
        </div>
    );
}