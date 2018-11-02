import React, { Fragment }  from 'react';
import {Field, reduxForm, focus} from 'redux-form'; 
import Input from './Input';
import { isTrimmed } from '../validators';

class RatingsForm extends React.Component {
  onSubmit(values) {
    console.log(values);
    // const { username, email, password} = values;
    // const user = { username, email, password};
    // return this.props.dispatch(registerUser(user))
    //     .then(() => this.props.dispatch(login(username, password, email)))
    //     .then(() => this.props.dispatch(storeReturningUser()));
  }
  
  render() {
    let error;
    let success;
    if (this.props.specificRating) {
      let specificRating = this.props.specificRating.rating;
      return (
        <Fragment>
          <h4>Rate the cozyness!</h4>
          <form  className="ratings-form"
            onSubmit={this.props.handleSubmit(values =>
                this.onSubmit(values)
            )}>
            {error}
            {success}
            <Field
                component={Input}
                type="text"
                name="warmLighting"
                validate={isTrimmed}
                label="Warm Lighting"
                value={specificRating.warmLighting}
              />
            <Field
                component={Input}
                type="Input"
                name="relaxedMusic"
                validate={isTrimmed}
                label="Relaxed Music"
                value={specificRating.relaxedMusic}
              />
            <Field
                component={Input}
                type="Input"
                name="calmEnvironment"  
                validate={isTrimmed}
                label="Calm environment"
                value={specificRating.calmEnvironment}
              />
            <Field
                component={Input}
                type="Input"
                name="softFabrics"
                validate={isTrimmed}
                label="Soft fabrics in space (walls or floor)"
                value={specificRating.softFabrics}
              />
            <Field
                component={Input}
                type="Input"
                name="comfySeating"
                validate={isTrimmed}
                label="Comfy Seating"
                value={specificRating.comfySeating}
              />
            <Field
                component={Input}
                type="Input"
                name="hotFoodDrink"
                validate={isTrimmed}
                label="Hot Food and Drink"
                value={specificRating.hotFoodDrink}
              />
            <button
              className="btn-sub"
              type="submit"
              disabled={this.props.pristine || this.props.submitting}>
              Rate it
            </button>
          </form>
        </Fragment>
      );
  } else {
    return <p>Loading</p>;
  }
}
}

export default reduxForm({
  form: 'makeRating',
  onSubmitFail: (errors, dispatch) =>
      dispatch(focus('makeRating', Object.keys(errors)[0]))
})(RatingsForm);