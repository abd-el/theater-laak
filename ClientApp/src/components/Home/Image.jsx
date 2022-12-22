import React from 'react';
import ReactDOM from 'react-dom';
import bios from '../images/bios.jpg';
import tht from '../images/tht.jpg';
import Theater from '../images/Theater.png';
import placeholder from '../images/placeholder.jpg';
import '../../stylesheets/Home.css';

const theater = `https://media.istockphoto.com/photos/
high-contrast-image-of-movie-theater-screen-picture-id487619252?k=6&m=487619252&s=612x612&w=0&h=
yc_JV69FPuvIVNeukQpqZdcnIX7V-Vowj7Aih6sNue4=`; //placeholder image


export function Image() {
    return (
        <div className='container_image'>
            <img src={placeholder} alt='image' className='image' />
        </div>
    );
}