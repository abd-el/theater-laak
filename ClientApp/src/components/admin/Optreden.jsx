import React, { useState, useEffect, useCallback } from 'react';

export function Optreden(props) {

    const [error, setError] = useState(null);
    let content = 'nothing';

    //get states
    const [optredens, SetOptredens] = useState([]);

    //post states
    const [voorstellingId, setVoorstellingId] = useState('');
    const [zaalId, setZaalId] = useState('');
    const [prijs, setPrijs] = useState('');
    const [datum, setDatum] = useState('');
    const [beginTijd, setBTijd] = useState('');
    const [eindTijd, setETijd] = useState('');

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

    const getOptredens = useCallback(async function () {
        setError(null);
        try {
            const response = await fetch('https://localhost:44461/api/Programmering/Optredens', {
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

            SetOptredens(data);
        } catch (error) {
            setError(error.message);
        }
    }, []);

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
        getOptredens();
    }, [getOptredens]);

    function submitHandler(event) {
        event.preventDefault();
        setVoorstellingId('');
        setZaalId('');
        setPrijs('');
        setDatum('');
    }

    if (props.getEntry == 'GetOptredens' && optredens.length > 0) {
        content = optredens.map((list) => (
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
                    {list.artiestId == '' && list.artiestenGroepId}
                    {list.artiestenGroepId == '' && list.artiestId}
                </td>
                <td className='prijs'>
                    €{list.prijs}
                </td>
                <td className='datum'>
                    {list.datum.split('T')[0].substring(8, 10) + list.datum.split('T')[0].substring(4, 8) + list.datum.split('T')[0].substring(0, 4)}
                </td>
                <td className='tijdstip'>
                    {list.datum.split('T')[1].substring(0, 5)}
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
                                VoorstellingID
                            </th>
                            <th scope='col'>
                                ZaalID
                            </th>
                            <th scope='col'>
                                ArtiestID/GroepID
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