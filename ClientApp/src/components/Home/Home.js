import React, { Component } from 'react';
import { Image } from './Image';
import { HomeContainer } from './HomeContainer';
import '../../stylesheets/Home.css';

export function Home() {
  return (
    <>
      <Image />
      <HomeContainer />
    </>
  );
}
