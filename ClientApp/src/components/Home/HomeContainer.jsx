import React from 'react';
import ReactDOM from 'react-dom';
import { SimpleSlider } from './SimpleSlider';
import { Title } from './Title';
import { Cards } from './Cards';
import { Sections } from './Sections';
import { News } from './News';
import '../../stylesheets/Home.css';

const img_url = 'https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg';

const placeholder_obj = {
  img_path: img_url,
  title: 'Title',
  text: 'This is some text',
  btn_text: 'Click here',

  img_path2: img_url,
  title2: 'Another Title',
  text2: 'This is some more text',
  btn_text2: 'Click here'
};

export function HomeContainer() {
  return (
    <div className='container_home'>
      <Title />
      <Cards>
        <SimpleSlider />
      </Cards>
    </div>
  );
}