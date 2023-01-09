import React, { Component }  from 'react';
import { Groepsoverzicht, GroepsoverzichtModal } from "./GroepsoverzichtModal";

export class GroepsnaamRij extends Component {
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
            <tr>
                <td className="groepsnaam">
                    <GroepsoverzichtModal naam={this.props.naam}/>
                </td>
            </tr>
        )
    }
}