import React, { Fragment }  from 'react';
import { connect } from 'react-redux'; 

class Ratings extends React.Component {

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
        </Fragment>
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
  ratingError: state.ratings.error
});

export default connect(mapStateToProps)(Ratings);