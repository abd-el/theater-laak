import React, { Component }  from 'react';
import './stylesheet.css';
import { Rij } from './Rij';

export class HuidigeBoekingen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            huidigeBoekingen: [], // deze halen we op uit de database, formaat: { titel: string, zaal: int, bevestigd: '✅'|'⏳'|'❌', datumtijdstip: string }
        };
    }

    componentDidMount() {
        // haal de huidige boekingen op uit de database
        let huidigeBoekingen = [
            { titel: 'Roodkapje', zaal: 3, bevestigd: '✅', datumtijdstip: '01-01-2023 15:00' },
            { titel: 'Roodkapje', zaal: 2, bevestigd: '⏳', datumtijdstip: '04-01-2023 17:00' },
            { titel: 'Roodkapje', zaal: 3, bevestigd: '❌', datumtijdstip: '09-01-2023 20:00' },
        ];

        this.setState({ huidigeBoekingen: huidigeBoekingen });
    }

    render() {
        return (
            // er is al container en row dus je hoeft alleen col-X nog te doen
            <div className='col-sm-6 text-white d-inline'>
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
                            {this.state.huidigeBoekingen.map((boeking, index) => (
                                <Rij key={index} titel={boeking.titel} zaal={boeking.zaal} bevestigd={boeking.bevestigd} datumTijdstip={boeking.datumtijdstip} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}