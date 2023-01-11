import './Programmering.css';
import { SearchBars } from './SearchBars';
import { VoorstellingLijst } from './VoorstellingList';
import { Voorstelling } from './Voorstelling';
import React, { useState, useEffect, useCallback } from 'react';

export function Programmering() {

    const weekdays = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
    const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];

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

    const [enteredDatum, setDatum] = useState('');
    const [Voorstellingen, setV] = useState([]);
    const [Optredens, setO] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getVoorstellingen = useCallback(async function () {
        //event.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://localhost:44461/api/Programmering/Voorstellingen');

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
            const response = await fetch('https://localhost:44461/api/Programmering/Optredens');

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
    })

    let content = <tr><td>Geen voorstellingen ingepland voor de gekozen dag.</td></tr>;

    // laadt alle voorstellingen als de datum nog niet is gekozen
    // if (AangepasteArray.length > 0 && enteredDatum == '') {
    //     content = AangepasteArray.map((Optreden) => (
    //         <tr key={Optreden.volgordeId}>
    //             <td className="afbeelding"><img src={Optreden.voorstelling[Optreden.voorstellingId - 1].afbeelding}
    //                 alt='voorstellingsafbeelding'
    //                 width='150'
    //                 height='200'
    //             />
    //             </td>
    //             <td className="titel">
    //                 {Optreden.voorstelling[Optreden.voorstellingId - 1].titel}
    //             </td>
    //             <td className="dag-datum">
    //                 {weekdays[new Date(Optreden.datumTijdstip.split('T')[0]).getDay()]}
    //                 <br />
    //                 {new Date(Optreden.datumTijdstip.split('T')[0]).getDate()}&nbsp;
    //                 {months[new Date(Optreden.datumTijdstip.split('T')[0]).getMonth()]}
    //             </td>
    //             <td className="tijdstip">
    //                 <button id='tijdstipKnop'>{Optreden.datumTijdstip.split('T')[1].substring(0, 5)}</button>
    //             </td>
    //         </tr>
    //     ));
    // }


    // Filtert voorstellingen op gekozen dag in de datum picker
    for (let i = 0; i < AangepasteArray.length; i++) {
        if (AangepasteArray[i].datumTijdstip.split('T')[0] == enteredDatum) {
            content = AangepasteArray.filter(aa => aa.datumTijdstip.split('T')[0] == enteredDatum).map((Optreden) => (
                <tr key={Optreden.volgordeId}>
                    <td className="afbeelding"><img src={Optreden.voorstelling[Optreden.voorstellingId - 1].afbeelding}
                        alt='voorstellingsafbeelding'
                        width='150'
                        height='200'
                    />
                    </td>
                    <td className="titel">
                        {Optreden.voorstelling[Optreden.voorstellingId - 1].titel}
                    </td>
                    <td className="dag-datum">
                        {weekdays[new Date(Optreden.datumTijdstip.split('T')[0]).getDay()]}
                        <br />
                        {new Date(Optreden.datumTijdstip.split('T')[0]).getDate()}&nbsp;
                        {months[new Date(Optreden.datumTijdstip.split('T')[0]).getMonth()]}
                    </td>
                    <td className="tijdstip">
                        <button id='tijdstipKnop'>{Optreden.datumTijdstip.split('T')[1].substring(0, 5)}</button>
                    </td>
                </tr>
            ));
        }

    }
    // Filtert voorstellingen op getypte naam in de zoekbalk
    for (let i = 0; i < AangepasteArray.length; i++) {
        for (let j = 0; j < AangepasteArray[i].voorstelling.length; j++) {
            if (AangepasteArray[i].voorstelling[j].titel == enteredName) {
                content = AangepasteArray.filter(aa => aa.voorstelling[aa.voorstellingId -1].titel == enteredName).map((Optreden) => (
                    <Voorstelling array={Optreden} />
                ));
            }



        }
    }

    for (let i = 0; i < AangepasteArray.length; i++) {
        for (let j = 0; j < AangepasteArray[i].voorstelling.length; j++) {
            if (AangepasteArray[i].voorstelling[j].titel == enteredName && AangepasteArray[i].datumTijdstip.split('T')[0] == enteredDatum) {
                let filteredArray = AangepasteArray.filter(aa => aa.voorstelling[aa.voorstellingId -1].titel == enteredName);
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
    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className='inputs'>
                <input id='searchbar' placeholder='zoek voorstelling' />
                <input id='date' type='date' min={today} value={enteredDatum} onChange={changeDatumHandler} />
            </div>
            <br />
            <div className='buttons'>
                <button id='today'>Vandaag</button>
                <button id='tomorrow'>Morgen</button>
                <button id='dag1'>Deze Week</button>
                <button id='refresh' onClick={update}>Voorstellingen Ophalen</button>
            </div>
            <br />
            <br />
            <br />
            <div>
                <table className="table table-bordered table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope='col'>
                                Afbeelding
                            </th>
                            <th scope='col'>
                                Titel
                            </th>
                            <th scope='col'>
                                Dag/Datum
                            </th>
                            <th scope='col'>
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

