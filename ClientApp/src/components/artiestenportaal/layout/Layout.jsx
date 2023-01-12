import React, { Component }  from 'react';
import { MenuKnop } from './MenuKnop';
import { Boekingen } from '../boekingen/Boekingen';
import { Groepen } from '../groepen/Groepen';

export class Layout extends Component {
    constructor (props) {
        super(props);
        this.state = {
            geselecteerd: 'Boekingen',
            huidigeGroepen: []
        };
    }

    selecteer = (e) => {
        this.setState({ geselecteerd: e.target.innerText });
    }

    componentDidMount = async (e) => {
        let groepenRes = await fetch('/api/artiestenportaal/GetGroepen', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authState')).token
            }
        })
        .then(res => res.json())
        .catch(err => console.warn(`caught error: ${err}`))

        if (groepenRes && groepenRes.groepData) {
            let groepen = [];

            for (let i = 0; i < groepenRes.groepData.length; i++) {
                let groep = groepenRes.groepData[i]

                groepen.push({
                    naam: groep.naam,
                    groepsId: groep.id,
                    leden: groep.artiesten,
                    isClientLid: groep.id === groepenRes.idOfGroupOfUser
                });
            }

            console.log(groepen)

            this.setState({
                huidigeGroepen: groepen
            });
        }


        let zalenRes = await fetch('/api/Zaal/GetZalen')
        .then(res => res.json())
        .catch(err => console.warn(`caught error: ${err}`))

        console.log(zalenRes);
    }

    laatComponentZien = () => {
        if (this.state.geselecteerd === 'Boekingen') {
            return <Boekingen groepen={this.state.huidigeGroepen}/>
        } else if (this.state.geselecteerd === 'Groepen') {
            return <Groepen groepen={this.state.huidigeGroepen}/>;
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