import React, { Component }  from 'react';
import './stylesheet.css';

export class Groepen extends Component {
    constructor(props) {
        super(props);
        this.state = { // deze informatie halen we op uit de database
            groepen: []
        };
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}