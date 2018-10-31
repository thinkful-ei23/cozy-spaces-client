import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { Link } from 'react-router-dom';

export class Header extends Component {

  logOut() {
    this.props.dispatch(clearAuth());
  }

    render(){
      let logOut;
      if (this.props.loggedIn) {
        logOut =  <button onClick={() => this.logOut()}>Log out</button>
      }

        return (
          <div>
            <div><Link to="/register">Register</Link></div>
            <div><Link to="/login">Log in</Link></div>
            {logOut}
          </div>
        );
    }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Header);