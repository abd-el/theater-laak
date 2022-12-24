import React, { Component }  from 'react';

export class Rij extends Component {
    render() {
        return (
            <tr>
                <td className="titel">
                    {this.props.titel}
                </td>
                <td className="zaal">
                    {this.props.zaal}
                </td>
                <td className="bevestigd">
                    {this.props.bevestigd}
                </td>
                <td className="datum-tijdstip">
                    {this.props.datumTijdstip}
                </td>
            </tr>
        )
    }
}