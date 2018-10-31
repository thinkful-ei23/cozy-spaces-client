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

    const buttonStyle = {
      margin: '5px'
    }

    let registerButton = <Link style={buttonStyle} to="/register">Register</Link>;
    let loginButton = <Link style={buttonStyle} to="/login">Log in</Link>;
    let faqsButton = <Link style={buttonStyle} id="faqsButton" to="/faqs">FAQ</Link>;
    let logOutButton,
    profileButton;

    if (this.props.loggedIn) {
      logOutButton = (
        <button style={buttonStyle} id="logoutButton" onClick={() => this.logOut()}>
          Log out
        </button>
      );
      profileButton = (
        <Link style={buttonStyle} id="profileButton" to="/profile">Profile</Link>
      )
      loginButton = null;
      registerButton = null;
    }

    return (
      <header>
        <h1>Cozy Places</h1>
        {faqsButton}
        {loginButton}
        {registerButton}
        {profileButton}
        {logOutButton}
      </header>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Header);
