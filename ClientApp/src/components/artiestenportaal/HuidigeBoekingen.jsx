import React, { Component }  from 'react';
import './stylesheet.css';
import { Rij } from './Rij';

export class HuidigeBoekingen extends Component {
    render() {
        return (
            // er is al container en row dus je hoeft alleen col-X nog te doen
            <div className='col-sm-4 text-white d-inline'>
                <div className='d-inline kop-text'>
                    Huidige Boekingen
                </div>

                <div>
                    <table className="table table-bordered table-striped table-dark">
                        <thead>
                            <tr>
                                <th scope="col" className="titel">
                                    Titel
                                </th>
                                <th scope="col" className="zaal">
                                    Zaal
                                </th>
                                <th scope="col" className="bevestigd">
                                    Bevestigd
                                </th>
                                <th scope="col" className="datum-tijdstip">
                                    Datum & tijdstip
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <Rij titel="Roodkapje" zaal="3" bevestigd="✅" datumTijdstip="12-1-2023 20:00"/>
                            <Rij titel="Roodkapje" zaal="3" bevestigd="⏳" datumTijdstip="12-1-2023 20:00"/>
                            <Rij titel="Roodkapje" zaal="3" bevestigd="❌" datumTijdstip="12-1-2023 20:00"/>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}