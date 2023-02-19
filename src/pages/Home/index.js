import React, { Fragment } from 'react';
import './index.scss'

import Footer from '../../components/Footer';

const Home = () => {
  return (
    <Fragment >
      <div className='home-container'>
        <h1>This is the home page</h1>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Home;