import React, { Component }  from 'react';

export class GroepsnaamRij extends Component {
    render() {
        return (
            <tr>
                <td className="groepsnaam">
                    {this.props.naam}
                </td>
            </tr>
        )
    }
}