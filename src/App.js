import React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import RouterApp from './router';

const App = () =>  {
  return (
    <Router basename="/lecto-gym">
      <Route path='' component={RouterApp} />
    </Router>
  );
}

export default App;
