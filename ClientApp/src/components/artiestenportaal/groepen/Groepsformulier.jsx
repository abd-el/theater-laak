import React, { Component } from "react";
import '../layout/stylesheet.css';

export class Groepsformulier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groepsNaam: '',
            groepsEmail: '',

            resultaat: '',
            resultaatSuccess: false
        };
    }

    veranderGroepsnaam = (e) => { this.setState({ groepsNaam: e.target.value }) }
    veranderGroepsemail = (e) => { this.setState({ groepsEmail: e.target.value }) }

    controleer = () => {
        if (!this.state.groepsNaam || this.state.groepsNaam == '') {
            this.setState({
                resultaat: 'Vul een groepsnaam in',
                resultaatSuccess: false
            })

            return;
        }

        if (this.state.groepsEmail && this.state.groepsEmail != '') {
            // controleer of email in het juiste formaat is
            // de gebruikersnaam mag van alles zijn dus ^[a-zA-Z0-9_.+-]
            // daarna komt een @ dus +@
            // daarna komt de domeinnaam dus [a-zA-Z0-9-]
            // daarna komt een punt dus .
            // daarna komt de extensie dus [a-zA-Z0-9-.]
    
            const emailRegex = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$');
            let geldig = emailRegex.test(this.state.groepsEmail);
        
            if (!geldig) {
                this.setState({
                    resultaat: 'Vul een geldig emailadres in',
                    resultaatSuccess: false
                })

                return;
            }
        }

        this.setState({
            resultaat: 'Groep toegevoegd',
            resultaatSuccess: true
        })

        return;
    }


    render() {
        return (
            <div className='col-sm-5 text-white d-inline ms-4'>
                <div className='d-inline kop-text'>
                    Groep Toevoegen
                </div>

                <div className='mb-2'>
                    <div className="mb-2 mt-1">Groepsnaam*</div>
                    <input onChange={this.veranderGroepsnaam} id="groepsNaam-invoer" className='form-control text-white' placeholder='Geef een groepsnaam op'></input>
                </div>

                <div className='mb-2'>
                    <div className="mb-2 mt-1">Groepsemail</div>
                    <input onChange={this.veranderGroepsemail} id="groepsNaam-invoer" className='form-control text-white' placeholder='Geef een email op voor contact'></input>
                </div>

                <button onClick={this.controleer} className="btn btn-light mt-2">
                    Voeg toe
                </button>

                <div id="groeps-toevoeging-resultaat" className={`h6 mt-3 ${this.state.resultaat=='' ? `d-none` : ''} ${this.state.resultaatSuccess ? 'licht-groen' : 'licht-rood'}`}>
                    {this.state.resultaat}
                </div>
            </div>
        )
    }
}