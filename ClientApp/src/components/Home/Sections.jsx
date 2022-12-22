import React from 'react';
import ReactDOM from 'react-dom';
import '../../styling/Home.css';

export function Sections({ children }) {
    return (
        <div className='container_sections'>
            {children}
        </div>
    );
}