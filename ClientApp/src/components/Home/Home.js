import React, { Component } from 'react';
import { Image } from './Image';
import { HomeContainer } from './HomeContainer';
import '../../styling/Home.css';

export function Home() {
  return (
    <>
      <Image />
      <HomeContainer />
    </>
  );
}
