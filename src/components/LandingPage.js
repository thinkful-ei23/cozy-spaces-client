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
                <main className='textCenter' role="main">
                  <h2>Find <i>your</i> cozy space</h2>
                  <img className='main-orange-border' src='.\img\kris-atomic-39750-unsplash.jpg' alt='cozy space' />
                  <p>Not all public spaces are equally cozy. In dark times, a warm and welcoming space can be a lifesaver. Search for these spaces near you, or join our community of cozy-seekers to determine which spaces are truly cozy.</p>
                  <button onClick={() => {this.setReturnUser()}}>Become cozy</button>
                </main>
            );
        }
}

const mapStateToProps = state => ({
    returningUser : state.auth.returningUser
});

export default connect(mapStateToProps)(LandingPage);