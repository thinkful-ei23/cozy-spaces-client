import React from 'react';
import {Field, reduxForm, focus} from 'redux-form'; 
import Input from './Input';
import { required } from '../validators';
import { postRating } from '../actions/ratings';
import { fetchRatingsByPlaceId } from '../actions/ratings';
import { fetchPlaceByID } from '../actions/places';


class RatingsForm extends React.Component {
  onSubmit(values) {
    const rating = {
      placeId : this.props.place.id,
      rating : {
        warmLighting: parseInt(values.warmLighting, 10),
        relaxedMusic: parseInt(values.relaxedMusic, 10),
        calmEnvironment: parseInt(values.calmEnvironment, 10),
        softFabrics: parseInt(values.softFabrics, 10),
        comfySeating: parseInt(values.comfySeating, 10),
        hotFoodDrink: parseInt(values.hotFoodDrink, 10),
        comment: values.comment
      }
    }
    return this.props.dispatch(postRating(rating))
    .then(() => this.props.dispatch(fetchRatingsByPlaceId(this.props.place.id)))
    .then(() => this.props.dispatch(fetchPlaceByID(rating.placeId)))
  }

  render() {
    let error;
    if (this.props.submitFailed) {
        error = (
             <div className="form-error" aria-live="polite">
               {this.props.error}
             </div>
        );
    }
      return (
        <section className='padding10px section topBottomMargin8px'>
          <h3>Rate the cozyness!</h3>
          <form  className="ratings-form"
            onSubmit={this.props.handleSubmit(values =>
                this.onSubmit(values)
            )}>
            {error}
            <Field
                component={Input}
                type="number"
                name="warmLighting"
                id="warmLighting"
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
            <Field
                component={Input}
                type="textarea"
                name="comment"
                label="Comments"
              />
            <button
              className='button'
              type="submit"
              disabled={this.props.pristine || this.props.submitting}>
              Rate it
            </button>
          </form>
        </section>
      );
}
}

export default reduxForm({
  form: 'makeRating',
  onSubmitFail: (error, dispatch) =>{
      dispatch(focus('makeRating', Object.keys(error)[0]))
}})(RatingsForm);