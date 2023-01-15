import React, { Component }  from 'react';
import '../../custom.css'
import Modal from 'bootstrap' // <-- ⚠️ zonder deze import werkt het niet ⚠️

export class VeranderWachtwoordModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            huidigeWachtwoord: '',
            wachtwoord: '',
            wachtwoordHerhaal: '',

            resultaat: '',
            resultaatSuccess: undefined
        };
    }

    veranderHuidigeWachtwoord = (e) => { this.setState({ huidigeWachtwoord: e.target.value }); }
    veranderWachtwoord = (e) => { this.setState({ wachtwoord: e.target.value }); }
    veranderWachtwoordHerhaal = (e) => { this.setState({ wachtwoordHerhaal: e.target.value }); }

    controleerWachtwoord = async () => {
        if (this.state.huidigeWachtwoord === '') {
            this.setState({
                resultaat: 'Je wachtwoord is verkeerd.',
                resultaatSuccess: false
            });

            return false;
        }

        if (this.state.wachtwoord !== this.state.wachtwoordHerhaal) {
            this.setState({
                resultaat: 'Wachtwoorden komen niet overeen.',
                resultaatSuccess: false
            });

            return false;
        }

        // minstens 1 hoofdletter
        // minstens 1 kleine letter
        // minstens 1 cijfer
        // minstens 1 speciaal karakter

        if (
            this.state.wachtwoord.length < 8
            || !/[A-Z]/.test(this.state.wachtwoord)
            || !/[a-z]/.test(this.state.wachtwoord)
            || !/[0-9]/.test(this.state.wachtwoord)
            || !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(this.state.wachtwoord)
        ){
            this.setState({
                resultaat: 'Wachtwoord moet minstens 8 karakters lang zijn en 1 hoofdletter, 1 kleine letter, 1 cijfer en 1 speciaal karakter bevatten.',
                resultaatSuccess: false
            });

            return false;
        }

        // hier zou een POST request naar de server moeten gaan om het wachtwoord te veranderen
        // en de response van de server moet hieronder worden verwerkt in state.resultaat en state.resultaatSuccess
        // maar nu hebben we nog geen backend dus doen we het even zo

        var storage = JSON.parse(localStorage.getItem('authState'));

        let res = await fetch('api/account/UpdateWachtwoord', {
            method: 'PUT',
            headers: {
                'Authorization' : 'Bearer ' + storage.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                huidigeWachtwoord: this.state.huidigeWachtwoord,
                nieuwWachtwoord: this.state.wachtwoord
            })
        })
        .then(response => response.json())
        .catch(err => console.warn(`caught error: ${err}`));

        if (!res) {
            this.setState({
                resultaat: 'Er is iets misgegaan. Probeer het later opnieuw.',
                resultaatSuccess: false
            });
        } else {
            this.setState({
                resultaat: res.resultaat || 'Er is iets misgegaan. Probeer het later opnieuw.',
                resultaatSuccess: res.succes || false
            });
        }

        return true;
    }

    render() {
        return (
            <>
                <button type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#veranderWachtwoordModal">
                    Verander wachtwoord
                </button>
                
                <div className="modal fade" id="veranderWachtwoordModal" 
                    data-bs-backdrop="static" 
                    data-bs-keyboard="false" 
                    tabIndex="-1" 
                    aria-labelledby="veranderWachtwoordModalLabel"
                    aria-hidden="true">

                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="veranderWachtwoordModalLabel">Verander wachtwoord</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <div>
                                    Verander je wachtwoord.
                                </div>

                                <div className='mt-3'>
                                    <label htmlFor="huidigeWachtwoord">Huidige wachtwoord</label>
                                    <input type="password" className="form-control text-white" id="huidigeWachtwoord" placeholder="Huidige wachtwoord" value={this.state.huidigeWachtwoord} onChange={this.veranderHuidigeWachtwoord} />
                                </div>

                                <div className='mt-3'>
                                    <label htmlFor="wachtwoord">Nieuw wachtwoord</label>
                                    <input type="password" className="form-control text-white" id="wachtwoord" placeholder="Wachtwoord" value={this.state.wachtwoord} onChange={this.veranderWachtwoord} />
                                </div>

                                <div className='mt-3'>
                                    <label htmlFor="wachtwoordHerhaal">Herhaal wachtwoord</label>
                                    <input type="password" className="form-control text-white" id="wachtwoordHerhaal" placeholder="Herhaal wachtwoord" value={this.state.wachtwoordHerhaal} onChange={this.veranderWachtwoordHerhaal} />
                                </div>

                                <div id="resultaat" className={`h6 mt-3 ${this.state.resultaat=='' ? `d-none` : ''} ${this.state.resultaatSuccess ? 'licht-groen' : 'licht-rood'}`}>
                                    {this.state.resultaat}
                                </div>
                            </div>
                        </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Sluit</button>
                                <button type="button" className="btn btn-primary" onClick={this.controleerWachtwoord}>Bevestig</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}