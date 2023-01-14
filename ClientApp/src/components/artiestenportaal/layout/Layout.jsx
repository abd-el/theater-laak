import React, { Component }  from 'react';
import { MenuKnop } from './MenuKnop';
import { Boekingen } from '../boekingen/Boekingen';
import { Groepen } from '../groepen/Groepen';

export class Layout extends Component {
    constructor (props) {
        super(props);
        this.state = {
            geselecteerd: 'Boekingen',
            huidigeGroepen: [],
            huidigeBoekingen: [],
            zalen: [],
            voorstellingen: []
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


        let zalenRes = await fetch('/api/zaal/GetZalen')
        .then(res => res.json())
        .catch(err => console.warn(`caught error: ${err}`))

        if(zalenRes && zalenRes.length > -1){
            this.setState({
                zalen: zalenRes
            })
        }

        let voorstellingenRes = await fetch('/api/Programmering/Voorstellingen')
        .then(res => res.json())
        .catch(err => console.warn(`caught error: ${err}`))

        if(voorstellingenRes && voorstellingenRes.length > -1){
            this.setState({
                voorstellingen: voorstellingenRes
            })
        }

        let huidigeBoekingenRes = await fetch('/api/artiestenportaal/EigenOptredens', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authState')).token
            }
        })
        .then(res => res.json())
        .catch(err => console.warn(`caught error: ${err}`))

        if (huidigeBoekingenRes && huidigeBoekingenRes.optredens.length > -1) {
            let boekingen = [];

            for(let i = 0; i < huidigeBoekingenRes.optredens.length; i++){
                let boeking = huidigeBoekingenRes.optredens[i];
                let bevestigdEmoji = '⏳';
                if (boeking.bevestigd === true) {
                    bevestigdEmoji = '✅';
                } else if (boeking.bevestigd === false) {
                    bevestigdEmoji = '❌';
                }
                let optreden = null;
                for(let j = 0; j < this.state.voorstellingen.length; j++){
                    if(this.state.voorstellingen[j].voorstellingId === boeking.optredenId){
                        optreden = this.state.voorstellingen[j];
                    }
                }
                boekingen.push({
                    id: boeking.optredenId,
                    datumTijdstip: boeking.datumTijdstip,
                    bevestigd: bevestigdEmoji,
                    titel: optreden.titel,
                    zaal: boeking.zaalId
                })
            }

            this.setState({
                huidigeBoekingen: boekingen
            });
        }
    }

    laatComponentZien = () => {
        if (this.state.geselecteerd === 'Boekingen') {
            return <Boekingen huidigeBoekingen={this.state.huidigeBoekingen} zalen={this.state.zalen} voorstellingen={this.state.voorstellingen} groepen={this.state.huidigeGroepen}/>
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