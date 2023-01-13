import React from 'react';
import ReactDOM from 'react-dom';

//const img_url = 'https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg';

export function Card(props) {
    return (
        <>
            <div className="card text-white bg-dark mb-3" style={{ width: '18rem' }}>
                <img className="card-img-top" src={props.voorstellingen.afbeelding} alt="Card image cap" height={300} width={300}/>
                <br/>
                <div className="card-body">
                    <h3 className="card-title"  >{props.voorstellingen.titel}</h3>
                    <br/>
                    <a href="#" className="btn btn-danger ">ga naar voorstelling</a>
                </div>
            </div>
        </>);
}