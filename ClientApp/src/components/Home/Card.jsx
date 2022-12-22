import React from 'react';
import ReactDOM from 'react-dom';

const img_url = 'https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg';

export function Card({ img_path, title, text, btn_text }) {
    return (<>
        <div className="card text-white bg-secondary mb-3" style={{ width: '18rem' }}>
            <img className="card-img-top" src={img_path} alt="Card image cap" />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{text}</p>
                <a href="#" className="btn btn-light ">{btn_text}</a>
            </div>
        </div>
    </>);
}