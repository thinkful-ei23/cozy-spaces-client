import React from 'react';
import { connect } from 'react-redux';
import { fetchPlaceByID } from '../actions/places';
import { toggleEditRating, deleteRating, fetchRatingsByPlaceId } from '../actions/ratings';

class Ratings extends React.Component {

  deleteRating() {
    const id = this.props.placeId;
    return this.props
      .dispatch(deleteRating(this.props.specificPlace._id))
      .then(() => this.props.dispatch(fetchRatingsByPlaceId(id)))
      .then(() => this.props.dispatch(fetchPlaceByID(id)));
  }
  toggleEditRating() {
    let yourRatings = document.getElementById('your-ratings');
    let editRatingsForm = document.getElementById('edit-ratings-form');
    if (yourRatings.classList.contains('marginRight4')) {
      yourRatings.classList.remove('marginRight4');
      this.props.dispatch(toggleEditRating());
    } else {

      yourRatings.classList.add('marginRight4');
      this.props.dispatch(toggleEditRating());
    }
  }

  render() {
    let ratingError;

    if (this.props.ratingError) {
      let ratingStatus = this.props.ratingError.status;
      if (ratingStatus === 404) {
        ratingError = 'You have not yet rated this location';
      } else {
        ratingError = this.props.ratingError.message;
      }
    }
    let buttons;

    if (!this.props.editing) {
      buttons =  (
        <div className='flex space-evenly'>
          <button className='button leftRightMargin8px' onClick={() => this.toggleEditRating()}>
            Edit rating
          </button>
          <button className='button leftRightMargin8px' onClick={() => this.deleteRating()}>Delete</button>
        </div>
      );
    }

    if (this.props.specificRating && !this.props.ratingError) {
      let specificRating = this.props.specificRating.rating;
      return (
        <section id='your-ratings' className='section topBottomMargin10px your-ratings'>
          <h3>Your Ratings</h3>
          {ratingError}
          <ul>
            <li>Warm lighting: {specificRating.warmLighting}</li>
            <li>Relaxed Music: {specificRating.relaxedMusic}</li>
            <li>Calm Environment: {specificRating.calmEnvironment}</li>
            <li>
              Soft fabrics (walls or floor):{' '}
              {specificRating.softFabrics}{' '}
            </li>
            <li>Comfy seating: {specificRating.comfySeating}</li>
            <li>Hot food/drink: {specificRating.hotFoodDrink}</li>
            <li>Comments: {specificRating.comment}</li>
          </ul>
          {buttons}
        </section>
      );
    } else if (this.props.ratingError) {
      return ''
    } else {
      return <p>Loading</p>;
    }
  }
}

const mapStateToProps = state => ({
  specificPlace: state.places.specificPlace,
  specificRating: state.ratings.specificRating,
  ratingError: state.ratings.error,
  editing: state.ratings.editing
});

export default connect(mapStateToProps)(Ratings);
