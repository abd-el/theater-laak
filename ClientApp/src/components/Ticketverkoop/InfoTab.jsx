import React, { useState, useEffect, useCallback } from 'react';
export function InfoTab(props) {

    const [error, setError] = useState(null);
    const [optreden, setOptreden] = useState([]);
    const [voorstelling, setVoorstellingen] = useState([]);

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

    const getOptredens = useCallback(async function () {
        setError(null);
        try {
            const response = await fetch('/api/Programmering/BevestigdeOptredens', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authState')).token
                },
                //body: JSON.stringify({ optredenId: props.optredenId})
            });

            if (!response.ok) {
                throw new Error('Er is iets fout gegaan!');
            }

            const data = await response.json();
            setOptreden(data);
        } catch (error) {
            setError(error.message);
        }
    }, []);

    const getVoorstellingen = useCallback(async function () {
        setError(null);
        try {
            const response = await fetch('/api/Programmering/Voorstellingen', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authState')).token
                },
                //body: JSON.stringify({ optredenId: props.optredenId})
            });

            if (!response.ok) {
                throw new Error('Er is iets fout gegaan!');
            }

            const data = await response.json();
            setVoorstellingen(data);
        } catch (error) {
            setError(error.message);
        }
    }, []);

    useEffect(() => {
        getVoorstellingen();
        getOptredens();
    }, [getOptredens, getVoorstellingen]);

    let aangepasteArray = optreden.filter(o => o.optredenId == props.optredenId).map((items) => {
        return {
            ...items,
            voorstelling: voorstelling
        };
    });

    content = aangepasteArray.map((list) => (
        <div className="square bg-dark rounded position-relative start-50 translate-middle w-25 p-3">
            <img className='rounded' src={list.voorstelling[list.voorstellingId - 1].afbeelding} height='145' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label className='fs-4 fw-bold'>{list.voorstelling[list.voorstellingId - 1].titel}</label>
            <div>
                <br />
                <strong className='text-danger'>•</strong><strong>&nbsp;Zaal: </strong><text>{list.zaalId}</text>
                <br />
                <strong className='text-danger'>•</strong><strong>&nbsp;Datum: </strong><text>{weekdays[new Date(list.datumTijdstip.split('T')[0]).getDay()] + ' ' + new Date(list.datumTijdstip.split('T')[0]).getDate() + ' ' + months[new Date(list.datumTijdstip.split('T')[0]).getMonth()]}</text>
                <br />
                <strong className='text-danger'>•</strong><strong>&nbsp;Tijdstip: </strong><text>{list.datumTijdstip.split('T')[1].substring(0, 5) + ' tot ' + einde(list.datumTijdstip, list.voorstelling[list.voorstellingId - 1].tijdsduurInMinuten).split('T')[1].substring(0, 5)}</text>
            </div>
        </div>
    ))
    console.log(aangepasteArray);

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
            {content}
        </div>
    );
}