import React, { Component }  from 'react';

export class GroepNaamRij extends Component {
    render() {
        return (
            <tr>
                <td className="groepNaam">
                    {this.props.naam}
                </td>
            </tr>
        )
    }
}