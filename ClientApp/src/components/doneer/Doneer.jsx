import React, { Component }  from 'react';
import Theater from '../images/Theater.png';
import { DoneerModal } from './DoneerModal';
import { getalNaarEuro } from './getalNaarEuro';

export class Doneer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gedoneerdDitJaar: 0,
            gedoneerdAltijd: 0,
            geauthorizeerd: false
        };
    }

    componentDidMount() {
        // set geauthorizeerd to true if the token is there in cookies
        let token = document.cookie.split(';').find(c => c.trim().startsWith('token='));
        if (token) {
            this.setState({ geauthorizeerd: true });
        }
    }

    render() {
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
                            {getalNaarEuro(this.state.gedoneerdDitJaar)} gedoneerd
                        </div>

                        <div className='mt-4'>U heeft in totaal: </div>
                        <div className='rounded bg-white text-black title h1 d-inline'>
                            {getalNaarEuro(this.state.gedoneerdAltijd)} gedoneerd
                        </div>
                    </div>

                    <DoneerModal />

                    <button id="donateursportaal-knop" className={`btn btn-lg btn-dark mt-4 me-3 ${this.state.gedoneerdDitJaar > 1000 && '' || 'disabled'}`}>
                        Naar donateursportaal
                    </button>

                    <a href={`https://ikdoneer.azurewebsites.net/Toegang?url=https://localhost:7209/api/Donatie/Authoriseer`}>
                        <button id="donateursportaal-knop" className={`btn btn-lg btn-dark mt-4 ${this.state.geauthorizeerd && '' || 'disabled'}`}>
                            Verleen toegang tot jouw IkDoneer.nl account aan Theater Laak
                        </button>
                    </a>
                </div>
            </div>
        );
    }
}