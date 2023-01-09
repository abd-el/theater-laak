import './Programmering.css';
import { SearchBars } from './SearchBars';
import { VoorstellingLijst } from './VoorstellingList';
import { Voorstelling } from './Voorstelling';
import React, { useState, useEffect, useCallback } from 'react';

export function Programmering() {

    const Dummy_voorstellingen = [
        {
            VoorstellingId: 1,
            Afbeelding: 'https://imageio.forbes.com/specials-images/imageserve/61116cea2313e8bae55a536a/-Dune-/0x0.jpg?format=jpg&width=960',
            Titel: 'Voorbeeld 1',
            Beschrijving: 'Some text...',
            TijdsduurInMinuten: 120
        },

        {
            VoorstellingId: 2,
            Afbeelding: 'https://amc-theatres-res.cloudinary.com/image/upload/f_auto,fl_lossy,h_465,q_auto,w_310/v1667397461/amc-cdn/production/2/movies/53700/53699/PosterDynamic/145397.jpg',
            Titel: 'Voorbeeld 2',
            Beschrijving: 'Some text...',
            TijdsduurInMinuten: 60
        },

        {
            VoorstellingId: 3,
            Afbeelding: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Black_Adam_%28film%29_poster.jpg',
            Titel: 'Voorbeeld 3',
            Beschrijving: 'Some text...',
            TijdsduurInMinuten: 240
        },
    ]

    const weekdays = ['Zondag','Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
    const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];

    //const [items, setItems] = useState([]);
    const [Voorstellingen, setV] = useState([]);
    const [Optredens, setO] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getVoorstellingen = useCallback(async function () {
        //event.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://localhost:44461/api/Programmering/Voorstellingen');

            if (!response.ok) {
                throw new Error('Er is iets fout gegaan!');
            }

            const data = await response.json();

            setV(data);
            //console.log(data);

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
        getVoorstellingen();
    }, [getVoorstellingen, getOptredens]);

    const AangepasteArray = Optredens.map(item => {
        return {
            ...item,
            voorstelling: Voorstellingen
        }
    });

    console.log(AangepasteArray);

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className='inputs'>
                <input id='searchbar' placeholder='zoek voorstelling' />
                <input id='date' placeholder='kies een datum' type='date' />
            </div>
            <br />
            <div className='buttons'>
                <button id='day'>Dag</button>
                <button id='week' >Week</button>
                <button id='refresh' onClick={getVoorstellingen}>Voorstellingen Ophalen</button>
            </div>
            <br />
            <br />
            <br />
            <div>
                <table className="table table-bordered table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope='col'>
                                Afbeelding
                            </th>
                            <th scope='col'>
                                Titel
                            </th>
                            <th scope='col'>
                                Dag/Datum
                            </th>
                            <th scope='col'>
                                Tijdstip
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isLoading && Voorstellingen.length > 0 && AangepasteArray.map((Optreden) => (
                            <tr>
                                <td className="afbeelding"><img src={Optreden.voorstelling[0].afbeelding}
                                    alt='voorstellingsafbeelding'
                                    width='150'
                                    height='200'
                                />
                                </td>
                                <td className="titel">
                                    {Optreden.voorstelling[Optreden.voorstellingId-1].titel}
                                </td>
                                <td className="dag-datum">
                                    {weekdays[new Date(Optreden.datumTijdstip.split('T')[0]).getDay()]}
                                    <br />
                                    {new Date(Optreden.datumTijdstip.split('T')[0]).getDate()}&nbsp;
                                    {months[new Date(Optreden.datumTijdstip.split('T')[0]).getMonth()]}
                                </td>
                                <td className="tijdstip">
                                    {Optreden.datumTijdstip.split('T')[1].substring(0, 5)}
                                </td>
                            </tr>
                        ))}
                        {!isLoading && Voorstellingen.length === 0 && !error && <p>Geen Voorstellingen gevonden.</p>}
                        {!isLoading && error && <p>{error}</p>}
                        {isLoading && <p>Loading...</p>}

                    </tbody>
                </table>
            </div>
        </div>
    );
}

