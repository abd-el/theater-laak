import React, { Component } from "react";
import '../layout/stylesheet.css';
import { GroepsnaamRij } from "./GroepsnaamRij";

export class HuidigeGroepen extends Component {
    constructor(props) {
        super(props);
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
                            {this.props.groepen.map((groep, index) => (
                                <GroepsnaamRij key={index} naam={groep.naam} groepsId={groep.groepsId} leden={groep.leden} isClientLid={groep.isClientLid}/>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
