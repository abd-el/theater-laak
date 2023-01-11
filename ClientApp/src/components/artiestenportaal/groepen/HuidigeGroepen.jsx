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

    componentDidMount = async () => {
            let res = await fetch('/api/artiestenportaal/GetGroepen', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authState')).token
                }
            })
            .then(res => res.json())
            .catch(err => console.warn(`caught error: ${err}`))

            if (res && res.groepData) {
            let groepen = [];

            for (let i = 0; i < res.groepData.length; i++) {
                let groep = res.groepData[i]
                groepen.push({
                    naam: groep.naam,
                    groepsId: groep.groepsId,
                    leden: groep.artiesten,
                    isClientLid: groep.groepsId === res.IdOfGroupOfUser
                });
            }

            console.log(groepen)

            this.setState({
                huidigeGroepen: groepen
            });
        }
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
