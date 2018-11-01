import React, { Fragment }  from 'react';
import { connect } from 'react-redux'; 

class UserRatings extends React.Component {
  render() {


    return (
      <Fragment>
        <h4>Your Ratings</h4>
        <ul>
            <li>{this.props.userRatings.rating.warmLighting}</li>
            <li>{this.props.userRatings.rating.relaxedMusic}</li>
            <li>{this.props.userRatings.rating.softFabrics}</li>
            <li>{this.props.userRatings.rating.comfySeating}</li>
            <li>{this.props.userRatings.rating.hotFoodDrink}</li>
        </ul>
        </Fragment>
    );
  }
}
const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    userRatings: currentUser.ratings
  }
};

export default connect(mapStateToProps)(UserRatings);