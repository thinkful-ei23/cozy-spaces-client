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

    let displayNoneStyle = {
      display: 'none'
    }

    let registerButton = (
      <li>
        <Link className='block' to="/register" onClick={() => this.toggleProfileNavbar()}>
          Register
        </Link>
      </li>
    );
    let loginButton = (
      <li>
        <Link className='block' to="/login" onClick={() => this.toggleProfileNavbar()}>
          Log in
        </Link>
      </li>
    );
    let faqsButton = (
      <li>
        <Link onClick={() => this.toggleMainNavbar()} className='block' id="faqsButton" to="/learn-more">
          Learn more
        </Link>
      </li>
    );
    let logOutButton;
    let profileButton;
    let addAListingLink;

    if (this.props.loggedIn) {
      logOutButton = (
        <li onClick={() => this.toggleProfileNavbar()}>
          <button
            className='block'
            id="logoutButton"
            onClick={() => this.logOut()}
            >
            Log out
          </button>
        </li>
      );
      profileButton = (
        <li>
          <Link onClick={() => this.toggleProfileNavbar()} className='block' id="profileButton" to="/profile">
            Profile
          </Link>
        </li>
      );
      addAListingLink = (
        <li>
          <Link onClick={() => this.toggleMainNavbar()} className='block' id="addListingLink" to="/add-listing">
            Add a cozy space
          </Link>
        </li>
      );
      loginButton = (
        <li style={displayNoneStyle}>
          <Link onClick={() => this.toggleProfileNavbar()} className='block' to="/login">
            Log in
          </Link>
        </li>
      );
      registerButton = (
        <li style={displayNoneStyle}>
          <Link onClick={() => this.toggleProfileNavbar()} className='block' style={displayNoneStyle} to="/register">
            Register
          </Link>
        </li>
      );;
    }

    return (
      <header>
        <div className='header-icons'>
          <span id='navbar-toggle' className='bars-icon' onClick={() => this.toggleMainNavbar()}><i className="fas fa-bars"/></span>
          <span id='navbar-toggle' className='profile-icon' onClick={() => this.toggleProfileNavbar()}><i className='fas fa-user-circle'></i></span>
        </div>
        <nav id='main-nav'>
          <ul className='main-nav-ul' >
            {faqsButton}
            {addAListingLink}
          </ul>
        </nav>
        <nav id='profile-nav'>
          <ul className='profile-nav-ul'>
            {loginButton}
            {registerButton}
            {profileButton}
            {logOutButton}
          </ul>
        </nav>
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
