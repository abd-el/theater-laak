import React, { useState, useEffect, useCallback } from 'react';

export function InfoTab(props) {

    const [error, setError] = useState(null);
    const [optreden, setOptreden] = useState([]);
    const [voorstelling, setVoorstellingen] = useState([]);

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
            <img className='rounded' src={list.voorstelling[list.voorstellingId - 1].afbeelding} height='145' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label className='fs-4 fw-bold'>{list.voorstelling[list.voorstellingId - 1].titel}</label>
            <div>
                <br />
                <strong className='text-danger'>•</strong><strong>&nbsp;Zaal: {list.zaalId}</strong>
                <br />
                {/* <strong className='text-danger'>•</strong><strong>&nbsp;Datum: {list.datumTijdstip}</strong> */}
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