import React  from 'react';
import ReactDOM from 'react-dom';
import { NavMenu } from './NavMenu';
import Theater from './images/Theater.png';

export function Doneer()
{
    return (
        <div className="container mt-3 text-white">
            <br />
            <br />
            <br />

            <figure className="position-relative">
                <img src={Theater} className="img-fluid">
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
                        € 0,- gedoneerd
                    </div>

                    <div className='mt-4'>U heeft in totaal: </div>
                    <div className='rounded bg-white text-black title h1 d-inline'>
                        € 0,- gedoneerd
                    </div>
                </div>

                <div id="doneer-knop" className="btn btn-light btn-lg mt-4 display-inline me-3">
                    Doneer
                </div>

                <div id="doneer-knop" className="btn btn-lg btn-dark mt-4">
                    Naar donateursportaal
                </div>
            </div>
        </div>
    );
}