import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { registerUser } from '../actions/users';
import { login, storeReturningUser } from '../actions/auth';
import Input from './Input';
import { required, nonEmpty, matches, length, isTrimmed, isEmail } from '../validators';

const passwordLength = length({ min: 8, max: 72 });
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
    onSubmit(values) {
        const { username, email, password} = values;
        const user = { username, email, password};
        return this.props.dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(username, password, email)))
            .then(() => this.props.dispatch(storeReturningUser()));
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
        let success;
        if (this.props.submitSucceeded) {
            success = (
                <div className="form-success" aria-live="polite">
                    <p>Submit succeeded</p>
                </div>
            );
        }
        return (
            <form className='registration-form'
              onSubmit={this.props.handleSubmit(values =>
                  this.onSubmit(values)
              )}>
              {error}
              {success}
              <label htmlFor="username">Username</label>
              <Field
                  component={Input}
                  type="text"
                  name="username"
                  validate={[required, nonEmpty, isTrimmed]}
                />
              <label htmlFor="email">Email</label>  
              <Field
                  component={Input}
                  type="email"
                  name="email"
                  validate={[required, nonEmpty, isTrimmed, isEmail]}
                />
              <label htmlFor="password">Password</label> 
              <Field
                  component={Input}
                  type="password"
                  name="password"
                  validate={[required, passwordLength, isTrimmed]}
              /> 
              <label htmlFor="passwordConfirm">Confirm password</label>  
              <Field
                  component={Input}
                  type="password"
                  name="passwordConfirm"
                  validate={[required, nonEmpty, matchesPassword]}
              />
              <button
                className="button"
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
