import React, { Component }  from 'react';
import '../layout/stylesheet.css';
import { Rij } from './Rij';

export class HuidigeBoekingen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // haal de huidige boekingen op uit de database
        console.log(this.props.huidigeBoekingen);
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
                            {this.props.huidigeBoekingen.map((boeking, index) => {
                                if((new Date() - new Date(boeking.datumTijdstip)) / 1000 / 60 / 60 / 24 > 1){
                                    return null;
                                }
                                return <Rij key={index} titel={boeking.titel} zaal={boeking.zaal} bevestigd={boeking.bevestigd} datumTijdstip={boeking.datumTijdstip.replace('T', ' om ').slice(0, -3)} />
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}