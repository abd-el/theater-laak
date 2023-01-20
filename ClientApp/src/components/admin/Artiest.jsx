import React, { useState, useEffect, useCallback } from 'react';

export function Artiest(props) {

    const [error, setError] = useState(null);
    let content = 'nothing';

    //get states
    const [artiesten, setArtiesten] = useState([]);

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
    const [artiestenGroepId, setArtiestenGroepId] = useState('');

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

    function artiestenGroepHandler(e) {
        setArtiestenGroepId(e.target.value);
    }

    const getArtiesten = useCallback(async function () {
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

            setArtiesten(data);
        } catch (error) {
            setError(error.message);
        }
    }, []);

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
            donaties: [],
            optredens: []
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

    useEffect(() => {
        getArtiesten();
    }, [getArtiesten]);

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
        setArtiestenGroepId('');
    }

    if (props.getEntry == 'GetArtiesten' && artiesten.length > 0) {
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

    if (props.getEntry == 'GetArtiesten') {
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
                            <th scope='col'>
                                Groep
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


    if (props.postEntry == "PostArtiest") {
        return (
            <div>
                <form onSubmit={submitHandler}>
                    <br />
                    <label className='fs-5 fw-bold text-info'>Groep account aanmaken</label>
                    <br />
                    <br />
                    <label>Voornaam</label>
                    <br />
                    <input className='btn bg-light border-dark text-dark' placeholder='Voornaam*' value={voornaam} onChange={voornaamHandler} />
                    <br />
                    <br />
                    <label>Achternaam*</label>
                    <br />
                    <input className='btn bg-light border-dark text-dark' placeholder='Achternaam*' value={achternaam} onChange={achternaamHandler} />
                    <br />
                    <br />
                    <label>Gebruikersnaam*</label>
                    <br />
                    <input className='btn bg-light border-dark text-dark' placeholder='Gebruikersnaam*' value={username} onChange={usernameHandler} />
                    <br />
                    <br />
                    <label>Wachtwoord*</label>
                    <br />
                    <input className='btn bg-light border-dark text-dark' placeholder='Wachtwoord*' value={password} onChange={passwordHandler} />
                    <br />
                    <br />
                    <label>Geslacht*</label>
                    <br />
                    <div className='btn-group'>
                        <select className='form-select dropdown-icon-dark bg-light border-dark text-dark' placeholder='Kies een groep' required>
                            <option id="groep-invoer" onClick={() => setGeslacht('Man')}>Man</option>
                            <option id="groep-invoer" onClick={() => setGeslacht('Vrouw')}>Vrouw</option>
                            <option id="groep-invoer" onClick={() => setGeslacht('Anders')}>Anders</option>
                        </select>
                    </div>
                    <br />
                    <br />
                    <label>Email*</label>
                    <br />
                    <input className='btn bg-light border-dark text-dark' placeholder='Email*' type='email' value={email} onChange={emailHandler} />
                    <br />
                    <br />
                    <label>Geboortedatum*</label>
                    <br />
                    <input className='btn bg-light border-dark text-dark' type='date' placeholder='geboortedatum' max={'2005-01-20'} value={geboorteDatum} onChange={geboorteDHandler} />
                    <br />
                    <br />
                    <label>Adres*</label>
                    <br />
                    <input className='btn bg-light border-dark text-dark' placeholder='Adres' value={adres} onChange={adresHandler} />
                    <br />
                    <br />
                    <label>Telelefoonnummer*</label>
                    <br />
                    <input className='btn bg-light border-dark text-dark' placeholder='0612345678' type='tel' pattern='[0]{1}[6]{1}[0-9]{4}[0-9]{4}' value={telefoonnummer} onChange={telefoonnummerHandler} />
                    <br />
                    <br />
                    <label>Nieuwsbrief*</label>
                    <br />
                    <div className='btn-group'>
                        <select className='form-select dropdown-icon-dark bg-light border-dark text-dark' placeholder='Kies een groep' required>
                            <option id="groep-invoer" onClick={() => setemailVoorkeur('geen')}>Geen</option>
                            <option id="groep-invoer" onClick={() => setemailVoorkeur('nieuws')}>Nieuws</option>
                            <option id="groep-invoer" onClick={() => setemailVoorkeur('belangrijk')}>Belangrijk</option>
                        </select>
                    </div>
                    <br />
                    <br />
                    <label>GroepId</label>
                    <br />
                    <input className='btn bg-light border-dark text-dark' type='input' value={artiestenGroepId} onChange={artiestenGroepHandler} />
                    <br />
                    <br />
                    <button className='btn btn-secondary ' onClick={voegArtiest}>Aanmaken</button>
                </form>
            </div>
        );
    }
}