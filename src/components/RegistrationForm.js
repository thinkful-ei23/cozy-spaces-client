import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { registerUser } from '../actions/users';
// import { login } from '../actions/auth';
import Input from './Input';
import { required, nonEmpty, matches, length, isTrimmed, isEmail } from '../validators';

const passwordLength = length({ min: 8, max: 72 });
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
    onSubmit(values) {
        const { username, email, password} = values;
        const user = { username, email, password};
        return this.props
            .dispatch(registerUser(user));
            // .then(() => this.props.dispatch(login(username, password)));
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
            <form
              onSubmit={this.props.handleSubmit(values =>
                  this.onSubmit(values)
              )}>
              {error}
              <label htmlFor="username">Username</label>
              <Field
                  component={Input}
                  type="text"
                  name="username"
                  validate={[required, nonEmpty, isTrimmed]}
                  label="Username"
                />
                <label htmlFor="email">Email</label>
              <Field
                  component={Input}
                  type="email"
                  name="email"
                  validate={[required, nonEmpty, isTrimmed, isEmail]}
                  label="email"
                />
              <label htmlFor="password">Password</label>
              <Field
                  component={Input}
                  type="password"
                  name="password"
                  validate={[required, passwordLength, isTrimmed]}
                  label="Password"
              />
              <label htmlFor="passwordConfirm">Confirm password</label>    
              <Field
                  component={Input}
                  type="password"
                  name="passwordConfirm"
                  validate={[required, nonEmpty, matchesPassword]}
                  label="Confirm password"
              />
              <button
                className="btn-sub"
                type="submit"
                disabled={this.props.pristine || this.props.submitting}>
                Register
              </button>
           </form>
        );
    }
}

export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
