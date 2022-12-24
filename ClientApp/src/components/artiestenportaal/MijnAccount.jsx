import React, { Component }  from 'react';
import './stylesheet.css';

export class MijnAccount extends Component {
    constructor(props) {
        super(props);
        this.state = { // deze informatie halen we op uit de database
            naam: 'Jan', 
            email: 'Jan@mail.com',
            telefoonnummer: '0612345678'
        };
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}