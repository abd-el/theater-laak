import React, { Component }  from 'react';
import { Groepsleden } from './GroepsledenRij';

export class GroepsnaamLeden extends Component {
    constructor(props) {
        super(props);
        this.state = { // deze informatie halen we op uit de database
            huidigeLeden: []
        };
    }

    render() {
        return (
            <tr>
                <td>
                    {this.props.naam} 
                </td>
            </tr>
        )
    }
}