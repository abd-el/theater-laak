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
    const [voornaam,setVoornaam] = useState('');
    const [achternaam,setAchternaam] = useState('');
    const [username,setUsername] = useState('');
    const [password,setpassword] = useState('');
    const [geslacht,setGeslacht] = useState('');
    const [email,setEmail] = useState('');
    const [geboorteDatum,setGeboorteDatum] = useState('');
    const [adres,setAdres] = useState('');
    const [telefoonnummer,setTelefoonnummer] = useState('');
    const [emailVoorkeur,setemailVoorkeur] = useState('');
    const [ip,setIp] = useState('');
    const [bankGegevens,setbankGegevens] = useState('');

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

        fetch('https://localhost:44461/api/Account/RegistreerAdmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authState')).token
            },
            body: JSON.stringify(medewerker)
        });
        console.log(medewerker)
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
                    {list.artiestenGroep == null && 'geen'}
                </td>
            </tr>
        ));
    }

    if (enteredName1 == 'Groepen' && groepen.length > 0) {
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
        
    //console.log(optredens);
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
                    <button onClick={update}>Update</button>
                    <button onClick={() => setName2('Admin')}>Admin</button>
                    <button onClick={() => setName2('Medewerker')}>Medewerker</button>
                    <button onClick={() => setName2('Artiest')}>Artiest</button>
                    <button onClick={() => setName2('Groep')}>Groep</button>
                    <button onClick={() => setName2('Zaal')}>Zaal</button>
                    <button onClick={() => setName2('Voorstelling')}>Voorstelling</button>
                    <button onClick={() => setName2('Optreden')}>Optreden</button>
                </div>
                <br />
                <div>
                    <input placeholder='Voornaam' value={voornaam} onChange={voornaamHandler}/>
                    <input placeholder='Achternaam' value={achternaam} onChange={achternaamHandler}/>
                    <input placeholder='Gebruikersnaam' value={username} onChange={usernameHandler}/>
                    <input placeholder='Wachtwoord' value={password} onChange={passwordHandler}/>
                    <input placeholder='Geslacht' value={geslacht} onChange={geslachtHandler}/>
                    <input placeholder='Email' value={email} onChange={emailHandler}/>
                    <input type='date' placeholder='geboortedatum' value={geboorteDatum} onChange={geboorteDHandler}/>
                    <input placeholder='Adres' value={adres} onChange={adresHandler}/>
                    <input placeholder='Telefoonnummer' value={telefoonnummer} onChange={telefoonnummerHandler}/>
                    <input placeholder='Email voorkeur' value={emailVoorkeur} onChange={emailvoorkeurHandler}/>
                    <input placeholder='ip' value={ip} onChange={ipHandler}/>
                    <input placeholder='bankgegevens' value={bankGegevens} onChange={bankgegevensHandler}/>
                    <button onClick={voegAdmin}>Maak {enteredName2}</button>
                    {}
                </div>
            </div>
        </div>
    );
}