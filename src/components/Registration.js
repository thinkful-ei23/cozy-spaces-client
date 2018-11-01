import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import RegistrationForm from './RegistrationForm';

export class RegistrationPage extends React.Component {

    render() {
    if (!this.props.informedUser) {
        return <Redirect to="/learn-more" />;
    }  

    if (this.props.loggedIn) {
        return <Redirect to="/" />;
    }


    return (
        <main role="main">
          <h2>Sign up</h2>
          <RegistrationForm />
          <p>Already have an account? Go to the <Link to="/login">login page</Link></p>
        </main>
    );
}
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    informedUser : state.auth.informedUser
});

export default connect(mapStateToProps)(RegistrationPage);
