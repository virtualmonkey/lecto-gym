import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Redirect, Switch } from "react-router-dom";

class RouterApp extends React.Component {

  render() {
    return (
      <Fragment>
        <Switch>
          <Redirect to="/" />
        </Switch>
      </Fragment>
    );
  }
}

export default withRouter(RouterApp);
