import React, { Component } from "react";
import '../layout/stylesheet.css';
import { GroepsnaamRij } from "./GroepsnaamRij";

export class HuidigeGroepen extends Component {
    constructor(props) {
        super(props);
        this.state = { // deze informatie halen we op uit de database
            huidigeGroepen: []
        };
    }

    componentDidMount = () => {
        let huidigeGroepen = [
            {naam: 'ThargSquad', groepsId: 0, leden: ['henk', 'jan'], isClientLid: false},
            {naam: 'SquadTharg', gorepsId: 1, leden: ['piet', 'bob'], isClientLid: false},
            {naam: 'AbdallahsFanClub', groepsId: 2, leden: ['joop', 'klaas', 'abdallah'], isClientLid: true},
            {naam: 'DylansCSGOteam', groepsId: 3, leden: ['joost', 'alex'], isClientLid: false},
            {naam: 'YuriysGymGang', groepsId: 4, leden: ['willem', 'jonas'], isClientLid: false},
        ]

        this.setState({ huidigeGroepen: huidigeGroepen });
    }

    render() {
        return (
            <div className='col-sm-6 text-white d-inline'>
                <div className='d-inline kop-text'>
                    Mijn Groepen
                </div>

                <div >
                    <table className="table table-bordered table-dark">
                        <thead>
                            <tr>
                                <th scope="col">
                                    Groepsnaam
                                </th>
                            </tr>
                        </thead>
                        <tbody >
                            {this.state.huidigeGroepen.map((groep, index) => (
                                <GroepsnaamRij key={index} naam={groep.naam} groepsId={groep.groepsId} leden={groep.leden} isClientLid={groep.isClientLid}/>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
