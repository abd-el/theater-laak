import React, { Component }  from 'react';
import { HuidigeBoekingen } from './HuidigeBoekingen';
import { BoekenFormulier } from './BoekenFormulier';

export class Boekingen extends Component {
    render() {
        return (
            <div className='col-sm-10'>
                <div className='row'>
                    <HuidigeBoekingen />
                    <BoekenFormulier />
                </div>
            </div>
        )
    }
}