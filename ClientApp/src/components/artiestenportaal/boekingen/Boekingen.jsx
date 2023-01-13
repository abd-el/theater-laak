import React, { Component }  from 'react';
import { HuidigeBoekingen } from './HuidigeBoekingen';
import { BoekenFormulier } from './BoekenFormulier';

export class Boekingen extends Component {
    render() {
        return (
            <div className='col-sm-10'>
                <div className='row'>
                    <HuidigeBoekingen huidigeBoekingen={this.props.huidigeBoekingen} />
                    <BoekenFormulier zalen={this.props.zalen} voorstellingen={this.props.voorstellingen} groepen={this.props.groepen}/>
                </div>
            </div>
        )
    }
}