import React, { useState, useEffect, useCallback } from 'react';

export function Zaal(props) {

    const [error, setError] = useState(null);
    let content = 'nothing';
    let reactie = '';

    //get states
    const [zalen, setZaal] = useState([]);

    //post states
    const [aantalR1stoelen, setR1stoelen] = useState('');
    const [aantalR2stoelen, setR2stoelen] = useState('');
    const [aantalR3stoelen, setR3stoelen] = useState('');
    const [aantalR1rijen, setR1rijen] = useState('');
    const [aantalR2rijen, setR2rijen] = useState('');
    const [aantalR3rijen, setR3rijen] = useState('');

    const [res, setRes] = useState(null);

    const getZalen = useCallback(async function () {
        setError(null);
        try {
            const response = await fetch('/api/zaal/GetZalen', {
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
            rangEenAantalStoelen: aantalR1stoelen,
            rangEenAantalRijen: aantalR1rijen,
            rangTweeAantalStoelen: aantalR2stoelen,
            rangTweeAantalRijen: aantalR2rijen,
            rangDrieAantalStoelen: aantalR3stoelen,
            rangDrieAantalRijen: aantalR3rijen
        };

        const response = await fetch('/api/zaal/AddZaal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authState')).token
            },
            body: JSON.stringify(zaal)
        });

        if (!response.ok) {
            setRes(false);
            throw new Error('Er is iets fout gegaan!');
        }
        setRes(true);
        console.log(response);
    }

    useEffect(() => {
        getZalen();
    }, [getZalen, res]);

    console.log(zalen);

    function submitHandler(event) {
        event.preventDefault();
        setR1stoelen('');
        setR2stoelen('');
        setR3stoelen('');
        setR1rijen('');
        setR2rijen('');
        setR3rijen('');
    }

    if (props.getEntry == 'GetZalen' && zalen.length > 0) {
        content = zalen.map((list) => (
            <tr>
                <td className="Id">
                    {list.zaalId}
                </td>
                <td className="ingeplandOptredens">
                    {list.stoelen.length}
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
                    <label className='fs-5 fw-bold text-info'>Zaal aanmaken</label>
                    <br />
                    <br />
                    <label>Aantal Rang 1 stoelen (max. 200)*</label>
                    <br />
                    <input name='rang1Stoelen' type='number' min='0' max='200' className='btn bg-light border-dark text-dark' value={aantalR1stoelen} onChange={(e) => setR1stoelen(e.target.value)} required />
                    <br />
                    <br />
                    <label>Aantal Rang 2 stoelen (max. 200)*</label>
                    <br />
                    <input name='rang2Stoelen' type='number' min='0' max='200' className='btn bg-light border-dark text-dark' value={aantalR2stoelen} onChange={(e) => setR2stoelen(e.target.value)} required />
                    <br />
                    <br />
                    <label>Aantal Rang 3 stoelen (max. 200)*</label>
                    <br />
                    <input name='rang3Stoelen' type='number' min='0' max='200' className='btn bg-light border-dark text-dark' value={aantalR3stoelen} onChange={(e) => setR3stoelen(e.target.value)} required />
                    <br />
                    <br />
                    <label>Aantal Rang 1 rijen (max. 10)*</label>
                    <br />
                    <input name='rang1Rijen' type='number' min='0' max='10' className='btn bg-light border-dark text-dark' value={aantalR1rijen} onChange={(e) => setR1rijen(e.target.value)} required />
                    <br />
                    <br />
                    <label>Aantal Rang 2 rijen (max. 10)*</label>
                    <br />
                    <input name='rang2Rijen' type='number' min='0' max='10' className='btn bg-light border-dark text-dark' value={aantalR2rijen} onChange={(e) => setR2rijen(e.target.value)} required />
                    <br />
                    <br />
                    <label>Aantal Rang 3 rijen (max. 10)*</label>
                    <br />
                    <input name='rang3Rijen' type='number' min='0' max='10' className='btn bg-light border-dark text-dark' value={aantalR3rijen} onChange={(e) => setR3rijen(e.target.value)} required />
                    <br />
                    <br />
                    <button name='zaalAanmaken' className='btn btn-secondary' onClick={voegZaal}>Aanmaken</button>
                    <br />
                    {res == true && <label className='text-success'>Zaal is succesvol aangemaakt!</label>}
                    {res == false && <label className='text-danger'>Er is iets fout gegaan!</label>}
                </form>
            </div>
        );
    }
}