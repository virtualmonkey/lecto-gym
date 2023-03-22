import React, { Fragment } from 'react';
import './index.scss';
import { useParams } from 'react-router-dom'

import exercise from '../../utils/images/exercise-2-week-1.jpg';

const Exercise = () => {
  const {itemId, userItemId} = useParams();

  console.log(itemId, userItemId);
  return (
    <Fragment>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'flex-start',
          margin: '24px 0 24px',
        }}
      >
        <img 
          style={{
            width: '597px',
            height: '842px',
          }}
          src={exercise} alt='exercise'/>
      </div>
    </Fragment>
  );
};

export default Exercise;