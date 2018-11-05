import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux'; 
import { fetchPlaceByID } from '../actions/places';
import Ratings from './Ratings'
import RatingsForm from './RatingsForm'


class Listing extends Component {

    componentDidMount() {
        if (!this.props.specificPlace) {
            const id = this.props.match.params.id;
            this.props.dispatch(fetchPlaceByID(id));
        }
    }

    render() {
    let ratings;
    let ratingsForm;
    // let editRatingForm; 
    if (this.props.loggedIn){
     ratings = <Ratings />
     ratingsForm = <RatingsForm place={this.props.specificPlace} />
    //  editRatingForm = <EditRatingForm />
    }
    let specificPlace = this.props.specificPlace
        if (specificPlace) {
            return (
          <Fragment>
            <div className="listing">
              <h2>{specificPlace.name}</h2>
              <h3>Type of place: {specificPlace.type}</h3>
              <h3>Overall coziness: {specificPlace.averageCozyness}</h3>
              <h3>Address: {specificPlace.address}, {specificPlace.city}, {specificPlace.state}</h3>
              <ul>
                  <li>Warm lighting: {specificPlace.averageWarmLighting}</li>
                  <li>Relaxed Music: {specificPlace.averageRelaxedMusic}</li>
                  <li>Calm Environment: {specificPlace.averageCalmEnvironment}</li>
                  <li>Soft fabrics in space (walls or floor): {specificPlace.averageSoftFabrics} </li>
                  <li>Comfy seating: {specificPlace.averageComfySeating}</li>
                  <li>Hot food/drink: {specificPlace.averageHotFoodDrink}</li>
              </ul>
            </div>
            {ratings}
            {ratingsForm}
            {/* {editRatingForm} */}
          </Fragment>
            );  

        } else {
            return <p>Loading</p>
        }
    }
}

const mapStateToProps = state => ({
    specificPlace : state.places.specificPlace,
    loggedIn : state.auth.currentUser,
    ratingError : state.ratings.error
});

export default connect(mapStateToProps)(Listing);
