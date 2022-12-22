import React from 'react';
import ReactDOM from 'react-dom';
import '../../styling/Home.css';

export function Cards({ children }) {
    return (
        <div className='container_cards'>
            {children}
        </div>
    );
}