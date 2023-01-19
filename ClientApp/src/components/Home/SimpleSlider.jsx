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
  const [length, setLength] = useState();

  async function fetchMovies() {
    const resp = await backendApi.get('/api/Programmering/Voorstellingen');
    
    if (resp.status == 200) {
      let arr = [];
      arr = Array.from(resp.data);
      setVoorstellingen(arr);
      setLength(arr.length);
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
  

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="slider-item 1">
          <Card voorstellingen = { !voorstellingen ? placeholder : voorstellingen[length - 1] } />
        </div>
        <div className="slider-item 2">
          <Card voorstellingen = { !voorstellingen || length < 1 ? placeholder : voorstellingen[length - 2] } />
        </div>
        <div className="slider-item 3">
          <Card voorstellingen = { !voorstellingen || length < 2 ? placeholder : voorstellingen[length - 3] } />
        </div>
        <div className="slider-item 4">
          <Card voorstellingen = { !voorstellingen || length < 3 ? placeholder : voorstellingen[length - 4] } />
        </div>
        <div className="slider-item 5">
          <Card voorstellingen = { !voorstellingen || length < 4 ? placeholder : voorstellingen[length - 5] } />
        </div>
        <div className="slider-item 6">
          <Card voorstellingen = { !voorstellingen || length < 5 ? placeholder : voorstellingen[length - 6] } />
        </div>
      </Slider>
    </div>
  );
}