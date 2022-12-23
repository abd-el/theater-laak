import React from 'react';
import ReactDOM from 'react-dom';
import '../../stylesheets/Home.css';
import '../../stylesheets/Sections.css'


export function Sections({ img_path, title, text, btn_text, img_path2, title2, text2, btn_text2 }) {
    return (
        <div className='container_sections'>
            <div className='container_section_1'>
                <img className='test1' src={img_path} alt='' />
                <div className='textblock'>
                    <h1>{title}</h1>
                    <p>{text}</p>
                    <a href="#" className="btn btn-light ">{btn_text}</a>
                </div>
            </div>

            <div className='container_section_2'>
                <img className='test2' src={img_path2} alt='' />
                <div className='textblock'>
                    <h1>{title2}</h1>
                    <p>{text2}</p>
                    <a href="#" className="btn btn-light ">{btn_text2}</a>
                </div>
            </div>
        </div>
    );
}