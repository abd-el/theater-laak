import React, { Component }  from 'react';
import { KnopLayout } from './KnopLayout';
import { HuidigeBoekingen } from './HuidigeBoekingen';
import { BoekenFormulier } from './BoekenFormulier';

export class Layout extends Component {
    render() {
        return (
            <div className="container">
                <br />
                <br />
                <br />
                <br />
                
                <div className="row">
                    <div className='text-white display-5 mb-4 d-block'>
                        Artiestenportaal
                    </div>
                    
                    <div id="zijkant" className='col-sm-2 d-inline'>
                        <KnopLayout text="Mijn account" />
                        <KnopLayout text="Boekingen" />
                        <KnopLayout text="Groepen" />
                        <KnopLayout text="Privacy" />
                    </div>
    
                    <HuidigeBoekingen />
                    <BoekenFormulier />
                </div>
            </div>
        );
    }
}