import React from 'react';

export function Voorstelling(props) {

    const weekdays = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
    const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];

    return (
        <tr key={props.array.volgordeId}>
            <td className="afbeelding"><img src={props.array.voorstelling[props.array.voorstellingId - 1].afbeelding}
                alt='voorstellingsafbeelding'
                width='150'
                height='200'
            />
            </td>
            <td className="titel">
                {props.array.voorstelling[props.array.voorstellingId - 1].titel}
            </td>
            <td className="dag-datum">
                {weekdays[new Date(props.array.datumTijdstip.split('T')[0]).getDay()]}
                <br />
                {new Date(props.array.datumTijdstip.split('T')[0]).getDate()}&nbsp;
                {months[new Date(props.array.datumTijdstip.split('T')[0]).getMonth()]}
            </td>
            <td className="tijdstip">
                <button id='tijdstipKnop'>{props.array.datumTijdstip.split('T')[1].substring(0, 5)}</button>
            </td>
        </tr>
    );
}