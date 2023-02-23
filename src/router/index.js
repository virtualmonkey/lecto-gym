import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Redirect, Route, Switch } from "react-router-dom";

//Pages
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Tutorial from '../pages/Tutorial';

//Components
import Nav from '../components/Nav';

// TODO: restrict routes so that only authenticated users can reach them, otherwise redirect

const RouterApp = () => {
  return (
    <Fragment>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/tutorial" component={Tutorial} />
        <Redirect to="/" />
      </Switch>
    </Fragment>
  );
}

export default withRouter(RouterApp);
