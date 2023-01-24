import React, { useState, useEffect, useCallback } from 'react';

export function Groep(props) {

    const [error, setError] = useState(null);
    let content = 'nothing';

    //get states
    const [groepen, setGroepen] = useState([]);

    //post states
    const [groepsNaam, setGroepsNaam] = useState('');
    const [email, setEmail] = useState('');

    const [res, setRes] = useState(null);

    //input handlers
    function groepsNaamHandler(e) {
        setGroepsNaam(e.target.value);
    }

    function emailHandler(e) {
        setEmail(e.target.value);
    }

    const getGroepen = useCallback(async function () {
        setError(null);
        try {
            const response = await fetch('/api/artiestenportaal/GetGroepen', {
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
            setGroepen(data.groepData);
        } catch (error) {
            setError(error.message);
        }
    }, []);

    async function voegGroep() {
        let groep = {
            groepsNaam: groepsNaam,
            groepsEmail: email,
            artiesten: [],
            optredens: []
        };

        const response = await fetch('/api/Account/RegistreerGroep', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authState')).token
            },
            body: JSON.stringify(groep)
        });
        if (!response.ok) {
            setRes(false);
            throw new Error('Er is iets fout gegaan!');
        }
        setRes(true);
    }

    useEffect(() => {
        getGroepen();
    }, [getGroepen, res]);

    function submitHandler(event) {
        event.preventDefault();
        setGroepsNaam('');
        setEmail('');
    }

    if (props.getEntry == 'GetGroepen' && groepen.length > 0) {
        content = groepen.map((list) => (
            <tr>
                <td className="Id">
                    {list.id}
                </td>
                <td className="Naam">
                    {list.naam}
                </td>
                <td className="Email">
                    {list.email == '' && 'onbekend'}
                    {list.email}
                </td>
                <td className="artiesten">
                    {list.artiesten.length}
                </td>
            </tr>
        ));
    }

    if (props.getEntry == 'GetGroepen') {
        return (
            <div>
                <table className="table table-bordered table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope='col'>
                                ID
                            </th>
                            <th scope='col'>
                                Naam
                            </th>
                            <th scope='col'>
                                Email
                            </th>
                            <th scope='col'>
                                Aantal Leden
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


    if (props.postEntry == "PostGroep") {
        return (
            <div>
                <form onSubmit={submitHandler}>
                    <br />
                    <label className='fs-5 fw-bold text-info'>Groep aanmaken</label>
                    <br />
                    <br />
                    <label>Groepsnaam*</label>
                    <br />
                    <input name='groepsnaam' className='btn bg-light border-dark text-dark' value={groepsNaam} onChange={groepsNaamHandler} required />
                    <br />
                    <br />
                    <label>Email*</label>
                    <br />
                    <input name='email' className='btn bg-light border-dark text-dark' value={email} onChange={emailHandler} required />
                    <br />
                    <br />
                    <button name='groepAanmaken' className='btn btn-secondary' onClick={voegGroep}>Aanmaken</button>
                    <br />
                    {res == true && <label className='text-success'>Groep is succesvol aangemaakt!</label>}
                    {res == false && <label className='text-danger'>Er is iets fout gegaan!</label>}
                </form>
            </div>
        );
    }
}