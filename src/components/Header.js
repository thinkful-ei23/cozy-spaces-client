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

  componentDidMount() {
    let mainNav = document.getElementById('main-nav');
    let navbarToggle = document.getElementById('navbar-toggle');
    mainNav.style.display = "none";
  }

  toggleNavbar() {
    let mainNav = document.getElementById('main-nav');
    let navbarToggle = document.getElementById('navbar-toggle');
    if (mainNav.style.display === 'none') {
      mainNav.style.display = 'block';
    } else {
      mainNav.style.display = 'none';
    }
  }

  render() {


    let registerButton = (
      <Link to="/register">
        Register
      </Link>
    );
    let loginButton = (
      <Link to="/login">
        Log in
      </Link>
    );
    let faqsButton = (
      <Link id="faqsButton" to="/learn-more">
        Learn more
      </Link>
    );
    let logOutButton;
    let profileButton;
    let addAListingLink;

    if (this.props.loggedIn) {
      logOutButton = (
        <button
          id="logoutButton"
          onClick={() => this.logOut()}
        >
          Log out
        </button>
      );
      profileButton = (
        <Link id="profileButton" to="/profile">
          Profile
        </Link>
      );
      addAListingLink = (
        <Link id="addListingLink" to="/add-listing">
          Add a cozy space
        </Link>
      );
      loginButton = null;
      registerButton = null;
    }

    return (
      <header>
        <div className='header-icons'>
          <div className='inline icons-group1'>
            <a href='https://github.com/thinkful-ei23/cozy-spaces-client'>
              <i className="fab fa-github social-icons" />
            </a>
            <a href="https://twitter.com/CozySpaces">
              <i className="fab fa-twitter social-icons" />
            </a>
            <a href="https://facebook.com/CozySpaces">
              <i className="fab fa-facebook-f social-icons" />
            </a>
            <a href="https://twitter.com/CozySpaces">
              <i className="fab fa-youtube social-icons" />
            </a>
          </div>
          <span id='navbar-toggle' className='profile-icon' onClick={() => this.toggleNavbar()}><i className='fas fa-user-circle'></i></span>
        </div>
        <div id='main-nav'>
          {faqsButton}
          {addAListingLink}
          {loginButton}
          {registerButton}
          {profileButton}
          {logOutButton}
        </div>
        <Link to="/dashboard">
          <h1>Cozy Spaces</h1>
        </Link>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser
});

export default connect(mapStateToProps)(Header);
