import React from 'react';
import ReactDOM from 'react-dom';

const img_url = 'https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg';


export function Card() {
    return (<>
        <div className="card text-white bg-secondary mb-3" style={{ width: '18rem' }}>
            <img className="card-img-top" src={img_url} alt="Card image cap" />
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-light ">Go somewhere</a>
            </div>
        </div>
    </>);
}