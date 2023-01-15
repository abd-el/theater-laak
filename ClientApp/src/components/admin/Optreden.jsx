import React, { useState, useEffect, useCallback } from 'react';
import { AdminPanel } from './AdminPanel';

export function Optreden(props) {

    const [error, setError] = useState(null);
    let content = 'Er zijn geen Optredens beschikbaar.';

    //get states
    const [bevestigdeOptredens, setBevestigdeOptredens] = useState([]);
    const [nietBevestigdeOptredens, setNietBevestigdeOptredens] = useState([]);

    //post states
    const [voorstellingId, setVoorstellingId] = useState('');
    const [zaalId, setZaalId] = useState('');
    const [prijs, setPrijs] = useState('');
    const [datum, setDatum] = useState('');
    const [beginTijd, setBTijd] = useState('');
    const [eindTijd, setETijd] = useState('');
    const [getId, setId] = useState(0);
    const [getText, setText] = useState('');

    //input handlers
    function voorstellingHandler(e) {
        setVoorstellingId(e.target.value);
    }

    function zaalHandler(e) {
        setZaalId(e.target.value);
    }

    function prijsHandler(e) {
        setPrijs(e.target.value);
    }

    function datumHandler(e) {
        setDatum(e.target.value);
    }

    function beginTijdHandler(e) {
        setBTijd(e.target.value);
    }

    function eindTijdHandler(e) {
        setETijd(e.target.value);
    }

    const getBevestigdeOptredens = useCallback(async function () {
        setError(null);
        try {
            const response = await fetch('/api/Programmering/BevestigdeOptredens', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authState')).token
                }
            });

            if (!response.ok) {
                throw new Error('Er is iets fout gegaan!');
            }

            const data = await response.json();

            setBevestigdeOptredens(data);
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    }, []);

    const getNietBevestigdeOptredens = useCallback(async function () {
        setError(null);
        try {
            const response = await fetch('/api/Programmering/NietBevestigdeOptredens', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authState')).token
                }
            });

            if (!response.ok) {
                throw new Error('Er is iets fout gegaan!');
            }

            const data = await response.json();

            setNietBevestigdeOptredens(data);
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    }, []);

    async function bevestigBoeking() {
        // let optreden = {
        //     Prijs: 15,
        //     DatumTijdstip: "2023-01-15T17:45:00.968Z",
        //     ArtiestenGroepId: 2,
        //     ArtiestId: "9e278cc1-cbc3-483f-a72a-1be56327219a",
        //     VoorstellingId: 8,
        //     BegunstigersExclusief: false,
        //     Tickets: [],
        //     Bevestigd: true,
        //     ZaalId: 1
        // };

        fetch('/api/Programmering/BevestigOptreden?id=' + getId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authState')).token
            },
            body: JSON.stringify({
                id: getId
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            });
        setText('Optreden met id: ' + getId + ' is bevestigd!');
    }

    async function verwijderBoeking() {

        fetch('/api/Programmering/Optreden?OptredenId=' + getId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authState')).token
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            });
        setText('Optreden met id: ' + getId + ' is verwijderd!');
    }

    async function voegOptredens() {
        let optreden = {
            //prijs: prijs, //moet toegevoegd worden
            datum: datum,
            tijdstip: beginTijd,
            eindTijdstip: eindTijd,
            voorstellingId: voorstellingId,
            groep: 1,
            zaalId: zaalId,
            //begunstigersExclusief: false,
            //bevestigd: true
        };

        fetch('https://localhost:44461/api/artiestenportaal/MaakBoeking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authState')).token
            },
            body: JSON.stringify(optreden)
        });
        console.log(optreden)
    }

    useEffect(() => {
        getBevestigdeOptredens();
        getNietBevestigdeOptredens();
    }, [getNietBevestigdeOptredens, getBevestigdeOptredens]);

    function update() {
        getBevestigdeOptredens();
        getNietBevestigdeOptredens();
    }

    function submitHandler(event) {
        event.preventDefault();
        setVoorstellingId('');
        setZaalId('');
        setPrijs('');
        setDatum('');
    }

    if(props.update == 'update'){
        return(<button onClick={update}>Update</button>);
    }

    if (props.getEntry == 'GetOptredens' && bevestigdeOptredens.length > 0) {
        content = bevestigdeOptredens.map((list) => (
            <tr>
                <td className="Id">
                    {list.optredenId}
                </td>
                <td className="voorstelling">
                    {list.voorstellingId}
                </td>
                <td className="zaal">
                    {list.zaalId}
                </td>
                <td className='artiestOfGroep'>
                    {list.artiestenGroepId != null && list.artiestenGroepId}
                    {list.artiestenGroepId == null && list.artiestId}
                    {list.artiestenGroepId == null && list.artiestId == null && 'onbekend'}
                </td>
                <td className='prijs'>
                    €{list.prijs}
                </td>
                <td className='datum'>
                    {list.datumTijdstip.split('T')[0].substring(8, 10) + list.datumTijdstip.split('T')[0].substring(4, 8) + list.datumTijdstip.split('T')[0].substring(0, 4)}
                </td>
                <td className='tijdstip'>
                    {list.datumTijdstip.split('T')[1].substring(0, 5)}
                </td>
            </tr>
        ));
    }

    if (props.getEntry == 'GetOptredens') {
        return (
            <div>
                <table className="table table-bordered table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope='col'>
                                ID
                            </th>
                            <th scope='col'>
                                Voorstelling ID
                            </th>
                            <th scope='col'>
                                Zaal ID
                            </th>
                            <th scope='col'>
                                Artiest ID / Groep ID
                            </th>
                            <th scope='col'>
                                Prijs
                            </th>
                            <th scope='col'>
                                Datum
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
        );
    }

    if (props.getEntry == 'GetNBOptredens' && nietBevestigdeOptredens.length > 0) {
        content = nietBevestigdeOptredens.map((list) => (
            <tr>
                <td className="Id" onClick={() => setId(list.optredenId)}>
                    {list.optredenId}
                </td>
                <td className="voorstelling" onClick={() => setId(list.optredenId)}>
                    {list.voorstellingId}
                </td>
                <td className="zaal" onClick={() => setId(list.optredenId)}>
                    {list.zaalId}
                </td>
                <td className='artiestOfGroep' onClick={() => setId(list.optredenId)}>
                    {list.artiestenGroepId != null && list.artiestenGroepId}
                    {list.artiestenGroepId == null && list.artiestId}
                    {list.artiestenGroepId == null && list.artiestId == null && 'onbekend'}
                </td>
                <td className='prijs' onClick={() => setId(list.optredenId)}>
                    €{list.prijs}
                </td>
                <td className='datum' onClick={() => setId(list.optredenId)}>
                    {list.datumTijdstip.split('T')[0].substring(8, 10) + list.datumTijdstip.split('T')[0].substring(4, 8) + list.datumTijdstip.split('T')[0].substring(0, 4)}
                </td>
                <td className='tijdstip' onClick={() => setId(list.optredenId)}>
                    {list.datumTijdstip.split('T')[1].substring(0, 5)}
                </td>
                {getId != list.optredenId &&
                    <td onClick={() => setId(list.optredenId)}>
                        <button onClick={bevestigBoeking} disabled>Bevestigen</button>
                        <button onClick={verwijderBoeking} disabled>Verwijderen</button>
                    </td>
                }
                {getId == list.optredenId &&
                    <td onClick={() => setId(list.optredenId)}>
                        <button onClick={bevestigBoeking} >Bevestigen</button>
                        <button onClick={verwijderBoeking} >Verwijderen</button>
                    </td>
                }
            </tr>
        ));
    }
    console.log(getId);
    if (props.getEntry == 'GetNBOptredens') {
        return (
            <div>
                <table className="table table-bordered table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope='col'>
                                ID
                            </th>
                            <th scope='col'>
                                Voorstelling ID
                            </th>
                            <th scope='col'>
                                Zaal ID
                            </th>
                            <th scope='col'>
                                Artiest ID / Groep ID
                            </th>
                            <th scope='col'>
                                Prijs
                            </th>
                            <th scope='col'>
                                Datum
                            </th>
                            <th scope='col'>
                                Tijdstip
                            </th>
                            <th scope='col'>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {content}
                    </tbody>
                </table>
                <label>{getText}</label>
            </div>
        );
    }

    if (props.postEntry == "PostOptreden") {
        return (
            <div>
                <form onSubmit={submitHandler}>
                    <br />
                    <label>Optreden toevoegen</label>
                    <br />
                    <br />
                    <input placeholder='VoorstellingId' value={voorstellingId} onChange={voorstellingHandler} required />
                    <br />
                    <br />
                    <input placeholder='ZaalId' value={zaalId} onChange={zaalHandler} required />
                    <br />
                    <br />
                    <input placeholder='Prijs' value={prijs} onChange={prijsHandler} required />
                    <br />
                    <br />
                    <input placeholder='Datum' type='date' value={datum} onChange={datumHandler} required />
                    <br />
                    <br />
                    <input placeholder='Begin' type='time' value={beginTijd} onChange={beginTijdHandler} required /> <input placeholder='Eind' type='time' value={eindTijd} onChange={eindTijdHandler} required />
                    <br />
                    <br />
                    {/* <label>Begunstigers Exclusief</label>&nbsp; */}
                    {/* <input placeholder='Begunstigers Exclusief' type='checkbox' value={afbeelding} onChange={afbeeldingHandler} required /> */}
                    {/* <br />
                    <br /> */}
                    <button onClick={voegOptredens}>Aanmaken</button>
                </form>
            </div>
        );
    }
}