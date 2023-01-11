import React, { Component } from "react";
import '../layout/stylesheet.css';

export class Groepsformulier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groepsNaam: null,
            lid: null,  
        };
    }

    render() {
        return (
            <div className='col-sm-5 text-white d-inline ms-4'>
                <div className='d-inline kop-text'>
                    Groep Toevoegen
                </div>

                <div className='mb-2'>
                    <div>Groepsnaam*</div>
                    <input onChange={this.veranderGroepsNaam} id="groepsnaam-invoer" className='form-control text-white' placeholder='Geef een groepsnaam op'></input>
                </div>

                <div className='mb-2'>
                    <div>Groepseigenaar*</div>
                    <input onChange={this.veranderGroepsNaam} id="groepseigenaar-invoer" className='form-control text-white' placeholder='Voeg een groepseigenaar toe'></input>
                </div>

                <button onClick={this.controleer} className="btn btn-light mt-3">
                    Voeg toe
                </button>
            </div>
        )
    }
}