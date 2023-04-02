import React, { Fragment } from 'react';
import './index.scss'

import Footer from '../../components/Footer';

const Home = () => {
  return (
    <Fragment >
      <div className='home-container'>
        <h1 className='home__title'>
          Lecto Gym
        </h1>
        <h5 className='home__subtitle'>
          Mejora tu capacidad lectora y duplica tu rapidez lectora en solo unas semanas mediante divertidos retos interactivos
        </h5>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Home;