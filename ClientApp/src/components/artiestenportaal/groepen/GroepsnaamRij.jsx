import React, { Component }  from 'react';
import { GroepsoverzichtModal } from "./GroepsoverzichtModal";

export class GroepsnaamRij extends Component {
    constructor(props) {
        super(props);
        this.state = { // deze informatie halen we op uit de database
            
        };
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