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
      console.log(this.props.username);
      console.log(this.props.userId);
        return (
          <div>
            <h2>User Name: {this.props.username}</h2>
            <h2>User ID: {this.props.userId}</h2>
            <button onClick={() => this.deleteAccount(this.props.userId)}>Delete Account</button>
          </div>
        );
    }
}



const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: currentUser.username,
    userId: currentUser.id
  }
};

export default requiresLogin()(connect(mapStateToProps)(Profile));