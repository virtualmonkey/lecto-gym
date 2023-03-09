import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import * as selectors from '../redux/rootReducer';

//Pages
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Tutorial from '../pages/Tutorial';
import InitialTestIntro from '../pages/InitialTestIntro';
import InitialTestLecture from '../pages/InitialTestLecture';
import InitialTestQuestions from '../pages/InitialTestQuestions';

//Components
import Nav from '../components/Nav';

// TODO: restrict routes so that only authenticated users can reach them, otherwise redirect
const RestrictedRoute = ({ component: Component, authUser, ...props }) => (
  <Route
    {...props}
    render={props =>
      authUser ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

const RouterApp = ({
  authUser
}) => {
  return (
    <Fragment>
      {/* TODO: add a condition not to show the nav based on if the user is in the initial test/final test */}
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <RestrictedRoute
          exact
          path={`/dashboard`}
          component={Dashboard}
          authUser={authUser}
        />
        <RestrictedRoute
          exact
          path={`/tutorial`}
          component={Tutorial}
          authUser={authUser}
        />
        <RestrictedRoute
          exact
          path={`/initial-test-intro`}
          component={InitialTestIntro}
          authUser={authUser}
        />
        <RestrictedRoute
          exact
          path={`/initial-test-lecture`}
          component={InitialTestLecture}
          authUser={authUser}
        />
        <RestrictedRoute
          exact
          path={`/initial-test-questions`}
          component={InitialTestQuestions}
          authUser={authUser}
        />
        <Redirect to="/" />
      </Switch>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  authUser: selectors.getAuthUser(state)
});

export default withRouter(connect(mapStateToProps)(RouterApp));
