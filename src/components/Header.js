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


    let registerButton = (
      <Link to="/register">
        <p className='inline'>
          Register
        </p>
      </Link>
    );
    let loginButton = (
      <Link to="/login">
        <p className='inline'>
          Log in
        </p>
      </Link>
    );
    let faqsButton = (
      <Link id="faqsButton" to="/learn-more">
        <p className='inline'>
          Learn more
        </p>
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
            <a className='social-icons' href='https://github.com/thinkful-ei23/cozy-spaces-client'>
              <i className="fab fa-github" />
            </a>
            <a className='social-icons' href="https://twitter.com/CozySpaces">
              <i className="fab fa-twitter" />
            </a>
            <a className='social-icons' href="https://facebook.com/CozySpaces">
              <i className="fab fa-facebook-f" />
            </a>
            <a className='social-icons' href="https://twitter.com/CozySpaces">
              <i className="fab fa-youtube" />
            </a>
          </div>
          <span id='navbar-toggle' className='profile-icon'><i class='fas fa-user-circle'></i></span>
        </div>

        {faqsButton}
        {addAListingLink}
        {loginButton}
        {registerButton}
        {profileButton}
        {logOutButton}
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
