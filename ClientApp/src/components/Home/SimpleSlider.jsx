import React from "react";
import Slider from "react-slick";
import '../../stylesheets/Slider.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from './Card';

const img_url = 'https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg';

export function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplaySpeed: 4500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    accessibility: true,
    autoplay: true,

    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          swipe: true,
        }
      }
    ]
  };

  const placeholder = {
    img_path: 'https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg',
    title: 'Card title',
    text: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
    btn_text: 'Go somewhere'
  };

  const Movies = null;

  async function fetchMovies(){
    const response = await fetch('/api');
    const data = await response.json();
    Movies = data;
  };

  //const Movies = [{obj : 0},{obj : 1},{obj : 2}];
  //Movies[];
  //<Card {...Movies[0]}/>
  //<Card {...Movies[1]}/>
  //<Card {...Movies[2]}/>


  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="slider-item 1">
          <Card {...placeholder} />
        </div>
        <div className="slider-item 2">
          <Card {...placeholder} />
        </div>
        <div className="slider-item 3">
          <Card {...placeholder} />
        </div>
        <div className="slider-item 4">
          <Card {...placeholder} />
        </div>
        <div className="slider-item 5">
          <Card {...placeholder} />
        </div>
        <div className="slider-item 6">
          <Card {...placeholder} />
        </div>
      </Slider>
    </div>
  );
}