import React, { Component } from 'react';
import Registration from './Registration';
import LogIn from './Login';
import Profile from './Profile';
import AddAListingPage from './AddAListingPage';
import LandingPage from './LandingPage';
import { Route } from 'react-router-dom';
import { Dashboard } from "./Dashboard";
import { Header } from './Header';

class App extends Component {
  render() {
    return (
      <div className="app">
          <Header />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/register" component={Registration} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/add-listing" component={AddAListingPage} />
      </div>
    );
  }
}

export default App;
