import React, { Fragment }  from 'react';
import { connect } from 'react-redux'; 
import { fetchRatingsByUser, toggleEditRating } from '../actions/ratings';

class Ratings extends React.Component {

  //let editRatingForm = <EditRatingForm place={this.props.specificPlace}/>
  // this.props.editing

  render() {
    let ratingError;

    if (this.props.ratingError) {
      let ratingStatus = this.props.ratingError.status;
      if (ratingStatus === 404) {
        ratingError = <p>You have not yet rated this location</p>
      } else {
        ratingError = <p>{this.props.ratingError.message}</p>;
      }
    }

    if (this.props.specificRating && !this.props.ratingError) {
      let specificRating = this.props.specificRating.rating;
      return (
        <Fragment>
          <h4>Your Ratings</h4>
          {ratingError}
          <ul>
            <li>Warm lighting: {specificRating.warmLighting}</li>
            <li>Relaxed Music: {specificRating.relaxedMusic}</li>
            <li>Calm Environment: {specificRating.calmEnvironment}</li>
            <li>Soft fabrics in space (walls or floor): {specificRating.softFabrics} </li>
            <li>Comfy seating: {specificRating.comfySeating}</li>
            <li>Hot food/drink: {specificRating.hotFoodDrink}</li>
          </ul>
          {/* <button onClick={() => this.props.dispatch(toggleEditRating())}>Edit ratin</button><button onClick={() => console.log('delete button clicked')}>Delete</button> */}
        </Fragment>  //click on edit button: open EditRatingsForm, populated with ratings that are already in state, when submit button is clicked, values are captured and put request is dispatched to edit db and form disappears, then another fetch get to update ratings shown
      );
  } else if (this.props.ratingError) {
    return <p>{ratingError}</p>;
  } else {
    return <p>Loading</p>;
  }
}
}

const mapStateToProps = state => ({
  specificPlace: state.places.specificPlace,
  specificRating : state.ratings.specificRating,
  ratingError: state.ratings.error,
  editing: state.ratings.editing
});

export default connect(mapStateToProps)(Ratings);