import React from "react";
import {HashRouter as Router, Route} from 'react-router-dom';
import RouterApp from './router';

const App = () =>  {
  return (
    <Router>
      <Route path='' component={RouterApp} />
    </Router>
  );
}

export default App;
