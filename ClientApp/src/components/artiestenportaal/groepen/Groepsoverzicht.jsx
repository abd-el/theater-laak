import React, { Component } from "react";
import '../layout/stylesheet.css';
import { Groepsleden } from "./Groepsleden";
import { GroepsnaamRij } from "./GroepsnaamRij";

export class Groepsoverzicht extends Component {
    constructor(props) {
        super(props);
        this.state = {  // deze informatie halen we op uit de database
            groepOverzicht: []
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