import React, { useState, useEffect, useCallback } from 'react';

export function Admin(props) {

    const [error, setError] = useState(null);
    let content = 'nothing';

    //get states
    const [admins, setAdmins] = useState([]);

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

    const getAdmins = useCallback(async function () {
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

            setAdmins(data);
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    }, []);

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

    useEffect(() => {
        getAdmins();
    }, [getAdmins]);

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

    if (props.getEntry == 'GetAdmins' && admins.length > 0) {
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

    if (props.getEntry == 'GetAdmins') {
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


    if (props.postEntry == "PostAdmin") {
        return (
            <div>
                <form onSubmit={submitHandler}>
                    <br />
                    <label>Admin account aanmaken</label>
                    <br />
                    <br />
                    <input placeholder='Voornaam*' value={voornaam} onChange={voornaamHandler}  />
                    <input placeholder='Achternaam*' value={achternaam} onChange={achternaamHandler}  />
                    <br />
                    <br />
                    <input placeholder='Gebruikersnaam*' value={username} onChange={usernameHandler}  />
                    <input placeholder='Wachtwoord*' value={password} onChange={passwordHandler}  />
                    <br />
                    <br />
                    <input placeholder='Geslacht' value={geslacht} onChange={geslachtHandler} />
                    <br />
                    <br />
                    <input placeholder='Email*' type='email' value={email} onChange={emailHandler}  />
                    <br />
                    <br />
                    <input type='date' placeholder='geboortedatum' max={'2005-01-20'} value={geboorteDatum} onChange={geboorteDHandler}  />
                    <br />
                    <br />
                    <input placeholder='Adres' value={adres} onChange={adresHandler}  />
                    <br />
                    <br />
                    <input placeholder='0612345678' type='tel' pattern='[0]{1}[6]{1}[0-9]{4}[0-9]{4}' value={telefoonnummer} onChange={telefoonnummerHandler}  />
                    <br />
                    <br />
                    <div className='btn-group'>
                        <button className='btn btn-light dropdown-toggle'aria-expanded="false">Nieuwsbrief</button>
                        <ul className='dropdown-menu'>
                            <li><button onClick={() => setemailVoorkeur('geen')}>geen</button></li>
                        </ul>
                    </div>
                    <br />
                    <br />
                    <input placeholder='ip' value={ip} onChange={ipHandler}  />
                    <br />
                    <br />
                    <input placeholder='bankgegevens' value={bankGegevens} onChange={bankgegevensHandler}  />
                    <br />
                    <br />
                    <button onClick={voegAdmin}>Aanmaken</button>
                </form>
            </div>
        );
    }
}