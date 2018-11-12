import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { Link } from 'react-router-dom';
import { clearAuthToken } from '../local-storage';
import '../styles/header.css';


class Header extends Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  componentDidMount() {
    let mainNav = document.getElementById('main-nav');
    mainNav.style.display = "none";
    let profileNav = document.getElementById('profile-nav');
    profileNav.style.display = "none";
  }

  toggleMainNavbar() {
    let mainNav = document.getElementById('main-nav');
    let profileNav = document.getElementById('profile-nav');
    if (mainNav.style.display === 'none') {
      mainNav.style.display = 'block';
      profileNav.style.display = 'none';
    } else {
      mainNav.style.display = 'none';
    }
  }
  toggleProfileNavbar() {
    let profileNav = document.getElementById('profile-nav');
    let mainNav = document.getElementById('main-nav');
    if (profileNav.style.display === 'none') {
      profileNav.style.display = 'block';
      mainNav.style.display = 'none';
    } else {
      profileNav.style.display = 'none';
    }
  }

  render() {

    let registerButton = (
      <Link className='block' to="/register">
        Register
      </Link>
    );
    let loginButton = (
      <Link className='block' to="/login">
        Log in
      </Link>
    );
    let faqsButton = (
      <Link className='block' id="faqsButton" to="/learn-more">
        Learn more
      </Link>
    );
    let logOutButton;
    let profileButton;
    let addAListingLink;

    if (this.props.loggedIn) {
      logOutButton = (
        <button
          className='block'
          id="logoutButton"
          onClick={() => this.logOut()}
        >
          Log out
        </button>
      );
      profileButton = (
        <Link className='block' id="profileButton" to="/profile">
          Profile
        </Link>
      );
      addAListingLink = (
        <Link className='block' id="addListingLink" to="/add-listing">
          Add a cozy space
        </Link>
      );
      loginButton = null;
      registerButton = null;
    }

    return (
      <header>
        <div className='header-icons'>
          <span id='navbar-toggle' className='bars-icon' onClick={() => this.toggleMainNavbar()}><i className="fas fa-bars"/></span>
          <span id='navbar-toggle' className='profile-icon' onClick={() => this.toggleProfileNavbar()}><i className='fas fa-user-circle'></i></span>
        </div>
        <div id='main-nav'>
        {faqsButton}
        {addAListingLink}
        </div>
        <div id='profile-nav'>
          {profileButton}
          {loginButton}
          {registerButton}
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
