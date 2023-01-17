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

    return(
        <div>
            <br />
            <br />
            <br />
            <br />
            <label>Ticketverkoop</label>
            <InfoTab optredenId={optredenId}/>
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