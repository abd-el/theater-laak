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

    //const [items, setItems] = useState([]);
    const [Voorstellingen, setV] = useState([]);
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
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        getVoorstellingen();
    }, [getVoorstellingen]);

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
                <button id='week' onClick={getVoorstellingen}>Week</button>
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
                        {!isLoading && Voorstellingen.length > 0 && Voorstellingen.map((Voorstelling) => (
                            <tr>
                                <td className="afbeelding"><img src={Voorstelling.Afbeelding}
                                    alt='voorstellingsafbeelding'
                                    width='150'
                                    height='200'
                                />
                                </td>
                                <td className="titel">
                                    {Voorstelling.titel}
                                </td>
                                <td className="dag-datum">
                                    Vandaag
                                </td>
                                <td className="tijdstip">
                                    {Voorstelling.beschrijving}
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

