import React, { useState, useEffect, useCallback } from 'react';

export function Donateur(props) {

    const [error, setError] = useState(null);
    let content = 'nothing';

    //get states
    const [donateurs, setDonateurs] = useState([]);

    const getDonateurs = useCallback(async function () {
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

            setDonateurs(data);
        } catch (error) {
            setError(error.message);
        }
    }, []);

    useEffect(() => {
        getDonateurs();
    }, [getDonateurs]);

    if(!donateurs.length > 0){
        content = "Geen donateur gevonden met meer dan 999 euro gedoneerd."
    }

    if (props.getEntry == 'GetDonateurs' && donateurs.length > 0) {
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
                <td className="Totaal Gedoneerd">
                    {list.donaties.length}
                </td>
            </tr>
        ));
    }

    if (props.getEntry == 'GetDonateurs') {
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
                                Gedoneerd
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
}