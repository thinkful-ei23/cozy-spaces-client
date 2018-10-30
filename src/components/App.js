import React, { Component } from 'react';
import Registration from './Registration';
import LogIn from './Login';
import LandingPage from './LandingPage';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="app">
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/register" component={Registration} />
          <Route exact path="/login" component={LogIn} />
      </div>
    );
  }
}

export default App;
