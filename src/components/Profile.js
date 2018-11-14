import React, { Component } from 'react';
import { connect } from 'react-redux';
import requiresLogin from "./requires-login";
import { deleteAccount } from '../actions/users';
import { clearAuth } from '../actions/auth';
import { clearAuthToken, clearReturningUser, clearInformedUser } from '../local-storage';

export class Profile extends Component {

  deleteAccount(userId) {
    this.props.dispatch(deleteAccount(userId))
    .then(this.props.dispatch(clearAuth()))
    .then(clearAuthToken())
    .then(clearReturningUser())
    .then(clearInformedUser())

  }

    render(){
        return (
          <section className='textCenter'>
            <h2>Profile Information</h2>
            <p>User Name: {this.props.username}</p>
            <p>User Email: {this.props.email}</p>
            <button className='button' onClick={() => this.deleteAccount(this.props.userId)}>Delete Account</button>
          </section>
        );
    }
}



const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: currentUser.username,
    userId: currentUser.id,
    email: currentUser.email
  }
};

export default requiresLogin()(connect(mapStateToProps)(Profile));