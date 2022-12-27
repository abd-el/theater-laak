import React, { Component }  from 'react';
import '../../custom.css'
import { VeranderWachtwoordModal } from './VeranderWachtwoordModal';

export class AccountInstellingen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resultaat: undefined,
            resultaatSuccess: undefined,

            // deze informatie halen we op uit de database
            voornaam: 'Jan',
            achternaam: 'Piet',
            email: 'Jan@mail.com',
            telefoonnummer: '06 12345678',
            geboortedatum: '01-01-2001',
            emailvoorkeur: 'nieuws', // 'geen' | 'belangrijk' | 'nieuws'
            geslacht: 'man' // 'man' | 'vrouw' | 'anders'
        };
    }

    veranderVoornaam = (e) => { this.setState({ voornaam: e.target.value }); }
    veranderAchternaam = (e) => { this.setState({ achternaam: e.target.value }); }
    veranderEmail = (e) => { this.setState({ email: e.target.value }); }
    veranderTelefoonnummer = (e) => { this.setState({ telefoonnummer: e.target.value }); }
    veranderGeboortedatum = (e) => { this.setState({ geboortedatum: e.target.value }); }
    veranderEmailvoorkeur = (e) => { this.setState({ emailvoorkeur: e.target.value }); }
    veranderGeslacht = (e) => { this.setState({ geslacht: e.target.value }); }

    controleerDatum = (datum) => {
        // controleer of datum in het juiste formaat is
        // eerst kijken we naar de dag dus: 0[1-9]|[1-9]|[1-2][0-9]|3[0-1] d.w.z 01-09, 1-9, 10-29 of 30-31
        // dan kijken we naar de maand dus: 0[1-9]|[1-9]|1[0-2] d.w.z 01-09, 1-9 of 10-12
        // dan kijken we naar het jaar dus: 19[0-9][0-9]|20[0-2][0-3] d.w.z 1900-1999 of 2000-2023
        // streepje ("-") tussen de dag, maand en jaar

        const datumRegex = new RegExp('^(0[1-9]|[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|[1-9]|1[0-2])-((19[0-9][0-9]|20[0-2][0-3]))$');
        return datumRegex.test(datum);
    }

    controleerEmail = (email) => {
        // controleer of email in het juiste formaat is
        // de gebruikersnaam mag van alles zijn dus ^[a-zA-Z0-9_.+-]
        // daarna komt een @ dus +@
        // daarna komt de domeinnaam dus [a-zA-Z0-9-]
        // daarna komt een punt dus .
        // daarna komt de extensie dus [a-zA-Z0-9-.]

        const emailRegex = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$');
        return emailRegex.test(email);
    }

    controleer = async () => {
        if (!this.state.voornaam) {
            this.setState({ 
                resultaat: 'Voornaam is verplicht',
                resultaatSuccess: false
            });

            return;
        }

        if (!this.state.achternaam) {
            this.setState({ 
                resultaat: 'Achternaam is verplicht',
                resultaatSuccess: false
            });

            return;
        }

        if (!this.controleerDatum(this.state.geboortedatum)) {
            this.setState({ 
                resultaat: 'Geboortedatum is verplicht en moet in het formaat dd-mm-jjjj zijn',
                resultaatSuccess: false
            });

            return;
        }

        if (!this.controleerEmail(this.state.email)) {
            this.setState({ 
                resultaat: 'Email is verplicht en moet in het formaat naam@domein.nl zijn',
                resultaatSuccess: false
            });

            return;
        }

        let res = await fetch('/api/Account/UpdateInstellingen', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                voornaam: this.state.voornaam,
                achternaam: this.state.achternaam,
                email: this.state.email,
                telefoonnummer: this.state.telefoonnummer,
                geboortedatum: this.state.geboortedatum,
                emailvoorkeur: this.state.emailvoorkeur,
                geslacht: this.state.geslacht
            })
        });

        this.setState({
            resultaat: 'Account is succesvol aangepast! ',
            resultaatSuccess: true
        });
    }

    render() {
        return (
            <div className='container'>
                <br />
                <br />
                <br />
                <br />
                
                <div className='row text-white'>
                    <div className='col-12 kop-text mb-4 d-block'>
                        Account instellingen
                    </div>
                    
                    <div className='row mb-2'>
                        <div className='col-sm-2 mb-2'>
                            <div className='mb-2'>Voornaam*</div>
                            <input onChange={this.veranderVoornaam} id="voornaam-invoer" className='form-control text-white' placeholder='Geef je voornaam op' value={this.state.voornaam}/>
                        </div>

                        <div className='col-sm-3 mb-2'>
                            <div className='mb-2'>Achternaam*</div>
                            <input onChange={this.veranderAchternaam} id="achternaam-invoer" className='form-control text-white' placeholder='Geef je achternaam op' value={this.state.achternaam}/>
                        </div>

                        <div className='col-sm-2 mb-2'>
                            <div className='mb-2'>Geboortedatum*</div>
                            <input onChange={this.veranderGeboortedatum} id="geboortedatum-invoer" className='form-control text-white' placeholder='Geef je geboortedatum op' value={this.state.geboortedatum}/>
                        </div>
                    </div>

                    <div className='row mb-2'>
                        <div className='col-sm-4 mb-2'>
                            <div className='mb-2'>Emailadres*</div>
                            <input onChange={this.veranderEmail} id="email-invoer" className='form-control text-white' placeholder='Geef je email-adress op' value={this.state.email}/>
                        </div>

                        <div className='col-sm-3 mb-2'>
                            <div className='mb-2'>Telefoonnummer</div>
                            <input onChange={this.veranderTelefoonnummer} id="tel-invoer" className='form-control text-white' placeholder='Geef je telefoonnummer op' />
                        </div>
                    </div>

                    <div className='row mb-2'>
                        <div className='col-sm-4 mb-2'>
                            <div className='mb-2'>Email voorkeur</div>
                            <select value={this.state.emailvoorkeur} onChange={this.veranderEmailvoorkeur} className='form-select dropdown-icon bg-dark border-grey text-white'>
                                <option value='geen'>Geen</option>
                                <option value='belangrijk'>Belangrijke emails over je account</option>
                                <option value='nieuws'>Nieuwsbrief</option>
                            </select>
                        </div>

                        <div className='col-sm-3 mb-2'>
                            <div className='mb-2'>Geslacht</div>
                            <select value={this.state.geslacht} onChange={this.veranderGeslacht} className='form-select dropdown-icon bg-dark border-grey text-white'>
                                <option value='anders'>Anders/Zeg ik liever niet</option>
                                <option value='man'>Man</option>
                                <option value='vrouw'>Vrouw</option>
                            </select>
                        </div>

                        <div className='col-sm-12 mt-3'>
                            <div className='d-inline'>
                                <button className='btn btn-light' onClick={this.controleer}>Gegevens opslaan</button>
                            </div>

                            <div className='d-inline ms-3'>
                                <VeranderWachtwoordModal />
                            </div>
                        </div>

                        <div className='col-sm-12 mt-3'>
                            <div id="resultaat" className={`d-inline h6 ${this.state.resultaatSuccess === null && `d-none`} ${(this.state.resultaatSuccess === true && `licht-groen`) || (this.state.resultaatSuccess === false && 'licht-rood')}`}>
                                {this.state.resultaat}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}