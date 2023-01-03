import React from 'react';

export function Voorstelling(props) {

    return(
    <li>
        <h2>{props.titel}</h2>
        <h3>{props.beschrijving}</h3>
        <p>{props.tijdsduurInMinuten}</p>
    </li>
    );
}