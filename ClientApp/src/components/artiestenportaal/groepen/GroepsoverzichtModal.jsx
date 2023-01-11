import React, { Component } from "react";
import '../layout/stylesheet.css';
import { GroepsledenTabel } from './GroepsledenTabel';
import Modal from 'bootstrap'

export class GroepsoverzichtModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resultaat: '',
            resultaatSuccess: false
        }
    }

    componentDidMount = () => {

    }

    render() {
        return (
            <div>
                <div className="groepsnaam" data-bs-toggle="modal" data-bs-target={`#GroepsoverzichtModal${this.props.groepsId}`}>
                    {this.props.naam} 
                </div>
                
                <div className="modal fade" id={`GroepsoverzichtModal${this.props.groepsId}`}
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
                            <GroepsledenTabel leden={this.props.leden}/>
                            <div className="text-center d-flex justify-content-center">
                                <button disabled={this.props.isClientLid} type="button" className="btn btn-light me-2">Sluit aan</button>
                                <button disabled={!this.props.isClientLid} type="button" className="btn btn-dark">Vertrek</button>
                            </div>
                            <div id="groeps-verandering-resultaat" className={`h6 mt-3 ${this.state.resultaat=='' ? `d-none` : ''} ${this.state.resultaatSuccess ? 'licht-groen' : 'licht-rood'}`}>
                                {this.state.resultaat}
                            </div>
                        </div>
                            <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Sluit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}