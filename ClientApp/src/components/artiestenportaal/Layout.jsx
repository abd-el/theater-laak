import React, { Component }  from 'react';
import { MenuKnop } from './MenuKnop';
import { Boekingen } from './Boekingen';
import { MijnAccount } from './MijnAccount';
import { Groepen } from './Groepen';
import { Privacy } from './Privacy';

export class Layout extends Component {
    constructor (props) {
        super(props);
        this.state = {
            geselecteerd: 'Mijn account',
        };
    }

    selecteer = (e) => {
        this.setState({ geselecteerd: e.target.innerText });
    }

    laatComponentZien = () => {
        if (this.state.geselecteerd === 'Mijn account') {
            return <MijnAccount />;
        } else if (this.state.geselecteerd === 'Boekingen') {
            return <Boekingen />
        } else if (this.state.geselecteerd === 'Groepen') {
            return <Groepen />;
        } else if (this.state.geselecteerd === 'Privacy') {
            return <Privacy />;
        }
    }

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
                        <MenuKnop onClick={this.selecteer} text="Mijn account" />
                        <MenuKnop onClick={this.selecteer} text="Boekingen" />
                        <MenuKnop onClick={this.selecteer} text="Groepen" />
                        <MenuKnop onClick={this.selecteer} text="Privacy" />
                    </div>
    
                    {this.laatComponentZien()}
                </div>
            </div>
        );
    }
}