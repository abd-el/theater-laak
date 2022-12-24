import React from 'react';

export function Voorstelling(props) {
    <li className={props.classes}>
        <h2>{props.titel}</h2>
        <h3>{props.beschrijving}</h3>
        <p>{props.TijdsduurInMinuten}</p>
    </li>
}