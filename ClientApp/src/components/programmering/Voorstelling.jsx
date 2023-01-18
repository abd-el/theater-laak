import React from 'react';

export function Voorstelling(props) {

    const weekdays = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
    const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];

    function einde(tijdStip, minuten) {
        let date = new Date(tijdStip);
        let temp = date.getTime() + minuten * 60000;
        date = new Date(temp);
        let min = date.getMinutes();
        let hours = date.getHours();
        let dd = date.getDate();
        let mm = date.getMonth() + 1;
        let yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        if (min < 10) {
            min = '0' + min;
        }

        date = yyyy + '-' + mm + '-' + dd + 'T' + hours + ':' + min;
        return date;
    }

    return (
        <tr key={props.array.volgordeId}>
            <td className="afbeelding"><img className='rounded shadow' src={props.array.voorstelling[props.array.voorstellingId - 1].afbeelding}
                alt='voorstellingsafbeelding'
                width='150'
                height='200'
            />
            </td>
            <td className="titel fw-bold" style={{ } }>
                {props.array.voorstelling[props.array.voorstellingId - 1].titel}
            </td>
            <td className="dag-datum fs-6 ">
                {weekdays[new Date(props.array.datumTijdstip.split('T')[0]).getDay()]}
                <br />
                {new Date(props.array.datumTijdstip.split('T')[0]).getDate()}&nbsp;
                {months[new Date(props.array.datumTijdstip.split('T')[0]).getMonth()]}
            </td>
            <td className='zaalId fs-6 fw-bold'>
                {props.array.zaalId}
            </td>
            <td className="tijdstip">
                {new Date() > new Date(props.array.datumTijdstip) && <button className="btn btn-dark fs-6" title='Ticketverkoop is gesloten' disabled>
                    Ticketverkoop gesloten
                </button>}
                {new Date() < new Date(props.array.datumTijdstip) && <a href={`/ticketverkoop?optredenId=${props.array.optredenId}`} className="btn btn-danger fs-6 fw-bold shadow" title='Tickets'>
                    {props.array.datumTijdstip.split('T')[1].substring(0, 5)} - {einde(props.array.datumTijdstip, props.array.voorstelling[props.array.voorstellingId - 1].tijdsduurInMinuten).split('T')[1].substring(0, 5)}
                    <hr class="hr" style={{ backgroundColor: "black", margin: "0rem", height: "2px"}} /></a>}
            </td>
        </tr>
    );
}