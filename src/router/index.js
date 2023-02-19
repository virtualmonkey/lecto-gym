import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Redirect, Route, Switch } from "react-router-dom";

//Pages
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';

//Components
import Nav from '../components/Nav';

class RouterApp extends React.Component {

  render() {
    return (
      <Fragment>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={SignIn} />
          <Redirect to="/" />
        </Switch>
      </Fragment>
    );
  }
}

export default withRouter(RouterApp);
