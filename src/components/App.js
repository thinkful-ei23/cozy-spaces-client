import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import { refreshAuthToken } from '../actions/auth';

class App extends Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      // When we are logged in, refresh the auth token periodically
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      // Stop refreshing when we log out
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 // One hour
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }

    clearInterval(this.refreshInterval);
  }

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
