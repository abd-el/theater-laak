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

            voorstelling: null,
            groep: 0,
            zaal: null,
            datum: null,
            tijdstip: null,
            eindTijdstip: null,
        };
    }

    veranderGroep = (e) => { this.setState({ groep: e.target.value }); }
    veranderZaal = (e) => { this.setState({ zaal: e.target.value }); }
    veranderDatum = (e) => { this.setState({ datum: e.target.value }); }
    veranderTijdstip = (e) => { this.setState({ tijdstip: e.target.value }); }
    veranderEindTijdstip = (e) => { this.setState({ eindTijdstip: e.target.value }); }
    veranderVoorstelling = (e) => { this.setState({ voorstelling: e.target.value }); }

    valideerVoorstelling = (voorstelling) => {
        return !(voorstelling === 0 || !voorstelling)
    }

    valideerZaal = (zaal) => {
        return !(zaal === 0 || !zaal);
    }

    tijdstippenVerschilInMinuten = (tijdstip1, tijdstip2) => {
        let tijdstip1Array = tijdstip1.split(':');
        let tijdstip2Array = tijdstip2.split(':');

        let tijdstip1Object = new Date(0, 0, 0, tijdstip1Array[0], tijdstip1Array[1], 0);
        let tijdstip2Object = new Date(0, 0, 0, tijdstip2Array[0], tijdstip2Array[1], 0);

        let verschil = tijdstip2Object - tijdstip1Object;
        let minuten = Math.floor(verschil / 1000 / 60);

        return minuten;
    }

    valideerTijdstip = (tijdstip) => {
        // we gaan uit van openingsuren van 8:00 tot 23:00
        // controleer of het uur begint met ([8-9]|0[8-9]|1[0-9]|2[0-3]) d.w.z 8-9 of 08-09 of 10-19 of 20-23
        // gevolgd door een : en dan ([0-5][0-9]) d.w.z 00-59
        let tijdstipRegex = new RegExp('^([8-9]|0[8-9]|1[0-9]|2[0-3]):([0-5][0-9])$');

        return tijdstipRegex.test(tijdstip);
    };

    valideerDatum = (datum) => {
        // controleer of het begint met ([1-9]|0[1-9]|[12][0-9]|3[01]) d.w.z 1-9 of 01-09 of 10-29 of 30 of 31
        // gevolgd door een - en dan ([1-9]|0[1-9]|1[012]) d.w.z 1-9 of 01-09 of 10-12
        // nog een keer gevolgd door een - en dan (202[2-9]) d.w.z 2022-2029
        let datumRegex = new RegExp('^([1-9]|0[1-9]|[12][0-9]|3[01])-([1-9]|0[1-9]|1[012])-(202[2-9])$');
        if(!datumRegex.test(datum)){
            return false;
        }

        // controleer of de datum niet vandaag is of in het verleden ligt
        let datumArray = datum.split('-');
        let datumObject = new Date(datumArray[2], datumArray[1] - 1, datumArray[0]);
        let vandaag = new Date();
        if(datumObject <= vandaag){
            return false;
        }

        return true;
    }

    controleer = async () => {
        if (!this.valideerVoorstelling(this.state.voorstelling)) {
            this.setState({
                resultaat: 'Zaal is verplicht',
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

        if (!this.valideerTijdstip(this.state.eindTijdstip)) {
            this.setState({
                resultaat: 'Het eind-tijdstip is verplicht met het formaat XX:XX, tussen 08:00 en 23:00',
                resultaatSuccess: false
            });
            return false;
        }

        let verschil = this.tijdstippenVerschilInMinuten(this.state.tijdstip, this.state.eindTijdstip);
        if (verschil < 30) {
            this.setState({
                resultaat: 'Het einde van de voorstelling moet minstens 30 minuten na het begin zijn',
                resultaatSuccess: false
            });
            return false;
        }

        // maak hier een POST request naar de server
        let res = await fetch('/api/artiestenportaal/MaakBoeking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorizaton': 'Bearer ' + JSON.parse(localStorage.getItem('authState')).token
            },
            body: JSON.stringify({
                voorstelling: this.state.voorstelling,
                zaal: this.state.zaal,
                datum: this.state.datum,
                tijdstip: this.state.tijdstip,
                eindTijdstip: this.state.eindTijdstip,
                groep: this.state.groep
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
                    <select onChange={this.veranderVoorstelling} className='form-select dropdown-icon bg-dark border-grey text-white' placeholder='Kies een voorstelling'>
                        <option id="voorstelling-invoer" value="0">Geen</option>
                        {this.props.voorstellingen.map((voorstelling, index) => {
                            return <option id="voorstelling-invoer" key={index} value={voorstelling.id}>{voorstelling.naam}</option>
                        })}
                    </select>
                </div>

                <div className='mb-2'>
                    <div>Groep</div>
                    <select onChange={this.veranderGroep} className='form-select dropdown-icon bg-dark border-grey text-white' placeholder='Kies een groep'>
                        <option id="groep-invoer" value="0">Geen</option>
                        {this.props.groepen.map((groep, index) => {
                            if(groep.isClientLid === true){
                                return <option id="groep-invoer" key={index} value={groep.id}>{groep.naam}</option>
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
                    <div className='mb-2 d-inline-block w-45'>
                        <div>Datum*</div>
                        <input onChange={this.veranderDatum} id="datum-invoer" className='form-control text-white' placeholder='dd-mm-jjjj'></input>
                    </div>

                    <div className='mb-2 d-inline-block ms-2 w-25'>
                        <div>Tijdstip*</div>
                        <input onChange={this.veranderTijdstip} id="tijdstip-invoer" className='form-control text-white' placeholder='XX:XX'></input>
                    </div>

                    <div className='mb-2 d-inline-block ms-2 w-25'>
                        <div>Tot*</div>
                        <input onChange={this.veranderEindTijdstip} id="tot-invoer" className='form-control text-white' placeholder='XX:XX'></input>
                    </div>
                </div>

                <button onClick={this.controleer} className="btn btn-light mt-3">
                    Maak een verzoek voor een reservering
                </button>

                <MaakVoorstellingModal />

                <div id="resultaat" className={`mt-2 ${this.state.resultaatSuccess === null && `d-none`} ${(this.state.resultaatSuccess === true && `licht-groen`) || (this.state.resultaatSuccess === false && 'licht-rood')}`}>
                    {this.state.resultaat}
                </div>
            </div>
        )
    }
}