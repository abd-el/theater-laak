import React, { Component }  from 'react';
import '../../custom.css'
import { getalNaarEuro } from './getalNaarEuro';
import Modal from 'bootstrap' // <-- ⚠️ zonder deze import werkt het niet ⚠️
import { AuthContext } from '../context/AuthContext'; // <-- ⚠️ zonder deze import werkt het ophalen van token niet ⚠️

export class DoneerModal extends Component {
    static contextType = AuthContext; // <-- ⚠️ zonder deze import werkt het ophalen van token niet ⚠️

    constructor(props) {
        super(props);
        this.state = {
            huidigBedrag: '',
            bericht: '',
            anoniem: true,
            
            resultaat: '',
            resultaatSuccess: undefined,
            
            ingelogd: false
        };
    }

    veranderHuidigBedrag = (e) => { this.setState({ huidigBedrag: e.target.value }); }
    veranderBericht = (e) => { this.setState({ bericht: e.target.value }); }
    veranderAnoniem = (e) => { this.setState({ anoniem: e.target.checked }); }

    geklikt = async () => {
        const { authState } = this.context;

        console.log(authState)

        if (authState != null) {
            this.setState({ ingelogd: true });
        } else {
            this.setState({ ingelogd : false })
        }

        console.log("this.state.ingelogd: " + this.state.ingelogd)
    }

    doneer = async () => {
        const { authState } = this.context;
        console.log(authState)

        const token = authState ? authState.token : null;

        let res = await fetch('/api/donatie/MaakDonatie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +  token
            },
            body: JSON.stringify({
                bericht: String(this.state.bericht),
                hoeveelheid: String(this.state.huidigBedrag),
                token: this.state.token,
                anoniem: this.state.anoniem
            })
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error));

        if(!res || !res.success) {
            this.setState({
                resultaat: res?.resultaat || 'Er is iets fout gegaan!',
                resultaatSuccess: res?.success || false
            });
        } else {
            this.setState({
                resultaat: res.resultaat,
                resultaatSuccess: res.success,
            });
        }
    }

    controleerBedrag = () => {
        if (this.state.huidigBedrag === '') {
            this.setState({ resultaat: 'Voer een bedrag in!', resultaatSuccess: false });

            return false;
        }

        if (isNaN(this.state.huidigBedrag)) {
            this.setState({ resultaat: 'Voer een geldig bedrag in!', resultaatSuccess: false });

            return false;
        }

        if (this.state.huidigBedrag < 0) {
            this.setState({ resultaat: 'Voer een positief bedrag in!', resultaatSuccess: false });
        
            return false;
        }

        // check if this.state.huidigBedrag is not int
        if (this.state.huidigBedrag % 1 !== 0) {
            this.setState({ resultaat: 'Voer een geheel getal in!', resultaatSuccess: false });

            return false;
        }

        this.doneer();
    }

    render() {
        return (
            <>
                <button onClick={this.geklikt} type="button" id="doneer-knop" className="btn btn-light btn-lg mt-4 display-inline me-3" data-bs-toggle="modal" data-bs-target="#doneerModal">
                    Doneer
                </button>
                
                <div className="modal fade" id="doneerModal" 
                    data-bs-backdrop="static" 
                    data-bs-keyboard="false" 
                    tabIndex="-1" 
                    aria-labelledby="doneerModalLabel"
                    aria-hidden="true">

                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="doneerModalLabel">Steun ons</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <div className='mt-3'>
                                    <label htmlFor="doneerBedrag">Doneer bedrag:</label>
                                    <div>
                                        <span className='d-inline h2 me-2' style={ {"verticalAlign": "sub"} }>€ </span>
                                        <input type="number" min="0" className="d-inline w-75 form-control text-white" id="doneerBedrag" placeholder="Bedrag in euro's.." value={this.state.huidigBedrag} onChange={this.veranderHuidigBedrag} />
                                    </div>

                                    <label htmlFor="plaatsBericht">Plaats een bericht (optioneel):</label>
                                    <input className="d-inline form-control text-white" id="plaatsBericht" placeholder="Plaats een bericht.." value={this.state.bericht} onChange={this.veranderBericht} />
                                </div>

                                <div id="doneer-resultaat" className={`h6 mt-3 ${this.state.resultaat=='' ? `d-none` : ''}  ${this.state.resultaatSuccess ? 'licht-groen' : 'licht-rood'}`}>
                                    {this.state.resultaat}
                                </div>

                                <div>
                                    <input checked={!this.state.ingelogd || this.state.anoniem} onChange={this.veranderAnoniem} disabled={!this.state.ingelogd} className="form-check-input" type="checkbox" value="" id="doneerAnoniem" />
                                    <label className="form-check-label ms-2" htmlFor="doneerAnoniem">
                                        Doneer anoniem
                                    </label>
                                </div>
                            </div>
                        </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Sluit</button>
                                <button type="button" className="btn btn-primary" onClick={this.controleerBedrag}>Bevestig</button>
                            </div>
                        </div>                        
                    </div>
                </div>
            </>
        );
    }
}