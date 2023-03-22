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
import Week from '../pages/Week';
import Exercise from '../pages/Exercise';

//Components
import Nav from '../components/Nav';

// TODO: change this redirect to a 404/not found page
const RestrictedRoute = ({ component: Component, isAuthenticated, ...props }) => (
  <Route
    {...props}
    render={props =>
      isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

const RouterApp = ({
  isAuthenticated
}) => {
  return (
    <Fragment>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <RestrictedRoute
          exact
          path={`/dashboard`}
          component={Dashboard}
          isAuthenticated={isAuthenticated}
        />
        <RestrictedRoute
          exact
          path={`/tutorial`}
          component={Tutorial}
          isAuthenticated={isAuthenticated}
        />
        <RestrictedRoute
          exact
          path={`/initial-test-intro`}
          component={InitialTestIntro}
          isAuthenticated={isAuthenticated}
        />
        <RestrictedRoute
          exact
          path={`/initial-test-lecture`}
          component={InitialTestLecture}
          isAuthenticated={isAuthenticated}
        />
        <RestrictedRoute
          exact
          path={`/initial-test-questions`}
          component={InitialTestQuestions}
          isAuthenticated={isAuthenticated}
        />
        <RestrictedRoute
          exact
          path={`/week/:id`}
          component={Week}
          isAuthenticated={isAuthenticated}
        />
        <RestrictedRoute
          exact
          path={`/exercise/:itemId/:userItemId`}
          component={Exercise}
          isAuthenticated={isAuthenticated}
        />
        <Redirect to="/" />
      </Switch>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: selectors.isAuthenticated(state),
});

export default withRouter(connect(mapStateToProps)(RouterApp));
