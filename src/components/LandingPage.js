import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export function LandingPage(props) {

    return (
        <main role="main">
          <div><Link to="/register">Register</Link></div>
          <div><Link to="/login">Log in</Link></div>
        </main>
    );
}

export default connect()(LandingPage);