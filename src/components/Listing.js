import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux'; 
import Ratings from './Ratings';
import RatingsForm from './RatingsForm';
import EditRatingForm from './EditRatingForm';
import ReportListing from './ReportListing';
import { fetchPlaceByID, reportPlace, unReportPlace } from '../actions/places';
import { fetchRatingsByUser } from '../actions/ratings';
import { toggleEditRating, deleteRating } from '../actions/ratings';
import Comments from './Comments'

class Listing extends Component {

    componentDidMount() {
            const id = this.props.match.params.id;
            return this.props.dispatch(fetchPlaceByID(id))
            .then(() => this.props.dispatch(fetchRatingsByUser(id)));
    }

    deleteRating() {
        const id = this.props.match.params.id;
        return this.props.dispatch(deleteRating(this.props.specificPlace._id))
        .then(() => this.props.dispatch(fetchRatingsByUser(id)));
    }

    render() {
    let ratings;
    let ratingsFormPost;
    let ratingsFormEdit;
    let reportButton;

    if (this.props.loggedIn){
        ratings = <Ratings />
        reportButton = <ReportListing />
        if (!this.props.specificRating) {
            ratingsFormPost = <RatingsForm place={this.props.specificPlace} />
        } else {
            ratingsFormEdit = this.props.editing 
            ? 
            <div>
                <EditRatingForm rating={this.props.specificRating} place={this.props.specificPlace}/>
                <button onClick={() => this.props.dispatch(toggleEditRating())}>Cancel</button>
            </div> 
            :
            <div>
                <button onClick={() => this.props.dispatch(toggleEditRating())}>Edit rating</button>
                <button onClick={() => this.deleteRating()}>Delete</button>
            </div>; 
        }
    }

    let specificPlace = this.props.specificPlace;
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
            <Comments />
            {ratings}
            {ratingsFormPost}
            {ratingsFormEdit}
            {reportButton}
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
    currentUser : state.auth.currentUser,
    ratingError : state.ratings.error,
    specificRating : state.ratings.specificRating,
    editing : state.ratings.editing,
});

export default connect(mapStateToProps)(Listing);
