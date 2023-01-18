import React, { Component } from 'react';
import '../../custom.css'
import { VeranderWachtwoordModal } from './VeranderWachtwoordModal';
import { BevestigEmailModal } from './BevestigEmailModal';
import { AuthContext } from '../context/AuthContext';
import { TwoFactorModal } from './set2FaModal';

export class AccountInstellingen extends Component {
    static contextType = AuthContext;

    constructor(props) {

        super(props);
        this.twoFactorBtn = React.createRef();
        this.state = {
            resultaat: '',
            resultaatSuccess: '',
            ShowTwoFactorModal: false,
            isTwoFactorBtnDisabled: true,

            // deze informatie halen we op uit de database
            username: '',
            voornaam: '',
            achternaam: '',
            oldEmail: '',
            email: '',
            telefoonnummer: '',
            geboortedatum: '',
            emailvoorkeur: '', // 'geen' | 'belangrijk' | 'nieuws'
            oldIsEmailBevestigd: false,
            isEmailBevestigd: false,
            isEmailNieuw: false,
            oldTwoFactorEnabled: false,
            twoFactorEnabled: false,
            geslacht: '' // 'man' | 'vrouw' | 'anders'
        };
    }

    verversGegevens = async () => {
        let res = await fetch('/api/account/GetUser', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authState')).token
            }
        })
            .then(res => res.json())
            .catch(err => console.warn(`caught error: ${err}`));

        if (!res?.resultaat) {
            console.warn(`res?.resultaat? is undefined`);
            console.warn(res);
            console.warn(res?.resultaat);
            return;
        }

        const storage = JSON.parse(localStorage.getItem('authState'));
        localStorage.setItem('authState', JSON.stringify({
            token: storage.token,
            user: res.resultaat
        }));

        const payload = {
            token: storage.token,
            user: res.resultaat
        }

        this.context.dispatch({
            type: 'SET_STATE',
            payload: payload,
        });

        this.setState({ isEmailNieuw: false });
        this.setState({ oldEmail: this.state.email });
    }

    componentDidMount = () => {
        // hier halen we de gegevens op uit de database
        const { authState } = this.context;

        this.setState({
            username: authState.user.userName,
            voornaam: authState.user.voornaam,
            email: authState.user.email,
            achternaam: authState.user.achternaam,
            telefoonnummer: authState.user.telefoonnummer,
            geboortedatum: authState.user.geboorteDatum,
            emailvoorkeur: authState.user.emailvoorkeur,
            twoFactorEnabled: authState.user.twoFactorEnabled,
            isEmailBevestigd: authState.user.emailConfirmed,
            geslacht: authState.user.geslacht?.toLowerCase() ?? 'anders',

            oldEmail: authState.user.email,
            oldIsEmailBevestigd: authState.user.emailConfirmed,
            oldTwoFactorEnabled: authState.user.twoFactorEnabled,
        })

        this.veranderIsEmailBevestigd(authState.user.emailConfirmed);
    }

    veranderVoornaam = (e) => { this.setState({ voornaam: e.target.value }); }
    veranderAchternaam = (e) => { this.setState({ achternaam: e.target.value }); }
    veranderTelefoonnummer = (e) => { this.setState({ telefoonnummer: e.target.value }); }
    veranderGeboortedatum = (e) => { this.setState({ geboortedatum: e.target.value }); }
    veranderEmailvoorkeur = (e) => { this.setState({ emailvoorkeur: e.target.value }); }
    veranderGeslacht = (e) => { this.setState({ geslacht: e.target.value }); }

    veranderEmail = (e) => {
        this.setState({ email: e.target.value }, this.toggleEmailBevestigd);
    }

    toggleEmailBevestigd = () => {
        if (this.state.oldEmail != this.state.email) {
            this.veranderIsEmailBevestigd(false);
            this.setState({ twoFactorEnabled: false });
            this.setState({ isEmailNieuw: true });
        }
        else {
            if (this.state.oldIsEmailBevestigd) {
                this.veranderIsEmailBevestigd(true);
            }
            if (this.state.oldTwoFactorEnabled) {
                this.setState({ twoFactorEnabled: true });
            }
            this.setState({ isEmailNieuw: false });
        }
    }

    veranderTwoFactorEnabled = (e) => {
        if (this.state.isEmailBevestigd) {
            this.setState({ twoFactorEnabled: true });
            this.setState({ ShowTwoFactorModal: true });
        }
    }

    veranderIsEmailBevestigd = (bool) => {
        this.setState({ isEmailBevestigd: bool })
        this.setState({ isTwoFactorBtnDisabled: !bool });
        const twoFactorBtn = this.twoFactorBtn;

        if (bool)
            twoFactorBtn.current.style.opacity = 1;
        else
            twoFactorBtn.current.style.opacity = 0.5;

    }


    controleerDatum = (datum) => {
        // controleer of datum in het juiste formaat is
        // eerst kijken we naar het jaar dus: 19[0-9][0-9]|20[0-2][0-3] d.w.z 1900-1999 of 2000-2023
        // dan kijken we naar de maand dus: 0[1-9]|[1-9]|1[0-2] d.w.z 01-09, 1-9 of 10-12
        // dan kijken we naar de dag dus: 0[1-9]|[1-9]|[1-2][0-9]|3[0-1] d.w.z 01-09, 1-9, 10-29 of 30-31
        // streepje ("-") tussen de dag, maand en jaar

        const datumRegex = new RegExp('^(19[0-9][0-9]|20[0-2][0-3])-(0[1-9]|[1-9]|1[0-2])-(0[1-9]|[1-9]|[1-2][0-9]|3[0-1])$');
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

        var storage = JSON.parse(localStorage.getItem('authState'));

        let res = await fetch('/api/account/UpdateInstellingen', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + storage.token
            },
            body: JSON.stringify({
                voornaam: this.state.voornaam,
                achternaam: this.state.achternaam,
                email: this.state.email,
                telefoonnummer: this.state.telefoonnummer,
                geboortedatum: this.state.geboortedatum,
                emailvoorkeur: this.state.emailvoorkeur,
                EmailConfirmed: this.state.isEmailBevestigd,
                TwoFactorEnabled: this.state.twoFactorEnabled,
                geslacht: this.state.geslacht
            })
        })
            .then(res => res.json())
            .catch(err => console.warn(`caught error: ${err}`));

        if (res && res.bericht) {
            this.setState({
                resultaat: res.bericht,
                resultaatSuccess: res.success
            });
        } else {
            this.setState({
                resultaat: 'Er is iets misgegaan. Probeer het later opnieuw.',
                resultaatSuccess: res.succes
            });
        }

        if (res) {
            this.verversGegevens();
        }
    }

    set2FactorModal = (bool) => {
        this.setState({ ShowTwoFactorModal: bool });
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
                            <input onChange={this.veranderVoornaam} id="voornaam-invoer" className='form-control text-white' placeholder='Geef je voornaam op' value={this.state.voornaam} />
                        </div>

                        <div className='col-sm-3 mb-2'>
                            <div className='mb-2'>Achternaam*</div>
                            <input onChange={this.veranderAchternaam} id="achternaam-invoer" className='form-control text-white' placeholder='Geef je achternaam op' value={this.state.achternaam} />
                        </div>

                        <div className='col-sm-2 mb-2'>
                            <div className='mb-2'>Geboortedatum*</div>
                            <input type="date" onChange={this.veranderGeboortedatum} id="geboortedatum-invoer" className='form-control text-white' placeholder='Geef je geboortedatum op' value={this.state.geboortedatum} />
                        </div>
                    </div>

                    <div className='row mb-2'>
                        <div className='col-sm-4 mb-2'>
                            <div className='mb-2'>Emailadres*</div>
                            <input onChange={this.veranderEmail} id="email-invoer" className='form-control text-white' placeholder='Geef je email-adress op' value={this.state.email} />
                        </div>

                        <div className='col-sm-3 mb-2'>
                            <div className='mb-2'>Telefoonnummer</div>
                            <input onChange={this.veranderTelefoonnummer} id="tel-invoer" className='form-control text-white' placeholder='Geef je telefoonnummer op' value={this.state.telefoonnummer} />
                        </div>
                    </div>

                    <div className='row mb-2'>
                        <div className='col-sm-4 mb-2'>
                            <div className='mb-2'>Is Emailadres bevestigd</div>
                            <input id="is-email-bevestigd" className='form-control bg-dark' placeholder={this.state.isEmailBevestigd ? "bevestigd" : "niet bevestigd"} readOnly={true} />
                        </div>

                        <div className='col-sm-3 mb-2'>
                            <div className='mb-2'>Bevestig uw Emailadres</div>
                            <BevestigEmailModal username={this.state.username} veranderEmailBevestigd={this.veranderIsEmailBevestigd} isEmailNieuw={this.state.isEmailNieuw} />
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

                            <div className='d-inline ms-3'>
                                <button className='btn btn-light 2FA' onClick={this.veranderTwoFactorEnabled} style={{ opacity: 0.5 }} ref={this.twoFactorBtn} disabled={this.state.isTwoFactorBtnDisabled}>
                                    Schakel 2FA in
                                </button>
                            </div>
                        </div>


                        <div className='col-sm-12 mt-3'>
                            <div id="resultaat" className={`h6 mt-3 ${this.state.resultaat == '' ? `d-none` : ''} ${this.state.resultaatSuccess ? 'licht-groen' : 'licht-rood'}`}>
                                {this.state.resultaat}
                            </div>
                        </div>

                        <TwoFactorModal showModal={this.state.ShowTwoFactorModal} setShowModal={this.set2FactorModal} />

                    </div>
                </div>
            </div>
        )
    }
}