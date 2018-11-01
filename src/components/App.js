import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import Header from './Header';
import Registration from './Registration';
import LogIn from './Login';
import Profile from './Profile';
import AddAListingPage from './AddAListingPage';
import LandingPage from './LandingPage';
import Listing from './Listing';
import Dashboard from "./Dashboard";
import LearnAboutCozy from "./LearnAboutCozy";

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
          <Route exact path="/places/:id" component={Listing} />
          <Route exact path="/learn-more" component={LearnAboutCozy} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));
