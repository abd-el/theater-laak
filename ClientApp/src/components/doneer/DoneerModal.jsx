import React, { Component }  from 'react';
import '../../custom.css'
import { getalNaarEuro } from './getalNaarEuro';
import Modal from 'bootstrap' // <-- ⚠️ zonder deze import werkt het niet ⚠️

export class DoneerModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            huidigBedrag: '',
            bericht: '',
            
            resultaat: '',
            resultaatSuccess: undefined
        };
    }

    veranderHuidigBedrag = (e) => { this.setState({ huidigBedrag: e.target.value }); }
    veranderBericht = (e) => { this.setState({ bericht: e.target.value }); }

    doneer = async () => {
        let res = await fetch('/api/donatie/MaakDonatie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bericht: String(this.state.bericht),
                hoeveelheid: String(this.state.huidigBedrag),
                token: this.state.token
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

        this.doneer();
    }

    render() {
        return (
            <>
                <button type="button" id="doneer-knop" className="btn btn-light btn-lg mt-4 display-inline me-3" data-bs-toggle="modal" data-bs-target="#doneerModal">
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

                                <div id="resultaat" className={`h6 mt-3 ${this.state.resultaatSuccess === true && 'licht-groen' || this.state.resultaatSuccess === false && 'licht-rood' || ''}`}>
                                    {this.state.resultaat}
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