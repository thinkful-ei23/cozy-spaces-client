import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { toggleEditRating, deleteRating } from '../actions/ratings';

class Ratings extends React.Component {
  //let editRatingForm = <EditRatingForm place={this.props.specificPlace}/>
  // this.props.editing

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
          <button className='button leftRightMargin8px' onClick={() => this.props.dispatch(toggleEditRating())}>
            Edit rating
          </button>
          <button className='button leftRightMargin8px' onClick={() => this.deleteRating()}>Delete</button>
        </div>
      );
    }

    if (this.props.specificRating && !this.props.ratingError) {
      let specificRating = this.props.specificRating.rating;
      return (
        <section className='textCenter your-ratings'>
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