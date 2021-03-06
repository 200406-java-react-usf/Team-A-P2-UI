import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Provider } from 'react-redux';
import { store } from './Store';

import Entrance from './scene/Entrance/EntranceContainer';
import Spaceship from './scene/SpaceShip/SpaceshipContainer';

function App() {
  return (
    <>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Entrance/>} />
          <Route exact path="/spaceship" render={() => <Spaceship/>} />
        </Switch>
      </Router>
      </Provider>
    </>
  );
}

export default App;
