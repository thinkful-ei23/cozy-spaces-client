import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import '../styles/forms.css';

export function LogIn(props) {
    if (props.loggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <main className='login-form textCenter' role="main">
          <h2>Log in</h2>
          <LoginForm />
          <p>Don't have an account? Go to the <Link to="/register">registration page</Link></p>
        </main>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LogIn);
