import React, { useState, useEffect, useCallback } from 'react';

export function Zaal(props) {

    const [error, setError] = useState(null);
    let content = 'nothing';

    //get states
    const [zalen, setZaal] = useState([]);

    //post states
    const [groepsNaam, setGroepsNaam] = useState('');
    const [email, setEmail] = useState('');

    //input handlers
    function groepsNaamHandler(e) {
        setGroepsNaam(e.target.value);
    }

    function emailHandler(e) {
        setEmail(e.target.value);
    }

    const getZalen = useCallback(async function () {
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
        } catch (error) {
            setError(error.message);
        }
    }, []);

    async function voegZaal() {
        let zaal = {
            groepsNaam: groepsNaam,
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

    useEffect(() => {
        getZalen();
    }, [getZalen]);

    function submitHandler(event) {
        event.preventDefault();
        setGroepsNaam('');
        setEmail('');
    }

    if (props.getEntry == 'GetZalen' && zalen.length > 0) {
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

    if (props.getEntry == 'GetZalen') {
        return (
            <div>
                <table className="table table-bordered table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope='col'>
                                ID
                            </th>
                            <th scope='col'>
                                Type
                            </th>
                            <th scope='col'>
                                Geboekte Optredens
                            </th>
                            <th scope='col'>
                                Aantal Stoelen
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


    if (props.postEntry == "PostZaal") {
        return (
            <div>
                <form onSubmit={submitHandler}>
                    <br />
                    <label>Zaal aanmaken</label>
                    <br />
                    <br />
                    <input placeholder='Grootte' type='number' min={30} max={400} required />
                    <br />
                    <br />
                    <button onClick={voegZaal}>Aanmaken</button>
                </form>
            </div>
        );
    }
}