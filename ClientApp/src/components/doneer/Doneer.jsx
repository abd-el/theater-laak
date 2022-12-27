import React, { useEffect }  from 'react';
import Theater from '../images/Theater.png';
import { useState } from 'react';
import { DoneerModal } from './DoneerModal';
import { getalNaarEuro } from './getalNaarEuro';
import {BrowserRouter as Router, Link} from 'react-router-dom';

export function Doneer()
{
    const [gedoneerdDitJaar, setGedoneerdDitJaar] = useState(0);
    const [gedoneerdAltijd, setGedoneerdAltijd] = useState(0);

    // if gedoneerdDitJaar >= 1000 -> enable donateursportaal button

    useEffect(() => {
        // get gedoneerdDitJaar
        if (gedoneerdDitJaar >= 1000) {
            // enable donateursportaal button
            document.getElementById("donateursportaal-knop").classList.remove("disabled");
        } else {
            // disable donateursportaal button
            document.getElementById("donateursportaal-knop").classList.add("disabled");
        }
    }, []);  // <-- empty dependency array

    return (
        <div className="container mt-3 text-white">
            <br />
            <br />
            <br />
            <br />
            
            <figure className="position-relative">
                <img alt="Plaatje van een " src={Theater} className="img-fluid">
                </img>
                <figcaption className='text-inside-image'>
                    <div className="display-3">
                        Steun ons
                    </div>
                    <div className="mt-3">
                        Steun ons door een donatie te doen.
                        <br />
                        Wij zijn een lokaal theater zonder winstoogmerk en kunnen uw steun goed gebruiken.
                        <br />
                        Begunstigers kunnen ook genieten van een aantal voordelen, hieronder te lezen.
                    </div>
                </figcaption>
            </figure>
            
            <div className=''>
                <div>
                    <h2 className="mt-3">Begunstigers</h2>
                </div>

                <div id="begunstigers-informatie" className='mt-3'>
                    Begunstigers krijgen een aantal voordelen, namelijk:
                    <ul>
                        <br />
                        <li>Toegang tot het begunstigersportaal</li>
                        <li>Exclusieve programmering</li>
                        <li>Met bijbehorende voorstellingen</li>
                        <li>Vervroegd toegang tot kaartverkoop</li>
                    </ul>
                </div>

                <div>
                    U bent begunstiger vanaf € 1000,- per jaar.
                </div>

                <div>
                    <div className='mt-4'>U heeft dit jaar: </div>
                    <div className='rounded bg-white text-black title h1 d-inline'>
                        {getalNaarEuro(gedoneerdDitJaar)} gedoneerd
                    </div>

                    <div className='mt-4'>U heeft in totaal: </div>
                    <div className='rounded bg-white text-black title h1 d-inline'>
                        {getalNaarEuro(gedoneerdAltijd)} gedoneerd
                    </div>
                </div>

                <DoneerModal />

                <button id="donateursportaal-knop" className="btn btn-lg disabled btn-dark mt-4 me-3">
                    Naar donateursportaal
                </button>

                <a href={`https://ikdoneer.azurewebsites.net//Toegang?url=https://localhost:7209/api/Donatie/Authoriseer`}>
                    <button id="donateursportaal-knop" className="btn btn-lg btn-dark mt-4">
                        Verleen toegang tot jouw IkDoneer.nl account aan Theater Laak
                    </button>
                </a>
            </div>
        </div>
    );
}