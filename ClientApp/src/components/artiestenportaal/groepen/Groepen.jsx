import React, { Component }  from 'react';
import { HuidigeGroepen} from './HuidigeGroepen'
import { Groepsformulier } from './Groepsformulier';
import { Groepsoverzicht } from './GroepsoverzichtModal';

export class Groepen extends Component {
    render() {
        return (
            <div className='col-sm-10'>
                <div className='row'>
                    <HuidigeGroepen />
                    <Groepsformulier />
                </div>
            </div>
        )
    }
}