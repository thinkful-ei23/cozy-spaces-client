import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { storeReturningUser } from '../actions/auth';

class LandingPage extends Component {
    setReturnUser() {
        this.props.dispatch(storeReturningUser());
    }

    render(){
        if (this.props.returningUser) {
            return <Redirect to="/dashboard" />;
        }
            return (
                <main role="main">
                    <div>
                        <h2>Find a cozy space</h2>
                        <p>Not all public spaces are created equally cozy. FIND YOUR COZY PLACE BECAUSE THE DARK OF WINTER WILL GET YOU IF YOU DON'T.</p>
                        <button onClick={() => {this.setReturnUser()}}>Become cozy</button>
                    </div>
                </main>
            );
        }
}

const mapStateToProps = state => ({
    returningUser : state.auth.returningUser
});

export default connect(mapStateToProps)(LandingPage);