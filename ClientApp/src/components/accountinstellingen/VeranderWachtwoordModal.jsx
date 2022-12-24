import React, { Component }  from 'react';
import '../../custom.css'

export class VeranderWachtwoordModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wachtwoord: '',
            wachtwoordHerhaal: ''
        };
    }

    veranderWachtwoord = (e) => { this.setState({ wachtwoord: e.target.value }); }
    veranderWachtwoordHerhaal = (e) => { this.setState({ wachtwoordHerhaal: e.target.value }); }

    render() {
        return (
            <div className="modal fade" id="veranderWachtwoordModal" tabIndex="-1" aria-labelledby="veranderWachtwoordModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="veranderWachtwoordModalLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        
                    </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}