import React, { Component }  from 'react';
import { GroepsnaamLeden } from './GroepsnaamLeden';


export class GroepsledenRij extends Component {
    constructor(props) {
        super(props);
        this.state = { // deze informatie halen we op uit de database
            huidigeLeden: []
        };
    }

    componentDidMount() {
        let huidigeLeden = [
            {naam: 'henk'},
            {naam: 'Bob'},
            {naam: 'joop'},
        ]

        this.setState({ huidigeLeden: huidigeLeden });
    }

    render() {
        return (
            <div>
            <table className="table table-bordered table-dark">
                <thead>
                    <tr>
                        <th scope="col">
                            Groepsleden                        
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.huidigeLeden.map((groep, index) => (
                        <GroepsnaamLeden key={index} naam={groep.naam} />
                    ))}
                </tbody>
            </table>
        </div>
        )
    }
}