import React, { Fragment }  from 'react';
import {Field, reduxForm, focus} from 'redux-form'; 
import Input from './Input';
import { required } from '../validators';
import { editRating } from '../actions/ratings';

class EditRatingForm extends React.Component {
  onSubmit(values) {
    console.log(values);
    const rating = {
      placesLink : this.props.place._id,
      rating : {
        warmLighting: parseInt(values.warmLighting, 10),
        relaxedMusic: parseInt(values.relaxedMusic, 10),
        calmEnvironment: parseInt(values.calmEnvironment, 10),
        softFabrics: parseInt(values.softFabrics, 10),
        comfySeating: parseInt(values.comfySeating, 10),
        hotFoodDrink: parseInt(values.hotFoodDrink, 10)
      }
    }
    console.log(rating);
    return this.props.dispatch(editRating(rating))
  }

  render() {
    let error;
    let success;
      return (
        <Fragment>
          <h4>Change your mind? Edit your rating here</h4>
          <form  className="ratings-form"
            onSubmit={this.props.handleSubmit(values =>
                this.onSubmit(values)
            )}>
            {error}
            {success}
            <Field
                component={Input}
                type="number"
                name="warmLighting"
                label="Warm Lighting"
                min='0'
                max='5'
                validate={[required]}
              />
            <Field
                component={Input}
                type="number"
                name="relaxedMusic"
                label="Relaxed Music"
                min='0'
                max='5'
                validate={[required]}
              />
            <Field
                component={Input}
                type="number"
                name="calmEnvironment"  
                label="Calm environment"
                min='0'
                max='5'
                validate={[required]}
              />
            <Field
                component={Input}
                type="number"
                name="softFabrics"
                label="Soft fabrics in space (walls or floor)"
                min='0'
                max='5'
                validate={[required]}
              />
            <Field
                component={Input}
                type="number"
                name="comfySeating"
                label="Comfy Seating"
                min='0'
                max='5'
                validate={[required]}
              />
            <Field
                component={Input}
                type="number"
                name="hotFoodDrink"
                label="Hot Food and Drink"
                min='0'
                max='5'
                validate={[required]}
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
}
}

export default reduxForm({
  form: 'EditRatingForm',
  onSubmitFail: (errors, dispatch) =>
      dispatch(focus('EditRatingform', Object.keys(errors)[0]))
})(EditRatingForm);