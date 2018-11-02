import React, { Fragment }  from 'react';
import { connect } from 'react-redux'; 
import { fetchRatingsByUser } from '../actions/ratings';

class Ratings extends React.Component {

  componentDidMount() {
    if (!this.props.specificPlace) {
        const id = this.props.match.params.id;
        this.props.dispatch(fetchRatingsByUser(id));
    }
}

  render() {
console.log('this.props: ', this.props);

    return (
      <Fragment>
        <h4>Your Ratings</h4>
        <ul>
            <li>{this.props.ratings.rating.warmLighting}</li>
            <li>{this.props.ratings.rating.relaxedMusic}</li>
            <li>{this.props.ratings.rating.softFabrics}</li>
            <li>{this.props.ratings.rating.comfySeating}</li>
            <li>{this.props.ratings.rating.hotFoodDrink}</li>
        </ul>
        </Fragment>
    );
  }
}
const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    ratings: currentUser.ratings
  }
};

export default connect(mapStateToProps)(Ratings);