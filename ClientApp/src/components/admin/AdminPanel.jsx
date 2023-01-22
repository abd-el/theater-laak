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

    return (
        <div>
            <div className='text-white display-5 mb-4 d-block fw-bold'>
                Dashboard
            </div>
            <br />
            <br />
            <div>
                <label className='text-white display-6 mb-1 d-block'>Getters(Ophalen)</label>
                <br />
                <button name='getAdmins' className="btn btn-dark" onClick={() => setGetter('GetAdmins')}>Admins</button>&nbsp;
                <button name='getMedewerkers' className="btn btn-dark" onClick={() => setGetter('GetMedewerkers')}>Medewerkers</button>&nbsp;
                <button name='getArtiesten' className="btn btn-dark" onClick={() => setGetter('GetArtiesten')}>Artiesten</button>&nbsp;
                <button name='getGroepen' className="btn btn-dark" onClick={() => setGetter('GetGroepen')}>Groepen</button>&nbsp;
                <button name='getDonateurs' className="btn btn-dark" onClick={() => setGetter('GetDonateurs')}>Donateurs</button>&nbsp;
                <button name='getZalen' className="btn btn-dark" onClick={() => setGetter('GetZalen')}>Zalen</button>&nbsp;
                <button name='getVoorstellingen' className="btn btn-dark" onClick={() => setGetter('GetVoorstellingen')}>Voorstellingen</button>&nbsp;
                <button name='getOptredens' className="btn btn-dark" onClick={() => setGetter('GetOptredens')}>Optredens</button>&nbsp;
                <button name='getVerzoeken' className="btn btn-dark" onClick={() => setGetter('GetNBOptredens')}>Verzoeken</button>&nbsp;
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
                    <button name='setAdmin' className="btn btn-dark" onClick={() => setSetter('PostAdmin')}>Admin</button>&nbsp;
                    <button name='setMedewerker' className="btn btn-dark" onClick={() => setSetter('PostMedewerker')}>Medewerker</button>&nbsp;
                    <button name='setArtiest' className="btn btn-dark" onClick={() => setSetter('PostArtiest')}>Artiest</button>&nbsp;
                    <button name='setGroep' className="btn btn-dark" onClick={() => setSetter('PostGroep')}>Groep</button>&nbsp;
                    <button name='setZaal' className="btn btn-dark" onClick={() => setSetter('PostZaal')} >Zaal</button>&nbsp;
                    <button name='setVoorstelling' className="btn btn-dark" onClick={() => setSetter('PostVoorstelling')}>Voorstelling</button>&nbsp;
                </div>
                <br />
                <Admin postEntry={setter} />
                <Medewerker postEntry={setter} />
                <Artiest postEntry={setter} />
                <Groep postEntry={setter} />
                <Zaal postEntry={setter} />
                <Voorstelling postEntry={setter} />
            </div>
        </div>
    );
}