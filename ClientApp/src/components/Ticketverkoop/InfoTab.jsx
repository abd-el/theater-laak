import React, { useState, useEffect, useCallback } from 'react';
export function InfoTab(props) {

    const [error, setError] = useState(null);
    const [optreden, setOptreden] = useState([]);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    //const [voorstelling, setVoorstellingen] = useState([]);

    const weekdays = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'];
    const months = ['jan.', 'feb.', 'maart', 'april', 'mei', 'juni', 'juli', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.'];

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

    let content = 'test';

    useEffect(() => {
        setIsLoading(true);
        fetch(`/api/optreden/GetOptreden?optredenId=${props.optredenId}`)
            .then(response => response.json())
            .then(data => {
                setData(data);
                setIsLoading(false);
                console.log(data);
                setOptreden(data);

            });
    }, [props.optredenId]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (optreden.voorstelling == undefined) {
        return <p>Geen data ontvangen.</p>;
    }

    return (
        <div>
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
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="square bg-dark rounded position-relative start-50 translate-middle w-25 p-3">
                <img className='rounded shadow-4 float-sm-start' src={optreden.voorstelling.afbeelding} height='135' />
                &nbsp;&nbsp;&nbsp;<label className='fs-4 fw-bold'>{optreden.voorstelling.titel}</label>
                <div>
                    <br />
                    &nbsp;&nbsp;<strong className='text-danger'>•</strong><strong>&nbsp;Zaal: </strong><text>{optreden.zaalId}</text>
                    <br />
                    &nbsp;&nbsp;<strong className='text-danger'>•</strong><strong>&nbsp;Datum: </strong><text>{weekdays[new Date(optreden.datumTijdstip.split('T')[0]).getDay()] + ' ' + new Date(optreden.datumTijdstip.split('T')[0]).getDate() + ' ' + months[new Date(optreden.datumTijdstip.split('T')[0]).getMonth()]}</text>
                    <br />
                    &nbsp;&nbsp;<strong className='text-danger'>•</strong><strong>&nbsp;Tijdstip: </strong><text>{optreden.datumTijdstip.split('T')[1].substring(0, 5) + ' tot ' + einde(optreden.datumTijdstip, optreden.voorstelling.tijdsduurInMinuten).split('T')[1].substring(0, 5)}</text>
                    <br />              
                </div>
            </div>
        </div>
    );
}