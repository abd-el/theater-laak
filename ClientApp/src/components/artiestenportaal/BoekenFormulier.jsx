import React, { Component }  from 'react';
import './stylesheet.css';

export class BoekenFormulier extends Component {
    render() {
        return (
            // er is al container en row dus je hoeft alleen col-X nog te doen
            <div className='col-sm-4 text-white d-inline ms-4'>
                <div className='d-inline kop-text'>
                    Zaal boeken
                </div>

                <div className='mb-2'>
                    <div>Titel*</div>
                    <input className='form-control text-white' placeholder='Geef een titel op'></input>
                </div>

                <div className='mb-2'>
                    <div>Groep</div>
                    <select className='form-control text-white' placeholder='Kies een groep'>
                        <option value="geen">Geen</option>
                    </select>
                </div>

                <div className='mb-2'>
                    <div>Zaal*</div>
                    <select className='form-control text-white'>
                        <option value="geen">Kies een zaal</option>
                    </select>
                </div>

                <div>
                    <div className='mb-2 d-inline-block datum'>
                        <div>Datum*</div>
                        <input className='form-control text-white' placeholder='DD-MM-YYYY'></input>
                    </div>

                    <div className='mb-2 d-inline-block ms-2 tijdstip'>
                        <div>Tijdstip*</div>
                        <input className='form-control text-white' placeholder='XX:XX'></input>
                    </div>

                    <div className='mb-2 d-inline-block ms-2 tot'>
                        <div>Tot*</div>
                        <input className='form-control text-white' placeholder='XX:XX'></input>
                    </div>
                </div>

                <button className="btn btn-light mt-3">
                    Maak een verzoek voor een reservering
                </button>

                <div className='resultaat mt-2'>
                    Resultaat: Success!
                </div>
            </div>
        )
    }
}