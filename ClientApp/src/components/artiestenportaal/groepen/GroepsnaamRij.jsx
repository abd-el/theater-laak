import React, { Component }  from 'react';
import { GroepsoverzichtModal } from "./GroepsoverzichtModal";

export class GroepsnaamRij extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {

    }

    render() {
        return (
            <tr>
                <td>
                    <GroepsoverzichtModal naam={this.props.naam} groepsId={this.props.groepsId} leden={this.props.leden} isClientLid={this.props.isClientLid}/>
                </td>
            </tr>
        )
    }
}