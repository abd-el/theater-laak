import React, { useState, useEffect, useCallback } from 'react';

export function Voorstelling(props) {

    const [error, setError] = useState(null);
    let content = 'nothing';

    //get states
    const [voorstellingen, SetVoorstellingen] = useState([]);

    //post states
    const [titel, setTitel] = useState('');
    const [beschrijving, setBeschrijving] = useState('');
    const [tijdsduur, setTijdsDuur] = useState('');
    const [afbeelding, setAfbeelding] = useState('');

    //input handlers
    function titelHandler(e) {
        setTitel(e.target.value);
    }

    function beschrijvingHandler(e) {
        setBeschrijving(e.target.value);
    }

    function tijdsduurHandler(e) {
        setTijdsDuur(e.target.value);
    }

    function afbeeldingHandler(e) {
        setAfbeelding(e.target.value);
    }

    const getVoorstellingen = useCallback(async function () {
        setError(null);
        try {
            const response = await fetch('https://localhost:44461/api/Programmering/Voorstellingen', {
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

            SetVoorstellingen(data);
        } catch (error) {
            setError(error.message);
        }
    }, []);

    async function voegVoorstelling() {
        let voorstelling = {
            titel: titel,
            beschrijving: beschrijving,
            tijdsduurInMinuten: tijdsduur,
            afbeelding: afbeelding,
            optredens: []
        };

        fetch('https://localhost:44461/api/Programmering/Voorstelling', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authState')).token
            },
            body: JSON.stringify(voorstelling)
        });
        console.log(voorstelling)
    }

    useEffect(() => {
        getVoorstellingen();
    }, [getVoorstellingen]);

    function submitHandler(event) {
        event.preventDefault();
        setTitel('');
        setBeschrijving('');
        setTijdsDuur('');
        setAfbeelding('');
    }

    if (props.getEntry == 'GetVoorstellingen' && voorstellingen.length > 0) {
        content = voorstellingen.map((list) => (
            <tr>
                <td className="Id">
                    {list.voorstellingId}
                </td>
                <td className="poster">
                    <img src={list.afbeelding} alt='voorstellingsafbeelding' width='100' height='140'></img>
                </td>
                <td className="titel">
                    {list.titel}
                </td>
                <td className='beschrijving'>
                    {list.beschrijving}
                </td>
                <td className='tijdsduur'>
                    {list.tijdsduurInMinuten} min.
                </td>
            </tr>
        ));
    }

    if (props.getEntry == 'GetVoorstellingen') {
        return (
            <div>
                <table className="table table-bordered table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope='col'>
                                ID
                            </th>
                            <th scope='col'>
                                Poster
                            </th>
                            <th scope='col'>
                                Titel
                            </th>
                            <th scope='col'>
                                Beschrijving
                            </th>
                            <th scope='col'>
                                Tijdsduur
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


    if (props.postEntry == "PostVoorstelling") {
        return (
            <div>
                <form onSubmit={submitHandler}>
                    <br />
                    <label className='fs-5 fw-bold text-info'>Voorstelling toevoegen</label>
                    <br />
                    <br />
                    <label>Titel*</label>
                    <br />
                    <input className='btn bg-light border-dark text-dark'  value={titel} onChange={titelHandler} required />
                    <br />
                    <br />
                    <label>Beschrijving*</label>
                    <br />
                    <input className='btn bg-light border-dark text-dark'  value={beschrijving} onChange={beschrijvingHandler} required />
                    <br />
                    <br />
                    <label>Tijdsduur (minuten)*</label>
                    <br />
                    <input className='btn bg-light border-dark text-dark' type='number' min={1} value={tijdsduur} onChange={tijdsduurHandler} required />
                    <br />
                    <br />
                    <label>Afbeelding url*</label>
                    <br />
                    <input className='btn bg-light border-dark text-dark' type='url' value={afbeelding} onChange={afbeeldingHandler} required />
                    <br />
                    <br />
                    <img className='rounded shadow' src={afbeelding} alt='afbeelding voorbeeld' height={150} width={100} />
                    <br />
                    <br />
                    <button className='btn btn-secondary' onClick={voegVoorstelling}>Aanmaken</button>
                </form>
            </div>
        );
    }
}