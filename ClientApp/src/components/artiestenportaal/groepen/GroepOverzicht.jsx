import React, { Component } from "react";
import '../layout/stylesheet.css';

export class GroepOverzicht extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        return (
            <div className='col-sm-5 text-white d-inline ms-4'>
                <div className='d-inline kop-text'>
                    Groep Overzicht
                    <span className="info">
                        ⓘ
                    </span>
                </div>
            </div>
        )
    }
}