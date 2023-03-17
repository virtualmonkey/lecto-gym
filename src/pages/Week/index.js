import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';

const Week = () => {
  let { id } = useParams();

  return (
    <Fragment>
      <div>{`This is the Week ${id} page`}</div>
    </Fragment>
  );
};

export default Week;