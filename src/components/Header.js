import React, {Component} from 'react';
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
    let faqsButton = <Link style={buttonStyle} id="faqsButton" to="/learn-more">Learn more</Link>;
    let logOutButton;
    let profileButton;
    let dashboardButton = <Link style={buttonStyle} id='dashboardButton' to="/dashboard">Dashboard</Link>;

    if (this.props.loggedIn) {
      console.log('Logged in? ', true);
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
    } else {
      console.log('Logged in? ', false);
    }

    if (window.location.pathname === '/dashboard') {
      console.log('Dashboard: ', true);
    } else {
      console.log('Dashboard: ', false);
    }

    return (
      <header>
        <Link to="/dashboard"><h1>Cozy Spaces</h1></Link>
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
  loggedIn: state.auth.currentUser
});

export default connect(mapStateToProps)(Header);
