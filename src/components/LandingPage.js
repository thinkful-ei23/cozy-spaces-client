import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearAuth } from '../actions/auth';

export class LandingPage extends Component {

    render(){
        let logOut;
        if (this.props.loggedIn) {
            logOut =  <button onClick={() => this.logOut()}>Log out</button>
        }

        return (
            <main role="main">
                <div><Link to="/register">Register</Link></div>
                <div><Link to="/login">Log in</Link></div>
                {logOut}
            </main>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);