import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input2';
import {login} from '../actions/auth';
import {required, nonEmpty, validateEmail} from '../validators';

export class LoginForm extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(login(values.username, values.password));
    }

    render() {
        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }
        return (
          <React.Fragment>
            <p className="loginText">Please login</p> 
            <form
                className="login-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                {error}
                <label htmlFor="username">Username</label>
                <Field
                    component={Input}
                    type="text"
                    name="username"
                    id="username"
                    placeholder="username"
                    autocomplete="username"
                    validate={[required, nonEmpty]}
                />
                <label htmlFor="email">Email</label>
                <Field
                    component={Input}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    autocomplete="email"
                    validate={[required, nonEmpty, validateEmail]}
                />
                <label htmlFor="password">Password</label>
                <Field
                    component={Input}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="enter password"
                    autocomplete="current-password"
                    validate={[required, nonEmpty]}
                />
                <button className="login" disabled={this.props.pristine || this.props.submitting}>
                    Cozy up!
                </button>
            </form>
          </React.Fragment>
        );
    }
}

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);
//