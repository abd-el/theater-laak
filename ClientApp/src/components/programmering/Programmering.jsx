import './Programmering.css';
import { Voorstelling } from './Voorstelling';
import React, { useState, useEffect, useCallback } from 'react';

export function Programmering() {

    //vandaag zonder functie
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    today = yyyy + '-' + mm + '-' + dd;

    //morgen zonder functie
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let dd1 = tomorrow.getDate();
    let mm1 = tomorrow.getMonth() + 1;
    let yyyy1 = tomorrow.getFullYear();
    if (dd1 < 10) {
        dd1 = '0' + dd1;
    }

    if (mm1 < 10) {
        mm1 = '0' + mm1;
    }

    tomorrow = yyyy1 + '-' + mm1 + '-' + dd1;

    //overmorgen zonder functie
    let overmorgen = new Date();
    overmorgen.setDate(overmorgen.getDate() + 2);
    let dd2 = overmorgen.getDate();
    let mm2 = overmorgen.getMonth() + 1;
    let yyyy2 = overmorgen.getFullYear();
    if (dd2 < 10) {
        dd2 = '0' + dd2;
    }

    if (mm2 < 10) {
        mm2 = '0' + mm2;
    }

    overmorgen = yyyy2 + '-' + mm2 + '-' + dd2;

    const [enteredName, setName] = useState('');
    const [enteredDatum, setDatum] = useState(new Date().toISOString().split('T')[0]);
    const [Voorstellingen, setV] = useState([]);
    const [Optredens, setO] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getVoorstellingen = useCallback(async function () {
        //event.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/Programmering/Voorstellingen');

            if (!response.ok) {
                throw new Error('Er is iets fout gegaan!');
            }

            const data = await response.json();

            setV(data);
            //console.log(data);

        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }, []);

    const getOptredens = useCallback(async function () {
        //event.preventDefault();
        //setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/Programmering/BevestigdeOptredens');

            if (!response.ok) {
                throw new Error('Er is iets fout gegaan!');
            }

            const data = await response.json();

            setO(data);
            //console.log(data);
        } catch (error) {
            setError(error.message);
        }
        //setIsLoading(false);
    }, []);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.get('titel') != null) {
            setName(query.get('titel'));
            setDatum(query.get('date'));
        }
        getOptredens();
        getVoorstellingen();
    }, [getVoorstellingen, getOptredens]);

    function update() //haalt alle optredens en voorstellingen op
    {
        getOptredens();
        getVoorstellingen();
    }

    function changeDatumHandler(event) {
        setDatum(event.target.value);
    }

    function changeNameHandler(event) {
        setName(event.target.value);
    }

    let AangepasteArray = Optredens.map(item => {
        return {
            ...item,
            voorstelling: Voorstellingen
        }
    });

    AangepasteArray = AangepasteArray.sort((a, b) => {
        a = new Date(a.datumTijdstip);
        b = new Date(b.datumTijdstip);
        return a - b;
    });

    let volgordeOptredenId = 0;
    AangepasteArray.forEach(item => {
        item.volgordeId = volgordeOptredenId;
        volgordeOptredenId = volgordeOptredenId + 1;
    }
    );

    let content = <tr><td>Geen voorstellingen ingepland voor de door u gekozen dag.</td></tr>;

    function Vandaag() {
        setDatum(today);
    }

    function Morgen() {
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        let dd = tomorrow.getDate();
        let mm = tomorrow.getMonth() + 1;
        let yyyy = tomorrow.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        tomorrow = yyyy + '-' + mm + '-' + dd;
        setDatum(tomorrow);
    }

    function Overmorgen() {
        let overmorgen = new Date();
        overmorgen.setDate(overmorgen.getDate() + 2);
        let dd = overmorgen.getDate();
        let mm = overmorgen.getMonth() + 1;
        let yyyy = overmorgen.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        overmorgen = yyyy + '-' + mm + '-' + dd;
        setDatum(overmorgen);
    }

    // Filtert voorstellingen op gekozen dag in de datum picker
    for (let i = 0; i < AangepasteArray.length; i++) {
        if (AangepasteArray[i].datumTijdstip.split('T')[0] == enteredDatum && enteredName == '') {
            content = AangepasteArray.filter(aa => aa.datumTijdstip.split('T')[0] == enteredDatum).map((Optreden) => (
                <Voorstelling array={Optreden} />
            ));
        }
    }
    // Filtert voorstellingen op getypte naam in de zoekbalk
    for (let i = 0; i < AangepasteArray.length; i++) {
        for (let j = 0; j < AangepasteArray[i].voorstelling.length; j++) {
            if (AangepasteArray[i].voorstelling[j].titel == enteredName && enteredDatum == '') {
                content = AangepasteArray.filter(aa => aa.voorstelling[aa.voorstellingId - 1].titel == enteredName).map((Optreden) => (
                    <Voorstelling array={Optreden} />
                ));
            }
        }
    }
    // Filtert voorstellingen op getypte naam en gekozen datum
    for (let i = 0; i < AangepasteArray.length; i++) {
        for (let j = 0; j < AangepasteArray[i].voorstelling.length; j++) {
            if (AangepasteArray[i].voorstelling[j].titel == enteredName && AangepasteArray[i].datumTijdstip.split('T')[0] == enteredDatum) {
                let filteredArray = AangepasteArray.filter(aa => aa.voorstelling[aa.voorstellingId - 1].titel == enteredName);
                content = filteredArray.filter(fa => fa.datumTijdstip.split('T')[0] == enteredDatum).map((Optreden) => (
                    <Voorstelling array={Optreden} />
                ));
            }
        }
    }

    if (error) {
        content = <tr><td>{error}</td></tr>;
    }

    if (isLoading) {
        content = <tr><td>Loading...</td></tr>;
    }

    console.log(AangepasteArray);
    //console.log(enteredName);

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className='inputs'>
                <input id='searchbar' className='mb-2 btn btn-dark' placeholder='Voorstelling zoeken' value={enteredName} onChange={changeNameHandler} /> &nbsp;&nbsp;&nbsp;&nbsp;
                <input className='mb-2 btn btn-dark' type='date' min={today} value={enteredDatum} onChange={changeDatumHandler} />
            </div>
            <br />
            {enteredDatum == today &&
                <div className='buttons'>
                    <button className="btn btn-danger" id='today' onClick={Vandaag}>Vandaag</button>&nbsp;
                    <button className="btn btn-dark" id='tomorrow' onClick={Morgen}>Morgen</button>&nbsp;
                    <button className="btn btn-dark" id='dag1' onClick={Overmorgen}>Overmorgen</button>&nbsp;
                </div>
            }
            {enteredDatum == tomorrow &&
                <div className='buttons'>
                    <button className="btn btn-dark" id='today' onClick={Vandaag}>Vandaag</button>&nbsp;
                    <button className="btn btn-danger" id='tomorrow' onClick={Morgen}>Morgen</button>&nbsp;
                    <button className="btn btn-dark" id='dag1' onClick={Overmorgen}>Overmorgen</button>&nbsp;
                </div>
            }
            {enteredDatum == overmorgen &&
                <div className='buttons'>
                    <button className="btn btn-dark" id='today' onClick={Vandaag}>Vandaag</button>&nbsp;
                    <button className="btn btn-dark" id='tomorrow' onClick={Morgen}>Morgen</button>&nbsp;
                    <button className="btn btn-danger" id='dag1' onClick={Overmorgen}>Overmorgen</button>&nbsp;
                </div>
            }
            {enteredDatum == '' &&
                <div className='buttons'>
                    <button className="btn btn-dark" id='today' onClick={Vandaag}>Vandaag</button>&nbsp;
                    <button className="btn btn-dark" id='tomorrow' onClick={Morgen}>Morgen</button>&nbsp;
                    <button className="btn btn-dark" id='dag1' onClick={Overmorgen}>Overmorgen</button>&nbsp;
                </div>
            }
            <br />
            <br />

            <div>
                <table className="table table-bordered table-striped table-dark" style={{  verticalAlign: "middle"} }>
                    <thead>
                        <tr>
                            <th scope='col' className='w-25'>
                                Afbeelding
                            </th>
                            <th scope='col' className='w-25'>
                                Titel
                            </th>
                            <th scope='col' className='w-25'>
                                Dag/Datum
                            </th>
                            <th scope='col'className='w-0'>
                                Zaal
                            </th>
                            <th scope='col' className='w-25'>
                                Tijdstip
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {content}
                    </tbody>
                </table>
            </div>
        </div>
    );
}