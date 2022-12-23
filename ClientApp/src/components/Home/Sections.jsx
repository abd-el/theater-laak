import React from 'react';
import ReactDOM from 'react-dom';
import '../../stylesheets/Home.css';
import '../../stylesheets/Sections.css'

const img_url = 'https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg';

export function Sections() {
    return (
        <div className='container_sections'>
            <div className='container_section_1'>
                <img className='test1' src={img_url} alt='' />
                <div className='textblock'>
                    <h1>Title</h1>
                    <p>This is some text</p>
                </div>
            </div>

            <div className='container_section_2'>
                <img className='test2' src={img_url} alt='' />
                <div className='textblock'>
                    <h1>Another Title</h1>
                    <p>This is some more text</p>
                </div>
            </div>
        </div>
    );
}