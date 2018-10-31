import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearAuth } from '../actions/auth';

export class LandingPage extends Component {

    render(){
        return (
            <main role="main">
                <div>
                    <h2>Find a cozy space</h2>
                    <p>Not all spaces are created equal in terms of coziness</p>
                </div>
            </main>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);