import React, { Component } from 'react';
import { SimpleSlider } from './SimpleSlider';
import '../styling/Home.css';

const theater = `https://media.istockphoto.com/photos/
high-contrast-image-of-movie-theater-screen-picture-id487619252?k=6&m=487619252&s=612x612&w=0&h=
yc_JV69FPuvIVNeukQpqZdcnIX7V-Vowj7Aih6sNue4=`;

export function Home() {


  return (
    <>
      <div className='container_image'>
        <img src={theater} alt='image' className='image' />
      </div>


      <div className='container_home'>

        <div className='container_title'>
          <h1 className='title_text'>Voorstellingen bij Theater Laak</h1>
        </div>

        <div className='container_cards'>
            
        </div>

        

        <div className='container_sections'>
          Bla
        </div>

        <div className='container_news'>
          Bla
        </div>

      </div>
    </>
  );

}
