import React, { Component } from "react";
import '../layout/stylesheet.css';
import { Groepsleden } from "./Groepsleden";
import { GroepsnaamRij } from "./GroepsnaamRij";
import Modal from 'bootstrap'

export class GroepsoverzichtModal extends Component {
    constructor(props) {
        super(props);
        this.state = {  // deze informatie halen we op uit de database
            groepOverzicht: []
        };
    }


    render() {
        return (
        //     <div className='col-sm-5 text-white d-inline ms-4'>
        //         <div className='d-inline kop-text'>
        //             Groep Overzicht
        //             <span className="info">
        //                 ⓘ
        //             </span>
        //         </div>
        //     </div>
        // )
        <>
        <div id="test">
            <div data-bs-toggle="modal" data-bs-target="#GroepsoverzichtModal">
                {/* <tr >
                    <td className="groepsnaam">
                        {this.props.naam} 
                    </td>
                </tr> */}
                {this.props.naam} 
            </div>
            
            <div className="modal fade" id="GroepsoverzichtModal"
                data-bs-backdrop="static" 
                data-bs-keyboard="false" 
                tabIndex="-1" 
                aria-labelledby="GroepsoverzichtModalLabel"
                aria-hidden="true">

                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="GroepsoverzichtModalLabel">Groepoverzicht</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Sluit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
        )
    }
}