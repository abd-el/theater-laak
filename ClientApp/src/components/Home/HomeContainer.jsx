import React from 'react';
import ReactDOM from 'react-dom';
import { SimpleSlider } from './SimpleSlider';
import { Title } from './Title';
import { Cards } from './Cards';
import { Sections } from './Sections';
import { News } from './News';
import '../../stylesheets/Home.css';

export function HomeContainer() {
  return (
    <div className='container_home'>
      <Title />

      <Cards>
        <SimpleSlider />
      </Cards>

      <Sections />

      <News />
    </div>
  );
}