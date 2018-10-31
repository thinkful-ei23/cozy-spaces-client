import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { Link } from 'react-router-dom';
import { clearAuthToken } from '../local-storage';

class Header extends Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    let logOut;
    console.log('test', this.props.loggedIn);
    if (this.props.loggedIn) {
      logOut = (
        <button id="logoutButton" onClick={() => this.logOut()}>
          Log out
        </button>
      );
    }

    return (
      <header>
        <h1>Cozy Places</h1>
        <div>
          <Link to="/register">Register</Link>
        </div>
        <div>
          <Link to="/login">Log in</Link>
        </div>
        {logOut}
      </header>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Header);
