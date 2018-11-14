import React from 'react';
import {Field, reduxForm, /*focus*/} from 'redux-form'; 
import Input from './Input';
import { required } from '../validators';
import { editRating } from '../actions/ratings';
import { fetchRatingsByPlaceId } from '../actions/ratings';
import { fetchPlaceByID } from '../actions/places';
import { toggleEditRating } from '../actions/ratings';

class EditRatingForm extends React.Component {
  onSubmit(values) {
    let yourRatings = document.getElementById('your-ratings');
    let editRatingsForm = document.getElementById('edit-ratings-form');
    yourRatings.classList.remove('marginRight4');
    editRatingsForm.classList.remove('marginLeft4');
    const rating = {
      placeId : this.props.place._id,
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
    return this.props.dispatch(editRating(rating, this.props.rating._id))
    .then(() => this.props.dispatch(fetchRatingsByPlaceId(this.props.place._id)))
    .then(() => this.props.dispatch(fetchPlaceByID(this.props.place._id)))
  }

  cancelEditRating() {
    let yourRatings = document.getElementById('your-ratings');
    let editRatingsForm = document.getElementById('edit-ratings-form');
    console.log(yourRatings);
    yourRatings.classList.remove('marginRight4');
    editRatingsForm.classList.remove('marginLeft4');
    this.props.dispatch(toggleEditRating());
  }

  render() {
    let error;
    let success;
      return (
        <React.Fragment>
          <h3>Change your mind? Edit your rating here</h3>
          <p>Range: 0 - 5</p>
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
            <Field
                component={Input}
                type="textarea"
                name="comment"
                label="Comments"
              />
              <div className='flex space-evenly'>
                <button
                  className="button"
                  type="submit"
                  disabled={this.props.pristine || this.props.submitting}>
                  Rate it
                </button>
                <button className='button textCenter' onClick={() => this.cancelEditRating()}>
                  Cancel
                </button>
              </div>
          </form>
        </React.Fragment>
      );
}
}

export default reduxForm({
  form: 'EditRatingForm',
  // onSubmitFail: (errors, dispatch) =>
  //     dispatch(focus('EditRatingform', Object.keys(errors)[0]))
})(EditRatingForm);