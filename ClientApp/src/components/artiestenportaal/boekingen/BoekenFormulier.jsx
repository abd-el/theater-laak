import React, { Component }  from 'react';
import '../layout/stylesheet.css';
import '../../../custom.css';
import { MaakVoorstellingModal } from './MaakVoorstellingModal';

export class BoekenFormulier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resultaat: '',
            resultaatSuccess: null,

            voorstellingId: 0,
            groep: 0,
            zaal: 0,
            prijs: 0,
            datum: null,
            tijdstip: null,
        };
    }

    veranderGroep = (e) => { this.setState({ groep: e.target.value }); }
    veranderZaal = (e) => { this.setState({ zaal: e.target.value }); }
    veranderDatum = (e) => { this.setState({ datum: e.target.value }); }
    veranderTijdstip = (e) => { this.setState({ tijdstip: e.target.value }); }
    veranderVoorstellingId = (e) => { this.setState({ voorstellingId: e.target.value }); }
    veranderPrijs = (e) => { this.setState({ prijs: e.target.value }); }

    valideerPrijs = (prijs) => {
        // min 1
        // max 30
        // max 2 decimalen
        prijs = parseFloat(prijs);
        return !(isNaN(prijs) || prijs < 1 || prijs > 30 || prijs.toString().split('.')?.[1]?.length > 2);
    }

    valideerVoorstelling = (voorstellingId) => {
        return !(voorstellingId < 0 || isNaN(voorstellingId));
    }

    valideerZaal = (zaal) => {
        return !(zaal === 0 || !zaal);
    }

    valideerTijdstip = (tijdstip) => {
        // we gaan uit van openingsuren van 8:00 tot 23:00
        // controleer of het uur begint met ([8-9]|0[8-9]|1[0-9]|2[0-3]) d.w.z 8-9 of 08-09 of 10-19 of 20-23
        // gevolgd door een : en dan ([0-5][0-9]) d.w.z 00-59
        let tijdstipRegex = new RegExp('^([8-9]|0[8-9]|1[0-9]|2[0-3]):([0-5][0-9])$');

        return tijdstipRegex.test(tijdstip);
    };

    valideerDatum = (datum) => {
        // controleer of de datum niet vandaag is of in het verleden ligt
        let datumArray = datum.split('-');
        console.log(datumArray)
        let datumObject = new Date(datumArray[0], datumArray[1] - 1, datumArray[2]);
        let vandaag = new Date();
        console.log(datumObject, vandaag)
        if(datumObject <= vandaag){
            return false;
        }

        return true;
    }

    controleer = async () => {
        if (!this.valideerVoorstelling(this.state.voorstellingId)) {
            this.setState({
                resultaat: 'Voorstelling is verplicht',
                resultaatSuccess: false
            });

            return false;
        }

        if (!this.valideerZaal(this.state.zaal)) {
            this.setState({
                resultaat: 'Zaal is verplicht',
                resultaatSuccess: false
            });
            return false;
        }

        if (!this.valideerDatum(this.state.datum)) {
            this.setState({
                resultaat: 'Datum is verplicht met het formaat dd-mm-jjjj en moet minimaal morgen zijn',
                resultaatSuccess: false
            });
            return false;
        }

        if (!this.valideerTijdstip(this.state.tijdstip)) {
            this.setState({
                resultaat: 'Het tijdstip is verplicht met het formaat XX:XX, tussen 08:00 en 23:00',
                resultaatSuccess: false
            });
            return false;
        }

        if (!this.valideerPrijs(this.state.prijs)) {
            this.setState({
                resultaat: 'De prijs is verplicht en moet tussen 1 en 30 euro liggen met maximaal 2 decimalen',
                resultaatSuccess: false
            });
            return false;
        }

        // maak hier een POST request naar de server
        let res = await fetch('/api/artiestenportaal/MaakBoeking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authState')).token
            },
            body: JSON.stringify({
                voorstellingId: this.state.voorstellingId,
                zaalId: this.state.zaal,
                datum: this.state.datum,
                tijdstip: this.state.tijdstip,
                groep: this.state.groep,
                prijs: this.state.prijs 
            })
        })
        .then(res => res.json())
        .catch(err => console.log(err));

        if (res) {
            this.setState({
                resultaat: res.bericht,
                resultaatSuccess: res.success
            });
        } else {
            this.setState({
                resultaat: 'Er is iets misgegaan',
                resultaatSuccess: false
            })
        }

        return true;
    }

    render() {
        console.log(this.props)

        return (
            // er is al container en row dus je hoeft alleen col-X nog te doen
            <div className='col-sm-5 text-white d-inline ms-4'>
                <div className='d-inline kop-text'>
                    Zaal boeken
                </div>

                <div className='mb-2'>
                    <div>Voorstelling*</div>
                    <select onChange={this.veranderVoorstellingId} className='form-select dropdown-icon bg-dark border-grey text-white' placeholder='Kies een voorstelling'>
                        <option id="voorstelling-invoer" value="0">Geen</option>
                        {this.props.voorstellingen.map((voorstelling, index) => {
                            return <option id="voorstelling-invoer" key={index} value={voorstelling.voorstellingId}>{voorstelling.titel}</option>
                        })}
                    </select>
                </div>

                <div className='mb-2'>
                    <div>Groep</div>
                    <select onChange={this.veranderGroep} className='form-select dropdown-icon bg-dark border-grey text-white' placeholder='Kies een groep'>
                        <option id="groep-invoer" value="0">Geen</option>
                        {this.props.groepen.map((groep, index) => {
                            if(groep.isClientLid === true){
                                return <option id="groep-invoer" key={index} value={groep.groepsId}>{groep.naam}</option>
                            }
                        })}
                    </select>
                </div>

                <div className='mb-2'>
                    <div>Zaal*</div>
                    <select onChange={this.veranderZaal} className='form-select dropdown-icon bg-dark border-grey text-white'>
                        <option id="zaal-invoer" value="geen">Kies een zaal</option>
                        {this.props.zalen.map((zaal, index) => {
                            return <option id="zaal-invoer" key={index} value={zaal.zaalId}>{zaal.zaalId}</option>
                        })}
                    </select>
                </div>

                <div>
                    <div className='mb-2 d-inline-block w-60'>
                        <div>Datum*</div>
                        <input type="date" onChange={this.veranderDatum} id="datum-invoer" className='form-control text-white' placeholder='dd-mm-jjjj'></input>
                    </div>

                    <div className='mb-2 d-inline-block ms-2 w-38'>
                        <div>Tijdstip*</div>
                        <input type="time" onChange={this.veranderTijdstip} id="tijdstip-invoer" className='form-control text-white' placeholder='XX:XX'></input>
                    </div>
                </div>

                <div className='mb-1'>
                    <div>Prijs</div>

                    <div>
                        <h2 className='vertical-align-sub d-inline-block w-7'>€</h2>
                        <input type="number" onChange={this.veranderPrijs} id="prijs-invoer" className='form-control d-inline-block w-93 text-white' placeholder='Max. 2 getallen achter de komma'></input>
                    </div>
                </div>

                <button onClick={this.controleer} id="Maak-verzoek-button" className="btn btn-light mt-3">
                    Maak een verzoek voor een reservering
                </button>

                <MaakVoorstellingModal />

                <div id="resultaat" className={`h6 mt-3 ${this.state.resultaat=='' ? `d-none` : ''} ${this.state.resultaatSuccess ? 'licht-groen' : 'licht-rood'}`}>
                    {this.state.resultaat}
                </div>
            </div>
        )
    }
}