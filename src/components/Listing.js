import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import Ratings from './Ratings';
import Comments from './Comments';
import RatingsForm from './RatingsForm';
import EditRatingForm from './EditRatingForm';
import ReportListing from './ReportListing';
import { fetchPlaceByID } from '../actions/places';
import { fetchRatingsByPlaceId } from '../actions/ratings';
import '../styles/listing.css';
import '../styles/ratings.css';

class Listing extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    return this.props.dispatch(fetchPlaceByID(id)).then(() => {
      if (this.props.loggedIn) {
        this.props.dispatch(fetchRatingsByPlaceId(id));
      }
    });
  }

  render() {
    let yourRatings;
    let ratingsFormPost;
    let ratingsFormEdit;
    let reportButton;

    if (this.props.loggedIn) {
      yourRatings = <Ratings placeId={this.props.match.params.id} />;
      reportButton = <ReportListing />;
      if (!this.props.specificRating) {
        ratingsFormPost = <RatingsForm place={this.props.specificPlace} />;
      } else {
        ratingsFormEdit = this.props.editing ? (
          <section id='edit-ratings-form' className="edit-rating-form section topBottomMargin10px">
            <EditRatingForm
              rating={this.props.specificRating}
              place={this.props.specificPlace}
            />
          </section>
        ) : null;
      }
    }

    let specificPlace = this.props.specificPlace;
    if (specificPlace) {
      return (
        <main className="listing-page">
          <section className="listing-info">
            <img
              alt={`${specificPlace.photos[0].caption}`}
              className="bottomShadow main-orange-border"
              src={`${specificPlace.photos[0].url}`}
            />
            <div className="listing-specific-info">
              <h2 className="textCenter">{specificPlace.name}</h2>
              <p className="textCenter">
                {specificPlace.address}, {specificPlace.city},{' '}
                {specificPlace.state}
              </p>
              <div className="flex space-around">
                <p>Type: {specificPlace.type}</p>
                <p>Cozy Rating: {specificPlace.averageCozyness}</p>
              </div>
            </div>
            <ul className="average-ratings flex1 section textCenter topBottomMargin10px topShadow">
                <h3>Average Ratings</h3>
                <li>Warm lighting: {specificPlace.averageWarmLighting}</li>
                <li>Relaxed Music: {specificPlace.averageRelaxedMusic}</li>
                <li>
                  Calm Environment: {specificPlace.averageCalmEnvironment}
                </li>
                <li>
                  Soft fabrics (walls or floor):{' '}
                  {specificPlace.averageSoftFabrics}{' '}
                </li>
                <li>Comfy seating: {specificPlace.averageComfySeating}</li>
                <li>Hot food/drink: {specificPlace.averageHotFoodDrink}</li>
              </ul>

          </section>
          <Comments />
          <div className="flexOnBig">
            {yourRatings}
            {ratingsFormEdit}
            </div>
          {ratingsFormPost}
          {reportButton}
        </main>
      );
    } else {
      return <p>Loading</p>;
    }
  }
}

const mapStateToProps = state => ({
  specificPlace: state.places.specificPlace,
  loggedIn: state.auth.currentUser,
  ratingError: state.ratings.error,
  specificRating: state.ratings.specificRating,
  editing: state.ratings.editing
});

export default connect(mapStateToProps)(Listing);
