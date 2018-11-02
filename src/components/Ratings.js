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
              <li>{specificRating.warmLighting}</li>
              <li>{specificRating.relaxedMusic}</li>
              <li>{specificRating.softFabrics}</li>
              <li>{specificRating.comfySeating}</li>
              <li>{specificRating.hotFoodDrink}</li>
          </ul>
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