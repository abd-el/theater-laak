import React, { useState, useEffect, useCallback } from 'react';
import { MenuKnop } from '../artiestenportaal/layout/MenuKnop';

export function AdminPanel() {

    const [enteredName1, setName1] = useState('');
    const [enteredName2, setName2] = useState('');
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

    //admin states
    const [voornaam, setVoornaam] = useState('');
    const [achternaam, setAchternaam] = useState('');
    const [username, setUsername] = useState('');
    const [password, setpassword] = useState('');
    const [geslacht, setGeslacht] = useState('');
    const [email, setEmail] = useState('');
    const [geboorteDatum, setGeboorteDatum] = useState('');
    const [adres, setAdres] = useState('');
    const [telefoonnummer, setTelefoonnummer] = useState('');
    const [emailVoorkeur, setemailVoorkeur] = useState('');
    const [ip, setIp] = useState('');
    const [bankGegevens, setbankGegevens] = useState('');
    const [artiestenGroepId, setAG] = useState('');
    const [tijdsduurInMinuten, setTijdsDuur] = useState('');
    const [afbeelding, setAfbeelding] = useState('');

    function voornaamHandler(e) {
        setVoornaam(e.target.value);
    }

    function achternaamHandler(e) {
        setAchternaam(e.target.value);
    }

    function usernameHandler(e) {
        setUsername(e.target.value);
    }

    function passwordHandler(e) {
        setpassword(e.target.value);
    }

    function geslachtHandler(e) {
        setGeslacht(e.target.value);
    }

    function emailHandler(e) {
        setEmail(e.target.value);
    }

    function geboorteDHandler(e) {
        setGeboorteDatum(e.target.value);
    }

    function adresHandler(e) {
        setAdres(e.target.value);
    }

    function telefoonnummerHandler(e) {
        setTelefoonnummer(e.target.value);
    }

    function emailvoorkeurHandler(e) {
        setemailVoorkeur(e.target.value);
    }

    function ipHandler(e) {
        setIp(e.target.value);
    }

    function bankgegevensHandler(e) {
        setbankGegevens(e.target.value);
    }

    function artiestenGroepHandler(e) {
        setAG(e.target.value);
    }

    function tijdsduurHandler(e) {
        setTijdsDuur(e.target.value);
    }

    function afbeeldingHandler(e) {
        setAfbeelding(e.target.value);
    }


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
            const response = await fetch('https://localhost:44461/api/artiestenportaal/GetGroepen', {
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
            console.log(data);
            setGroep(data.groepData);
            //console.log(data);
        } catch (error) {
            setError(error.message);
        }
        //setIsLoading(false);
    }, []);

    const getDonateurs = useCallback(async function () {
        //event.preventDefault();
        //setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://localhost:44461/api/Account/GetDonateurs', {
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

            setD(data);
            //console.log(data);
        } catch (error) {
            setError(error.message);
        }
        //setIsLoading(false);
    }, []);

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
        getDonateurs();
    }, [getMedewerkers, getAdmins, getArtiesten, getGroepen, getZalen, getVoorstellingen, getOptredens, getDonateurs]);

    function update() {
        getAdmins();
        getMedewerkers();
        getArtiesten();
        getGroepen();
        getZalen();
        getVoorstellingen();
        getOptredens();
        getDonateurs();
    }

    async function voegAdmin() {
        let admin = {
            userName: username,
            password: password,
            voornaam: voornaam,
            achternaam: achternaam,
            geslacht: geslacht,
            email: email,
            geboorteDatum: geboorteDatum,
            adres: adres,
            telefoonnummer: telefoonnummer,
            emailVoorkeur: emailVoorkeur,
            ip: ip,
            bankGegevens: bankGegevens,
            tickets: [],
            donaties: []
        };

        fetch('https://localhost:44461/api/Account/RegistreerAdmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authState')).token
            },
            body: JSON.stringify(admin)
        });
        console.log(admin)
    }

    async function voegMedewerker() {
        let medewerker = {
            userName: username,
            password: password,
            voornaam: voornaam,
            achternaam: achternaam,
            geslacht: geslacht,
            email: email,
            geboorteDatum: geboorteDatum,
            adres: adres,
            telefoonnummer: telefoonnummer,
            emailVoorkeur: emailVoorkeur,
            ip: ip,
            bankGegevens: bankGegevens,
            tickets: [],
            donaties: []
        };

        fetch('https://localhost:44461/api/Account/RegistreerMedewerker', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authState')).token
            },
            body: JSON.stringify(medewerker)
        });
        console.log(medewerker)
    }

    async function voegArtiest() {
        let artiest = {
            userName: username,
            password: password,
            voornaam: voornaam,
            achternaam: achternaam,
            geslacht: geslacht,
            email: email,
            geboorteDatum: geboorteDatum,
            adres: adres,
            telefoonnummer: telefoonnummer,
            emailVoorkeur: emailVoorkeur,
            artiestenGroepId: artiestenGroepId,
            tickets: [],
            donaties: []
        };

        fetch('https://localhost:44461/api/Account/RegistreerArtiest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authState')).token
            },
            body: JSON.stringify(artiest)
        });
        console.log(artiest)
    }

    async function voegGroep() {
        let groep = {
            groepsNaam: username,
            groepsEmail: email,
            artiesten: []
        };

        fetch('https://localhost:44461/api/Account/RegistreerGroep', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authState')).token
            },
            body: JSON.stringify(groep)
        });
        console.log(groep)
    }

    async function voegZaal() {
        let zaal = {
            groepsNaam: username,
            groepsEmail: email,
            artiesten: []
        };

        fetch('https://localhost:44461/api/zaal/MaakZaal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authState')).token
            },
            body: JSON.stringify(zaal)
        });
        console.log(zaal)
    }

    async function voegVoorstelling() {
        let voorstelling = {
            titel: username,
            beschrijving: voornaam,
            tijdsduurInMinuten: tijdsduurInMinuten,
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

    async function voegOptredens() {
        let optreden = {
            voorstellingId: username,
            zaalId: voornaam,
            artiestId: tijdsduurInMinuten,
            groepId: afbeelding,
            voorstellingen: []
        };

        fetch('https://localhost:44461/api/Programmering/Voorstelling', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authState')).token
            },
            body: JSON.stringify(optreden)
        });
        console.log(optreden)
    }

    function submitHandler(event) {
        event.preventDefault();
        setUsername('');
        setpassword('');
        setVoornaam('');
        setAchternaam('');
        setGeslacht('');
        setEmail('');
        setGeboorteDatum('');
        setAdres('');
        setTelefoonnummer('');
        setemailVoorkeur('');
        setIp('');
        setbankGegevens('');
        setAG('');
        setTijdsDuur('');
        setAfbeelding('');
    }

    let content = <p>nothing</p>;

    if (enteredName1 == 'Medewerkers' && medewerkers.length > 0) {
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

    if (enteredName1 == 'Admins' && admins.length > 0) {
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

    if (enteredName1 == 'Artiesten' && artiesten.length > 0) {
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
                    {list.artiestenGroepId}
                </td>
            </tr>
        ));
    }

    if (enteredName1 == 'Groepen' && groepen.length > 0) {
        content = groepen.map((list) => (
            <tr>
                <td className="Id">
                    {list.id}
                </td>
                <td className="Naam">
                    {list.naam}
                </td>
                <td className="Email">
                    {list.groepsEmail == '' && 'onbekend'}
                    {list.groepsEmail}
                </td>
                <td className="artiesten">
                    {list.artiesten.length}
                </td>
            </tr>
        ));
    }

    if (enteredName1 == 'Donateurs' && donateurs.length > 0) {
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

    if (enteredName1 == 'Zalen' && zalen.length > 0) {
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

    if (enteredName1 == 'Voorstellingen' && voorstellingen.length > 0) {
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

    if (enteredName1 == 'Optredens' && optredens.length > 0) {
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
                <label className='text-white display-6 mb-1 d-block'>Getters(Ophalen)</label>
                <br />
                <button onClick={update}>Update</button>
                <button onClick={() => setName1('Admins')}>Admins</button>
                <button onClick={() => setName1('Medewerkers')}>Medewerkers</button>
                <button onClick={() => setName1('Artiesten')}>Artiesten</button>
                <button onClick={() => setName1('Groepen')}>Groepen</button>
                <button onClick={() => setName1('Donateurs')}>Donateurs</button>
                <button onClick={() => setName1('Zalen')}>Zalen</button>
                <button onClick={() => setName1('Voorstellingen')}>Voorstellingen</button>
                <button onClick={() => setName1('Optredens')}>Optredens</button>
            </div>
            <br />
            <div>
                <table className="table table-bordered table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope='col'>
                                ID
                            </th>
                            {enteredName1 != 'Groepen' && enteredName1 != 'Zalen' && enteredName1 != 'Voorstellingen' && enteredName1 != 'Optredens' &&
                                <th scope='col'>
                                    Username
                                </th>
                            }
                            {enteredName1 == 'Groepen' &&
                                <th scope='col'>
                                    Groepsnaam
                                </th>
                            }
                            {enteredName1 == 'Zalen' &&
                                <th scope='col'>
                                    Type
                                </th>
                            }
                            {enteredName1 == 'Voorstellingen' &&
                                <th scope='col'>
                                    Poster
                                </th>
                            }
                            {enteredName1 == 'Optredens' &&
                                <th scope='col'>
                                    VoorstellingID
                                </th>
                            }
                            {enteredName1 != 'Zalen' && enteredName1 != 'Voorstellingen' && enteredName1 != 'Optredens' &&
                                <th scope='col'>
                                    Email
                                </th>
                            }
                            {enteredName1 == 'Zalen' &&
                                <th scope='col'>
                                    Geboekte Optredens
                                </th>
                            }
                            {enteredName1 == 'Voorstellingen' &&
                                <th scope='col'>
                                    Titel
                                </th>
                            }
                            {enteredName1 == 'Optredens' &&
                                <th scope='col'>
                                    ZaalID
                                </th>
                            }
                            {enteredName1 != 'Groepen' && enteredName1 != 'Zalen' && enteredName1 != 'Voorstellingen' && enteredName1 != 'Optredens' &&
                                <th scope='col'>
                                    Naam
                                </th>
                            }
                            {enteredName1 == 'Groepen' &&
                                <th scope='col'>
                                    Aantal Leden
                                </th>
                            }
                            {enteredName1 == 'Zalen' &&
                                <th scope='col'>
                                    Aantal Stoelen
                                </th>
                            }
                            {enteredName1 == 'Artiesten' &&
                                <th scope='col'>
                                    Groep
                                </th>
                            }
                            {enteredName1 == 'Voorstellingen' &&
                                <th scope='col'>
                                    Beschrijving
                                </th>
                            }
                            {enteredName1 == 'Voorstellingen' &&
                                <th scope='col'>
                                    Tijdsduur
                                </th>
                            }
                            {enteredName1 == 'Optredens' &&
                                <th scope='col'>
                                    ArtiestID/GroepID
                                </th>
                            }
                            {enteredName1 == 'Optredens' &&
                                <th scope='col'>
                                    Prijs
                                </th>
                            }
                            {enteredName1 == 'Optredens' &&
                                <th scope='col'>
                                    Datum
                                </th>
                            }
                            {enteredName1 == 'Optredens' &&
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
                    <label className='text-white display-6 mb-1 d-block'>Setters(Aanmaken)</label>
                    <br />
                    <button onClick={submitHandler}>Reset</button>
                    <button onClick={() => setName2('Admin')}>Admin</button>
                    <button onClick={() => setName2('Medewerker')}>Medewerker</button>
                    <button onClick={() => setName2('Artiest')}>Artiest</button>
                    <button onClick={() => setName2('Groep')}>Groep</button>
                    <button onClick={() => setName2('Zaal')}>Zaal</button>
                    <button onClick={() => setName2('Voorstelling')}>Voorstelling</button>
                    <button onClick={() => setName2('Optreden')}>Optreden</button>
                </div>
                <br />
                {enteredName2 == 'Admin' &&
                    <form onSubmit={submitHandler}>
                        <br />
                        <label>Admin account aanmaken</label>
                        <br />
                        <br />
                        <input placeholder='Voornaam' value={voornaam} onChange={voornaamHandler} required />
                        <input placeholder='Achternaam' value={achternaam} onChange={achternaamHandler} required />
                        <br />
                        <br />
                        <input placeholder='Gebruikersnaam' value={username} onChange={usernameHandler} required />
                        <input placeholder='Wachtwoord' value={password} onChange={passwordHandler} required />
                        <br />
                        <br />
                        <input placeholder='Geslacht' value={geslacht} onChange={geslachtHandler} required />
                        <br />
                        <br />
                        <input placeholder='Email' value={email} onChange={emailHandler} required />
                        <br />
                        <br />
                        <input type='date' placeholder='geboortedatum' value={geboorteDatum} onChange={geboorteDHandler} required />
                        <br />
                        <br />
                        <input placeholder='Adres' value={adres} onChange={adresHandler} required />
                        <br />
                        <br />
                        <input placeholder='Telefoonnummer' value={telefoonnummer} onChange={telefoonnummerHandler} required />
                        <br />
                        <br />
                        <input placeholder='Nieuwsbrief' value={emailVoorkeur} onChange={emailvoorkeurHandler} required />
                        <br />
                        <br />
                        <input placeholder='ip' value={ip} onChange={ipHandler} required />
                        <br />
                        <br />
                        <input placeholder='bankgegevens' value={bankGegevens} onChange={bankgegevensHandler} required />
                        <br />
                        <br />
                        <button onClick={voegAdmin}>Aanmaken</button>
                    </form>
                }
                {enteredName2 == 'Medewerker' &&
                    <form onSubmit={submitHandler}>
                        <br />
                        <label>Medewerker account aanmaken</label>
                        <br />
                        <br />
                        <input placeholder='Voornaam' value={voornaam} onChange={voornaamHandler} required />
                        <input placeholder='Achternaam' value={achternaam} onChange={achternaamHandler} required />
                        <br />
                        <br />
                        <input placeholder='Gebruikersnaam' value={username} onChange={usernameHandler} required />
                        <input placeholder='Wachtwoord' value={password} onChange={passwordHandler} required />
                        <br />
                        <br />
                        <input placeholder='Geslacht' value={geslacht} onChange={geslachtHandler} required />
                        <br />
                        <br />
                        <input placeholder='Email' value={email} onChange={emailHandler} required />
                        <br />
                        <br />
                        <input type='date' placeholder='geboortedatum' value={geboorteDatum} onChange={geboorteDHandler} required />
                        <br />
                        <br />
                        <input placeholder='Adres' value={adres} onChange={adresHandler} required />
                        <br />
                        <br />
                        <input placeholder='Telefoonnummer' value={telefoonnummer} onChange={telefoonnummerHandler} required />
                        <br />
                        <br />
                        <input placeholder='Nieuwsbrief' value={emailVoorkeur} onChange={emailvoorkeurHandler} required />
                        <br />
                        <br />
                        <input placeholder='ip' value={ip} onChange={ipHandler} required />
                        <br />
                        <br />
                        <input placeholder='bankgegevens' value={bankGegevens} onChange={bankgegevensHandler} required />
                        <br />
                        <br />
                        <button onClick={voegMedewerker}>Aanmaken</button>
                    </form>
                }
                {enteredName2 == 'Artiest' &&
                    <form onSubmit={submitHandler}>
                        <br />
                        <label>Artiest account aanmaken</label>
                        <br />
                        <br />
                        <input placeholder='Voornaam' value={voornaam} onChange={voornaamHandler} required />
                        <input placeholder='Achternaam' value={achternaam} onChange={achternaamHandler} required />
                        <br />
                        <br />
                        <input placeholder='Gebruikersnaam' value={username} onChange={usernameHandler} required />
                        <input placeholder='Wachtwoord' value={password} onChange={passwordHandler} required />
                        <br />
                        <br />
                        <input placeholder='Geslacht' value={geslacht} onChange={geslachtHandler} required />
                        <br />
                        <br />
                        <input placeholder='Email' value={email} onChange={emailHandler} required />
                        <br />
                        <br />
                        <input type='date' placeholder='geboortedatum' value={geboorteDatum} onChange={geboorteDHandler} required />
                        <br />
                        <br />
                        <input placeholder='Adres' value={adres} onChange={adresHandler} required />
                        <br />
                        <br />
                        <input placeholder='Telefoonnummer' value={telefoonnummer} onChange={telefoonnummerHandler} required />
                        <br />
                        <br />
                        <input placeholder='Nieuwsbrief' value={emailVoorkeur} onChange={emailvoorkeurHandler} required />
                        <br />
                        <br />
                        <input placeholder='Groep' value={artiestenGroepId} onChange={artiestenGroepHandler} />
                        <br />
                        <br />
                        <button onClick={voegArtiest}>Aanmaken</button>
                    </form>
                }
                {enteredName2 == 'Groep' &&
                    <form onSubmit={submitHandler}>
                        <br />
                        <label>Groep aanmaken</label>
                        <br />
                        <br />
                        <input placeholder='Groepsnaam' value={username} onChange={usernameHandler} required />
                        <br />
                        <br />
                        <input placeholder='Email' value={email} onChange={emailHandler} required />
                        <br />
                        <br />
                        <input placeholder='Voeg artiest(en) toe' />
                        <br />
                        <br />
                        <button onClick={voegGroep}>Aanmaken</button>
                    </form>
                }
                {enteredName2 == 'Zaal' &&
                    <form onSubmit={submitHandler}>
                        <br />
                        <label>Zaal aanmaken</label>
                        <br />
                        <br />
                        <input placeholder='Stoelen' type='number' min={30} max={400} required />
                        <br />
                        <br />
                        <button onClick={voegZaal}>Aanmaken</button>
                    </form>
                }
                {enteredName2 == 'Voorstelling' &&
                    <form onSubmit={submitHandler}>
                        <br />
                        <label>Voorstelling toevoegen</label>
                        <br />
                        <br />
                        <input placeholder='Titel' value={username} onChange={usernameHandler} required />
                        <br />
                        <br />
                        <input placeholder='Beschrijving' value={voornaam} onChange={voornaamHandler} required />
                        <br />
                        <br />
                        <input placeholder='Tijdsduur (minuten)' type='number' min={1} value={tijdsduurInMinuten} onChange={tijdsduurHandler} required />
                        <br />
                        <br />
                        <input placeholder='afbeelding' value={afbeelding} onChange={afbeeldingHandler} required />
                        <br />
                        <br />
                        <img src={afbeelding} alt='afbeelding voorbeeld' height={150} width={100} />
                        <br />
                        <br />
                        <button onClick={voegVoorstelling}>Aanmaken</button>
                    </form>
                }
                {enteredName2 == 'Optreden' &&
                    <form onSubmit={submitHandler}>
                        <br />
                        <label>Optreden toevoegen</label>
                        <br />
                        <br />
                        <input placeholder='VoorstellingId' value={username} onChange={usernameHandler} required />
                        <br />
                        <br />
                        <input placeholder='ZaalId' value={voornaam} onChange={voornaamHandler} required />
                        <br />
                        <br />
                        <input placeholder='ArtiestId' type='number' min={1} value={tijdsduurInMinuten} onChange={tijdsduurHandler} required />
                        <br />
                        <br />
                        <input placeholder='GroepId' value={afbeelding} onChange={afbeeldingHandler} required />
                        <br />
                        <br />
                        <input placeholder='Prijs' value={afbeelding} onChange={afbeeldingHandler} required />
                        <br />
                        <br />
                        <input placeholder='Datum' type='date' value={afbeelding} onChange={afbeeldingHandler} required />
                        <br />
                        <br />
                        <input placeholder='Tijd' type='time' value={afbeelding} onChange={afbeeldingHandler} required />
                        <br />
                        <br />
                        <label>Begunstigers Exclusief</label>&nbsp;
                        <input placeholder='Begunstigers Exclusief' type='checkbox' value={afbeelding} onChange={afbeeldingHandler} required />
                        <br />
                        <br />
                        <button>Aanmaken</button>
                    </form>
                }
            </div>
        </div>
    );
}