import React, { Component } from "react";
import '../layout/stylesheet.css';
import Modal from 'bootstrap'

export class MaakVoorstellingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            afbeeldingUrl: '',
            titel: '',
            beschrijving: '',
            tijdsduurInMinuten: 0,

            resultaat: '',
            resultaatSuccess: false
        }
    }

    veranderTitel = (e) => { this.setState({ titel: e.target.value }); }
    veranderAfbeeldingUrl = (e) => { this.setState({ afbeeldingUrl: e.target.value }); }
    veranderBeschrijving = (e) => { this.setState({ beschrijving: e.target.value }); }
    veranderTijdsduurInMinuten = (e) => { this.setState({ tijdsduurInMinuten: e.target.value }); }

    voegToe = async () => {
        if (this.state.afbeeldingUrl == ''){
            this.setState({
                resultaat: 'Geef een afbeelding url op.',
                resultaatSuccess: false
            })

            return;
        }

        if (this.state.titel == ''){
            this.setState({
                resultaat: 'Geef een titel op.',
                resultaatSuccess: false
            })

            return;
        }

        if (this.state.beschrijving == ''){
            this.setState({
                resultaat: 'Geef een beschrijving op.',
                resultaatSuccess: false
            })
        }

        if (isNaN(this.state.tijdsduurInMinuten) || this.state.tijdsduurInMinuten < 15 || this.state.tijdsduurInMinuten > 180 || this.state.tijdsduurInMinuten % 1 != 0){
            this.setState({
                resultaat: 'Tijdsduur moet een heel getal tussen 15 en 180 zijn',
                resultaatSuccess: false
            })
        }

        let res = await fetch('/api/Programmering/Voorstelling', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authState')).token
            },
            body: JSON.stringify({
                titel: this.state.titel,
                afbeelding: this.state.afbeeldingUrl,
                beschrijving: this.state.beschrijving,
                tijdsduurInMinuten: this.state.tijdsduurInMinuten
            })
        })
        .then(res => res.json())
        .catch(error => console.warn(`caught error: ${error}`));

        if (res){
            this.setState({
                resultaat: res.bericht,
                resultaatSuccess: res.success
            })
        } else {
            this.setState({
                resultaat: 'Er is iets misgegaan, probeer het later opnieuw.',
                resultaatSuccess: false
            })
        }
    }

    render() {
        return (            
            <div>
                <div className="groepsnaam btn btn-secondary mt-3" data-bs-toggle="modal" data-bs-target={`#MaakVoorstellingModal`}>
                    Maak voorstelling aan 
                </div>
                
                <div className="modal fade" id={`MaakVoorstellingModal`}
                    data-bs-backdrop="static" 
                    data-bs-keyboard="false" 
                    tabIndex="-1" 
                    aria-labelledby={`MaakVoorstellingModalLabel`}
                    aria-hidden="true">

                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`MaakVoorstellingModalLabel`}>Maak een voorstelling</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <div className='mb-2'>
                                    <div>Titel*</div>
                                    <input onChange={this.veranderTitel} className='form-control text-white' placeholder='Geef een titel op'></input>
                                </div>

                                <div className='mb-2'>
                                    <div>Beschrijving*</div>
                                    <input onChange={this.veranderBeschrijving} className='form-control text-white' placeholder='Geef een beschrijving op'></input>
                                </div>

                                <div className='mb-2'>
                                    <div>Tijdsduur in minuten*</div>
                                    <input type="number" onChange={this.veranderTijdsduurInMinuten} className='form-control text-white w-45 d-inline' placeholder='Tussen 15 en 180 min'></input>
                                    <span className="ms-2">minuten</span>
                                </div>
                                
                                <div className='mb-2'>
                                    <div>URL van de Afbeelding*</div>
                                    <input onChange={this.veranderAfbeeldingUrl} className='form-control text-white' placeholder='https://voorbeeld.com/plaatje.png'></input>
                                </div>
                            </div>

                            <div id="groeps-verandering-resultaat" className={`h6 mt-3 ${this.state.resultaat=='' ? `d-none` : ''} ${this.state.resultaatSuccess ? 'licht-groen' : 'licht-rood'}`}>
                                {this.state.resultaat}
                            </div>
                        </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-light" onClick={this.voegToe}>Maak aan</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Sluit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}