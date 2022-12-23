import React from 'react';
import ReactDOM from 'react-dom';
import bios from '../images/bios.jpg';
import tht from '../images/tht.jpg';
import Theater from '../images/Theater.png';
import placeholder from '../images/placeholder.jpg';
import '../../stylesheets/Home.css';


export function Image() {
    return (
        <div className='container_image'>
            <img src={placeholder} alt='image' className='image' />
        </div>
    );
}