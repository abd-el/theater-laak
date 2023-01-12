import React, { useState, useEffect, useCallback } from 'react';
import { MenuKnop } from '../artiestenportaal/layout/MenuKnop';

export function AdminPanel() {

    const [enteredName, setName] = useState('');
    const [artiesten, setArt] = useState([]);
    const [medewerkers, setM] = useState([]);
    const [admins, setA] = useState([]);
    const [groepen, setGroep] = useState([]);
    const [donateurs, setD] = useState([]);
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

    useEffect(() => {
        getAdmins();
        getMedewerkers();
        getArtiesten();
        getGroepen();
        getDonateurs();

    }, [getMedewerkers, getAdmins, getArtiesten, getGroepen, getDonateurs]);

    function update() {
        getAdmins();
        getMedewerkers();
        getArtiesten();
        getGroepen();
        getDonateurs();
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


    if (error) {
        content = <tr><td>{error}</td></tr>;
    }

    console.log(donateurs);
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
            <button onClick={update}>Update</button>
            <button onClick={() => setName('Admins')}>Admins</button>
            <button onClick={() => setName('Medewerkers')}>Medewerkers</button>
            <button onClick={() => setName('Artiesten')}>Artiesten</button>
            <button onClick={() => setName('Groepen')}>Groepen</button>
            <button onClick={() => setName('Donateurs')}>Donateurs</button>
            <br />
            <div>
                <table className="table table-bordered table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope='col'>
                                ID
                            </th>
                            {enteredName != 'Groepen' &&
                                <th scope='col'>
                                    Username
                                </th>
                            }
                            {enteredName == 'Groepen' &&
                                <th scope='col'>
                                    Groepsnaam
                                </th>
                            }
                            <th scope='col'>
                                Email
                            </th>
                            {enteredName != 'Groepen' &&
                                <th scope='col'>
                                    Naam
                                </th>
                            }
                            {enteredName == 'Groepen' &&
                                <th scope='col'>
                                    Aantal Leden
                                </th>
                            }
                            {enteredName == 'Artiesten' &&
                                <th scope='col'>
                                    Groep
                                </th>
                            }
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