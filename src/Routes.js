import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "./pages/HomePage";

import RoomsPage from './pages/RoomsPage'

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={RoomsPage}/>

          <Route exact path="/booking" component={HomePage}/>

        <Route
          render={function () {
            return <h1>Not Found</h1>;
          }}
        />
      </Switch>
    );
  }
}

export default Routes;
