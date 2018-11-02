import React, { Fragment }  from 'react';
import { connect } from 'react-redux'; 
import { fetchRatingsByUser } from '../actions/ratings';

class Ratings extends React.Component {

  componentDidMount() {
    console.log('in component did mount');
    const placeId = this.props.specificPlace._id;
    this.props.dispatch(fetchRatingsByUser(placeId));
  }

  render() {
    if (this.props.specificRating) {
      let specificRating = this.props.specificRating.rating;
      return (
        <Fragment>
          <h4>Your Ratings</h4>
          <ul>
            <li>Warm lighting: {specificRating.warmLighting}</li>
            <li>Relaxed Music: {specificRating.relaxedMusic}</li>
            <li>Calm Environment: {specificRating.calmEnvironment}</li>
            <li>Soft fabrics in space (walls or floor): {specificRating.softFabrics} </li>
            <li>Comfy seating: {specificRating.comfySeating}</li>
            <li>Hot food/drink: {specificRating.hotFoodDrink}</li>
          </ul>
          <button onClick={() => this.props.dispatch(editRating(specificRating.id))}>Edit</button><button onClick={() => this.props.dispatch(deleteRating(specificRating.id))}>Delete</button>
        </Fragment>
      );
  } else {
    return <p>Loading</p>;
  }
}
}

const mapStateToProps = state => ({
  specificPlace: state.places.specificPlace,
  specificRating : state.ratings.specificRating
});

export default connect(mapStateToProps)(Ratings);