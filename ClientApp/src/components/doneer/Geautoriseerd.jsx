import React, { Component }  from 'react';
import '../../custom.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export class Geautoriseerd extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount = async () => {
        const token = JSON.parse(localStorage.getItem('authState')).token

        // get IkDoneerToken from cookies
        const ikDoneerToken = document.cookie.split(';').find(c => c.trim().startsWith('IkDoneerToken=')).split('=')[1];

        let res = await fetch('api/donatie/RondAutorisatieAf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                ikDoneerToken: ikDoneerToken
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
                        <h1 className="text-center">U bent successvol geautoriseerd!</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Link to="/doneer" className="text-center">Klik hier om terug naar de donatie-pagina te gaan.</Link>
                    </div>
                </div>  
            </div>
        )
    }
}