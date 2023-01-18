import React, { Component }  from 'react';
import '../../custom.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export class RondBestellingAf extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount = async () => {
        const token = JSON.parse(localStorage.getItem('authState')).token

        // get LastTicketReference from cookies
        const lastTicketReference = document.cookie.split(';').find(c => c.trim().startsWith('lastTicketReference=')).split('=')[1];

        let res = await fetch('api/TicketVerkoop/BevestigTicket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                reference: lastTicketReference
            })
        });
    }

    render() {
        return (
            <div className="container mt-3 text-white">
                <br />
                <br />
                <br />
                <br />

                <div className="row">
                    <div className="col-12">
                        <h1 className="text-center">U heeft successvol betaald!</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Link to="/programmering" className="text-center">Klik hier om terug naar de programmering te gaan.</Link>
                    </div>
                </div>  
            </div>
        )
    }
}