import React, { Component }  from 'react';

export class Groepslidrij extends Component {
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