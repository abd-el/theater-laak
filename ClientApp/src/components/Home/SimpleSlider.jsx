import React, { useEffect } from "react";
import Slider from "react-slick";
import '../../stylesheets/Slider.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { backendApi } from "../api";
import { useState } from "react";
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
    afbeelding: 'https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg',
    titel: 'Placeholder title',
    beschrijving: 'Placeholder content',
  };


  const [voorstellingen, setVoorstellingen] = useState();

  async function fetchMovies() {
    const resp = await backendApi.get('/api/Programmering/Voorstellingen');
    const list = [];
    if (resp.status == 200) {
      console.log(resp.data);
      setVoorstellingen(resp.data);
    }
    else {
      console.log(resp.status + ' ' + resp.statusText);
    }
  };

  useEffect(() => {
    const awaiter = async () => {
      await fetchMovies();
    }
    awaiter();
  }, []);

  useEffect(() => {
    if(voorstellingen != null){
      console.log(voorstellingen[3].afbeelding);
    }
  }, [voorstellingen]);

  //const Movies = [{obj : 0},{obj : 1},{obj : 2}];
  //Movies[];
  //<Card {...Movies[0]}/>
  //<Card {...Movies[1]}/>
  //<Card {...Movies[2]}/>
  

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="slider-item 1">
          <Card voorstellingen = { voorstellingen != null ? voorstellingen[3] : placeholder } />
        </div>
        <div className="slider-item 2">
          <Card voorstellingen = { voorstellingen != null ? voorstellingen[4] : placeholder } />
        </div>
        <div className="slider-item 3">
          <Card voorstellingen = { voorstellingen != null ? voorstellingen[5] : placeholder } />
        </div>
        <div className="slider-item 4">
          <Card voorstellingen = { voorstellingen != null ? voorstellingen[6] : placeholder } />
        </div>
        <div className="slider-item 5">
          <Card voorstellingen = { voorstellingen != null ? voorstellingen[7] : placeholder } />
        </div>
        <div className="slider-item 6">
          <Card voorstellingen = {placeholder} />
        </div>
      </Slider>
    </div>
  );
}