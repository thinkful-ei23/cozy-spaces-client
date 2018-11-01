import React, { Fragment }  from 'react';
import { connect } from 'react-redux'; 

class UserRatings extends React.Component {
  render() {


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

export default connect(mapStateToProps)(UserRatings);