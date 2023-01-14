import React, { useState, useEffect, useCallback } from 'react';

export function Medewerker(props) {

    const [error, setError] = useState(null);
    let content = 'nothing';

    //get states
    const [medewerkers, setMedewerkers] = useState([]);

    //post states
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

    //input handlers
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

            setMedewerkers(data);

        } catch (error) {
            setError(error.message);
        }
    }, []);

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

    useEffect(() => {
        getMedewerkers();
    }, [getMedewerkers]);

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
    }

    if (props.getEntry == 'GetMedewerkers' && medewerkers.length > 0) {
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

    if (props.getEntry == 'GetMedewerkers') {
        return (
            <div>
                <table className="table table-bordered table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope='col'>
                                ID
                            </th>
                            <th scope='col'>
                                Username
                            </th>
                            <th scope='col'>
                                Email
                            </th>
                            <th scope='col'>
                                Naam
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


    if (props.postEntry == "PostMedewerker") {
        return (
            <div>
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
            </div>
        );
    }
}