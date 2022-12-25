import React, { Component } from "react";
import '../layout/stylesheet.css';
import { GroepNaamRij } from "./GroepNaamRij";

export class HuidigeGroepen extends Component {
    constructor(props) {
        super(props);
        this.state = { // deze informatie halen we op uit de database
            huidigeGroepen: []
        };
    }

    componentDidMount() {
        let huidigeGroepen = [
            {naam: 'ThargSquad'},
            {naam: 'SquadTharg'},
            {naam: 'AbdallahsFanClub'},
            {naam: 'DylansCSGOteam'},
            {naam: 'YuriysGymGang'}
        ]

        this.setState({ huidigeGroepen: huidigeGroepen });
    }

    render() {
        return (
            <div className='col-sm-6 text-white d-inline'>
                <div className='d-inline kop-text'>
                    Mijn Groepen
                </div>

                <div>
                    <table className="table table-bordered table-dark">
                        <thead>
                            <tr>
                                <th scope="col">
                                    Naam
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.huidigeGroepen.map((groep, index) => (
                                <GroepNaamRij key={index} naam={groep.naam} />
                            ))}
                        </tbody>
                    </table>
                </div>

                <div>
                    <button className="groepToevoegen">
                        Groep toevoegen
                    </button>                   
                </div>
            </div>
        )
    }
}
