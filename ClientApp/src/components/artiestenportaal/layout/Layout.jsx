import React, { Component }  from 'react';
import { MenuKnop } from './MenuKnop';
import { Boekingen } from '../boekingen/Boekingen';
import { Groepen } from '../groepen/Groepen';

export class Layout extends Component {
    constructor (props) {
        super(props);
        this.state = {
            geselecteerd: 'Boekingen',
        };
    }

    selecteer = (e) => {
        this.setState({ geselecteerd: e.target.innerText });
    }

    laatComponentZien = () => {
        if (this.state.geselecteerd === 'Boekingen') {
            return <Boekingen />
        } else if (this.state.geselecteerd === 'Groepen') {
            return <Groepen />;
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
                        <MenuKnop classes={this.state.geselecteerd === "Boekingen" && "bg-black"} onClick={this.selecteer} text="Boekingen" />
                        <MenuKnop classes={this.state.geselecteerd === "Groepen" && "bg-black"} onClick={this.selecteer} text="Groepen" />
                    </div>
    
                    {this.laatComponentZien()}
                </div>
            </div>
        );
    }
}