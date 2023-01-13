import React from 'react';
import ReactDOM from 'react-dom';

const img_url = 'https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg';

export function Card({ Afbeelding, Titel, Beschrijving }) {
    return (<>
        <div className="card text-white bg-secondary mb-3" style={{ width: '18rem' }}>
            <img className="card-img-top" src={Afbeelding} alt="Card image cap" />
            <div className="card-body">
                <h5 className="card-title">{Titel}</h5>
                <p className="card-text">{Beschrijving}</p>
                <a href="#" className="btn btn-light ">open voorstelling</a>
            </div>
        </div>
    </>);
}