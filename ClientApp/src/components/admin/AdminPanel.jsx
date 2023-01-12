import React, { useState, useEffect, useCallback } from 'react';
import { MenuKnop } from '../artiestenportaal/layout/MenuKnop';

export function AdminPanel() {

    const [enteredName, setName] = useState('');
    const [artiesten, setArt] = useState([]);
    const [medewerkers, setM] = useState([]);
    const [admins, setA] = useState([]);
    const [groepen, setGroep] = useState([]);
    const [donateurs, setD] = useState([]);
    const [zalen, setZaal] = useState([]);
    const [voorstellingen, SetV] = useState([]);
    const [optredens, SetO] = useState([]);
    //const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getMedewerkers = useCallback(async function () {
        //event.preventDefault();
        //setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://localhost:44461/api/Account/GetMedewerkers', {
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

            setM(data);

        } catch (error) {
            setError(error.message);
        }
        //setIsLoading(false);
    }, []);

    const getAdmins = useCallback(async function () {
        //event.preventDefault();
        //setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://localhost:44461/api/Account/GetAdmins', {
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

            setA(data);
            //console.log(data);
        } catch (error) {
            setError(error.message);
        }
        //setIsLoading(false);
    }, []);

    const getArtiesten = useCallback(async function () {
        //event.preventDefault();
        //setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://localhost:44461/api/Account/GetArtiesten', {
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

            setArt(data);
            //console.log(data);
        } catch (error) {
            setError(error.message);
        }
        //setIsLoading(false);
    }, []);

    const getGroepen = useCallback(async function () {
        //event.preventDefault();
        //setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://localhost:44461/api/Account/GetGroepen', {
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

            setGroep(data);
            //console.log(data);
        } catch (error) {
            setError(error.message);
        }
        //setIsLoading(false);
    }, []);

    // const getDonateurs = useCallback(async function () {
    //     //event.preventDefault();
    //     //setIsLoading(true);
    //     setError(null);
    //     try {
    //         const response = await fetch('https://localhost:44461/api/Account/GetDonateurs', {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authState')).token
    //             }
    //         });

    //         if (!response.ok) {
    //             throw new Error('Er is iets fout gegaan!');
    //         }

    //         const data = await response.json();

    //         setD(data);
    //         //console.log(data);
    //     } catch (error) {
    //         setError(error.message);
    //     }
    //     //setIsLoading(false);
    // }, []);

    const getZalen = useCallback(async function () {
        //event.preventDefault();
        //setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://localhost:44461/api/zaal/GetZalen', {
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

            setZaal(data);
            //console.log(data);
        } catch (error) {
            setError(error.message);
        }
        //setIsLoading(false);
    }, []);

    const getVoorstellingen = useCallback(async function () {
        //event.preventDefault();
        //setIsLoading(true);
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

            SetV(data);
            //console.log(data);
        } catch (error) {
            setError(error.message);
        }
        //setIsLoading(false);
    }, []);

    const getOptredens = useCallback(async function () {
        //event.preventDefault();
        //setIsLoading(true);
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

            SetO(data);
            //console.log(data);
        } catch (error) {
            setError(error.message);
        }
        //setIsLoading(false);
    }, []);

    useEffect(() => {
        getAdmins();
        getMedewerkers();
        getArtiesten();
        getGroepen();
        getZalen();
        getVoorstellingen();
        getOptredens();
    }, [getMedewerkers, getAdmins, getArtiesten, getGroepen, getZalen, getVoorstellingen, getOptredens]);

    function update() {
        getAdmins();
        getMedewerkers();
        getArtiesten();
        getGroepen();
        getZalen();
        getVoorstellingen();
        getOptredens();
    }

    let content = <p>nothing</p>;

    if (enteredName == 'Medewerkers' && medewerkers.length > 0) {
        content = medewerkers.map((list) => (
            <tr>
                <td className="Id">
                    {list.id}
                </td>
                <td className="Username">
                    {list.userName}
                </td>
                <td className="Email">
                    {list.email}
                </td>
                <td className="Naam">
                    {list.voornaam + ' ' + list.achternaam}
                </td>
            </tr>
        ));
    }

    if (enteredName == 'Admins' && admins.length > 0) {
        content = admins.map((list) => (
            <tr>
                <td className="Id">
                    {list.id}
                </td>
                <td className="Username">
                    {list.userName}
                </td>
                <td className="Email">
                    {list.email}
                </td>
                <td className="Naam">
                    {list.voornaam + ' ' + list.achternaam}
                </td>
            </tr>
        ));
    }

    if (enteredName == 'Artiesten' && artiesten.length > 0) {
        content = artiesten.map((list) => (
            <tr>
                <td className="Id">
                    {list.id}
                </td>
                <td className="Username">
                    {list.userName}
                </td>
                <td className="Email">
                    {list.email}
                </td>
                <td className="Naam">
                    {list.voornaam + ' ' + list.achternaam}
                </td>
                <td className="Groep">
                    {list.artiestenGroep == null && 'geen'}
                </td>
            </tr>
        ));
    }

    if (enteredName == 'Groepen' && groepen.length > 0) {
        content = groepen.map((list) => (
            <tr>
                <td className="Id">
                    {list.artiestenGroepId}
                </td>
                <td className="Naam">
                    {list.groepsNaam}
                </td>
                <td className="Email">
                    {list.groepsemail == null && 'onbekend'}
                </td>
                <td className="artiesten">
                    {list.artiesten.length}
                </td>
            </tr>
        ));
    }

    if (enteredName == 'Donateurs' && donateurs.length > 0) {
        content = donateurs.map((list) => (
            <tr>
                <td className="Id">
                    {list.id}
                </td>
                <td className="Username">
                    {list.userName}
                </td>
                <td className="Email">
                    {list.email}
                </td>
                <td className="Naam">
                    {list.voornaam + ' ' + list.achternaam}
                </td>
            </tr>
        ));
    }

    if (enteredName == 'Zalen' && zalen.length > 0) {
        content = zalen.map((list) => (
            <tr>
                <td className="Id">
                    {list.zaalId}
                </td>
                <td className="type">
                    {list.grootte}
                </td>
                <td className="ingeplandOptredens">
                    {list.optredens}
                </td>
                <td className='aantalStoelen'>
                    {list.aantalStoelen}
                </td>
            </tr>
        ));
    }

    if (enteredName == 'Voorstellingen' && voorstellingen.length > 0) {
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

    if (enteredName == 'Optredens' && optredens.length > 0) {
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
                    {list.datumTijdstip.split('T')[0].substring(8, 10) + list.datumTijdstip.split('T')[0].substring(4, 8) + list.datumTijdstip.split('T')[0].substring(0, 4)}
                </td>
                <td className='tijdstip'>
                    {list.datumTijdstip.split('T')[1].substring(0, 5)}
                </td>
            </tr>
        ));
    }


    if (error) {
        content = <tr><td>{error}</td></tr>;
    }

    console.log(optredens);
    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className='text-white display-5 mb-4 d-block'>
                Dashboard
            </div>
            <br />
            <div>
                <label className='text-white display-6 mb-1 d-block'>Getters</label>
                <br />
                <button onClick={update}>Update</button>
                <button onClick={() => setName('Admins')}>Admins</button>
                <button onClick={() => setName('Medewerkers')}>Medewerkers</button>
                <button onClick={() => setName('Artiesten')}>Artiesten</button>
                <button onClick={() => setName('Groepen')}>Groepen</button>
                <button onClick={() => setName('Donateurs')}>Donateurs</button>
                <button onClick={() => setName('Zalen')}>Zalen</button>
                <button onClick={() => setName('Voorstellingen')}>Voorstellingen</button>
                <button onClick={() => setName('Optredens')}>Optredens</button>
            </div>
            <br />
            <div>
                <table className="table table-bordered table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope='col'>
                                ID
                            </th>
                            {enteredName != 'Groepen' && enteredName != 'Zalen' && enteredName != 'Voorstellingen' && enteredName != 'Optredens' &&
                                <th scope='col'>
                                    Username
                                </th>
                            }
                            {enteredName == 'Groepen' &&
                                <th scope='col'>
                                    Groepsnaam
                                </th>
                            }
                            {enteredName == 'Zalen' &&
                                <th scope='col'>
                                    Type
                                </th>
                            }
                            {enteredName == 'Voorstellingen' &&
                                <th scope='col'>
                                    Poster
                                </th>
                            }
                            {enteredName == 'Optredens' &&
                                <th scope='col'>
                                    VoorstellingID
                                </th>
                            }
                            {enteredName != 'Zalen' && enteredName != 'Voorstellingen' && enteredName != 'Optredens' &&
                                <th scope='col'>
                                    Email
                                </th>
                            }
                            {enteredName == 'Zalen' &&
                                <th scope='col'>
                                    Geboekte Optredens
                                </th>
                            }
                            {enteredName == 'Voorstellingen' &&
                                <th scope='col'>
                                    Titel
                                </th>
                            }
                            {enteredName == 'Optredens' &&
                                <th scope='col'>
                                    ZaalID
                                </th>
                            }
                            {enteredName != 'Groepen' && enteredName != 'Zalen' && enteredName != 'Voorstellingen' && enteredName != 'Optredens' &&
                                <th scope='col'>
                                    Naam
                                </th>
                            }
                            {enteredName == 'Groepen' &&
                                <th scope='col'>
                                    Aantal Leden
                                </th>
                            }
                            {enteredName == 'Zalen' &&
                                <th scope='col'>
                                    Aantal Stoelen
                                </th>
                            }
                            {enteredName == 'Artiesten' &&
                                <th scope='col'>
                                    Groep
                                </th>
                            }
                            {enteredName == 'Voorstellingen' &&
                                <th scope='col'>
                                    Beschrijving
                                </th>
                            }
                            {enteredName == 'Voorstellingen' &&
                                <th scope='col'>
                                    Tijdsduur
                                </th>
                            }
                            {enteredName == 'Optredens' &&
                                <th scope='col'>
                                    ArtiestID/GroepID
                                </th>
                            }
                            {enteredName == 'Optredens' &&
                                <th scope='col'>
                                    Prijs
                                </th>
                            }
                            {enteredName == 'Optredens' &&
                                <th scope='col'>
                                    Datum
                                </th>
                            }
                            {enteredName == 'Optredens' &&
                                <th scope='col'>
                                    Tijdstip
                                </th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {content}
                    </tbody>
                </table>
                <div>
                    <label className='text-white display-6 mb-1 d-block'>Setters</label>
                    <br />
                    <button onClick={update}>Update</button>
                    <button onClick={() => setName('Admins')}>Admins</button>
                    <button onClick={() => setName('Medewerkers')}>Medewerkers</button>
                    <button onClick={() => setName('Artiesten')}>Artiesten</button>
                    <button onClick={() => setName('Groepen')}>Groepen</button>
                    <button onClick={() => setName('Donateurs')}>Donateurs</button>
                    <button onClick={() => setName('Zalen')}>Zalen</button>
                    <button onClick={() => setName('Voorstellingen')}>Voorstellingen</button>
                    <button onClick={() => setName('Optredens')}>Optredens</button>
                </div>
            </div>
        </div>
    );
}