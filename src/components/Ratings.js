import React, { Fragment }  from 'react';
import { connect } from 'react-redux'; 
import { fetchRatingsByUser, editRating } from '../actions/ratings';
import EditRatingForm from './EditRatingForm';

class Ratings extends React.Component {

  componentDidMount() {
    console.log('in component did mount');
    const placeId = this.props.specificPlace._id;
    this.props.dispatch(fetchRatingsByUser(placeId));
  }

  render() {
    if (this.props.specificRating && !this.props.editing) {
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
          <button onClick={() => this.props.dispatch(editRating())}>Edit</button><button onClick={() => console.log('delete button clicked')}>Delete</button>
        </Fragment>  //click on edit button: open EditRatingsForm, populated with ratings that are already in state, when submit button is clicked, values are captured and put request is dispatched to edit db and form disappears, then another fetch get to update ratings shown
      );
    } else if (this.props.specificRating && this.props.editing) {
      let specificRating = this.props.specificRating.rating; 
      let editRatingForm = <EditRatingForm />
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
          {editRatingForm}
          </Fragment>
      );
    } else {
    return <p>Loading</p>;
  }
}
}

const mapStateToProps = state => ({
  specificPlace: state.places.specificPlace,
  specificRating : state.ratings.specificRating,
  editing: state.ratings.editing
});

export default connect(mapStateToProps)(Ratings);