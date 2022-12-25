import React, { Component }  from 'react';
import { GroepOverzicht } from './GroepOverzicht';
import { HuidigeGroepen} from './HuidigeGroepen'

export class Groepen extends Component {
    render() {
        return (
            <div className='col-sm-10'>
                <div className='row'>
                    <HuidigeGroepen />
                    <GroepOverzicht />
                </div>
            </div>
        )
    }
}