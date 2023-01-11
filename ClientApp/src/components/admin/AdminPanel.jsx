import React, { useState, useEffect, useCallback } from 'react';

export function AdminPanel() {

    const [enteredName, setName] = useState('');
    const [enteredDatum, setDatum] = useState('');
    const [medewerkers, setM] = useState([]);
    const [Optredens, setO] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getMedewerkers = useCallback(async function () {
        //event.preventDefault();
        setIsLoading(true);
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
            console.log(data);

        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }, []);

    const getOptredens = useCallback(async function () {
        //event.preventDefault();
        //setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://localhost:44461/api/Programmering/Optredens');

            if (!response.ok) {
                throw new Error('Er is iets fout gegaan!');
            }

            const data = await response.json();

            setO(data);
            //console.log(data);
        } catch (error) {
            setError(error.message);
        }
        //setIsLoading(false);
    }, []);

    useEffect(() => {
        getOptredens();
        getMedewerkers();
    }, [getMedewerkers, getOptredens]);

    function update() {
        getMedewerkers();
    }
    let content = <p>nothing</p>;
    if (error) {
        content = <tr><td>{error}</td></tr>;
    }

    console.log(medewerkers);
    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <label>Dashboard</label>
            <br />
            <button onClick={update}>Update</button>
            <br />
            {content}
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
                        {medewerkers.map((list) => {
                            <tr>
                                <td className="Id">
                                    {list.Id}
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
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}