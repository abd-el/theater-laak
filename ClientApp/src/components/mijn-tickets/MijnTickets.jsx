import React, { useState, useEffect, useCallback, useRef } from 'react';

export function MijnTickets() {

    const [isLoading, setIsLoading] = useState(false);
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetch(`/api/TicketVerkoop/GetEigenTickets`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authState')).token
            }
        })
            .then(response => response.json())
            .then(data => {
                setIsLoading(false);
                console.log(data.data);
                setTickets(data.data);
            });
    }, []);

    let today = new Date();
    let min = today.getMinutes();
    let hours = today.getHours();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    if (hours < 10) {
        hours = '0' + hours;
    }

    if (min < 10) {
        min = '0' + min;
    }

    today = yyyy + '-' + mm + '-' + dd + 'T' + hours + ':' + min;

    let content = '';

    if (tickets.length == 0) {
        return (
            <div>
                <div className='text-white display-6 mb-4 d-block'>
                    Mijn Tickets
                </div>
                <label>U heeft nog geen tickets.</label>
            </div>
        );
    }

    for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].betaald == true && tickets[i].optreden.datumTijdstip > today) {
            content = tickets.map((list, index) => (

                <tr key={index}>
                    <td className="voorstelling">
                        {list.optreden.voorstelling.titel}
                        <br />
                        <img className='rounded shadow' src={list.optreden.voorstelling.afbeelding} width={100}></img>
                    </td>
                    <td className="zaal">
                        {list.optreden.zaalId}
                    </td>
                    <td className="tijd">
                        {new Date(list.optreden.datumTijdstip).toDateString()}
                        <br />
                        {new Date(list.optreden.datumTijdstip).toTimeString().substring(0, 5)}
                    </td>
                    <td className="stoel">
                        {'Rij ' + list.stoel.rij + ' ' + 'Stoel ' + list.stoel.stoelId}
                    </td>
                </tr>
            ));
        }
    }

    return (
        <div>
            <div className='text-white display-6 mb-4 d-block'>
                Mijn Tickets
            </div>
            <table className="table table-bordered table-striped table-dark" style={{  verticalAlign: "middle"} }>
                <thead>
                    <tr>
                        <th scope='col'>
                            Voorstelling
                        </th>
                        <th scope='col'>
                            Zaal
                        </th>
                        <th scope='col'>
                            Datum en Tijdstip
                        </th>
                        <th scope='col'>
                            Stoel
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {content}
                </tbody>
            </table>
        </div>
    );
}