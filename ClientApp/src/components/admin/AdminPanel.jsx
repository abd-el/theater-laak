import React, { useState, useEffect, useCallback } from 'react';
import { MenuKnop } from '../artiestenportaal/layout/MenuKnop';
import { Admin } from './Admin';
import { Artiest } from './Artiest';
import { Donateur } from './Donateur';
import { Groep } from './Groepen';
import { Medewerker } from './Medewerker';
import { Optreden } from './Optreden';
import { Voorstelling } from './Voorstelling';
import { Zaal } from './Zaal';

export function AdminPanel() {

    const [getter, setGetter] = useState('');
    const [setter, setSetter] = useState('');



    // useEffect(() => {
    //     getGroepen();
    //     getZalen();
    //     getVoorstellingen();
    //     getOptredens();
    //     getDonateurs();
    // }, [ getArtiesten, getGroepen, getZalen, getVoorstellingen, getOptredens, getDonateurs]);

    function update() {
    }
    function submitHandler(event) {
        event.preventDefault();
    }
    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className='text-white display-5 mb-4 d-block'>
                Dashboard
            </div>
            <br />
            <div>
                <label className='text-white display-6 mb-1 d-block'>Getters(Ophalen)</label>
                <br />
                {/* <button onClick={update}>Update</button> */}
                <button onClick={() => setGetter('GetAdmins')}>Admins</button>
                <button onClick={() => setGetter('GetMedewerkers')}>Medewerkers</button>
                <button onClick={() => setGetter('GetArtiesten')}>Artiesten</button>
                <button onClick={() => setGetter('GetGroepen')}>Groepen</button>
                <button onClick={() => setGetter('GetDonateurs')}>Donateurs</button>
                <button onClick={() => setGetter('GetZalen')}>Zalen</button>
                <button onClick={() => setGetter('GetVoorstellingen')}>Voorstellingen</button>
                <button onClick={() => setGetter('GetOptredens')}>Optredens</button>
            </div>
            <br />
            <div>
                <Admin getEntry={getter} />
                <Medewerker getEntry={getter} />
                <Artiest getEntry={getter} />
                <Groep getEntry={getter} />
                <Donateur getEntry={getter} />
                <Zaal getEntry={getter} />
                <Voorstelling getEntry={getter} />
                <Optreden getEntry={getter} />
                <div>
                    <label className='text-white display-6 mb-1 d-block'>Setters(Aanmaken)</label>
                    <br />
                    {/* <button onClick={submitHandler}>Reset</button> */}
                    <button onClick={() => setSetter('PostAdmin')}>Admin</button>
                    <button onClick={() => setSetter('PostMedewerker')} disabled>Medewerker</button>
                    <button onClick={() => setSetter('PostArtiest')}>Artiest</button>
                    <button onClick={() => setSetter('PostGroep')}>Groep</button>
                    <button onClick={() => setSetter('PostZaal')} disabled>Zaal</button>
                    <button onClick={() => setSetter('PostVoorstelling')}>Voorstelling</button>
                    <button onClick={() => setSetter('PostOptreden')} disabled>Optreden</button>
                </div>
                <br />
                <Admin postEntry={setter} />
                <Medewerker postEntry={setter} />
                <Artiest postEntry={setter} />
                <Groep postEntry={setter} />
                <Voorstelling postEntry={setter} />
                <Optreden postEntry={setter} />
            </div>
        </div>
    );
}