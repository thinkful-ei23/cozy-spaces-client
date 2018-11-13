import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import Ratings from './Ratings';
import Comments from './Comments';
import RatingsForm from './RatingsForm';
import EditRatingForm from './EditRatingForm';
import ReportListing from './ReportListing';
import { fetchPlaceByID } from '../actions/places';
import { fetchRatingsByPlaceId } from '../actions/ratings';
import { toggleEditRating, deleteRating } from '../actions/ratings';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';


class Listing extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    return this.props
      .dispatch(fetchPlaceByID(id))
      .then(() => {
        if (this.props.loggedIn) {
            this.props.dispatch(fetchRatingsByPlaceId(id))
        }
    });
  }
  
  

  deleteRating() {
    const id = this.props.match.params.id;
    return this.props
      .dispatch(deleteRating(this.props.specificPlace._id))
      .then(() => this.props.dispatch(fetchRatingsByPlaceId(id)))
      .then(() => this.props.dispatch(fetchPlaceByID(id)));
  }

  showUploadWidget() { 
    const id = this.props.specificPlace._id;
    window.cloudinary.openUploadWidget({    
      cloudName: "cozyspaces",    
      uploadPreset: "ax2mu8wy", 
      tags: [id],   
      sources: [        
        "local",        
        "url",        
        "camera",        
        // "image_search",        
        "facebook",        
        "dropbox",       
        "instagram"    
      ],    
      // googleApiKey: "<image_search_google_api_key>",    
      showAdvancedOptions: true,    
      cropping: false,    
      multiple: true,    
      defaultSource: "local",    
      styles: {        
        palette: {           
          window: "#FFFFFF",            
          windowBorder: "#7FB2EF",            
          tabIcon: "#0078FF",            
          menuIcons: "#5A616A",            
          textDark: "#000000",            
          textLight: "#FFFFFF",            
          link: "#0078FF",            
          action: "#FD600B",            
          inactiveTabIcon: "#0E2F5A",            
          error: "#F44235",            
          inProgress: "#0078FF",            
          complete: "#20B832",            
          sourceBg: "#E4EBF1"        
        },        
        fonts: {            
          default: {                
            active: true            
          }        
        }    
      }}, 
      (err, info) => {   
        if (!err) {         
          console.log("Upload Widget event - ", info);   
        }  
      }); 
    }

  

  render() {
    let ratings;
    let ratingsFormPost;
    let ratingsFormEdit;
    let reportButton;

    if (this.props.loggedIn) {
      ratings = <Ratings />;
      reportButton = <ReportListing />;
      if (!this.props.specificRating) {
        ratingsFormPost = <RatingsForm place={this.props.specificPlace} />;
      } else {
        ratingsFormEdit = this.props.editing ? (
          <div>
            <EditRatingForm
              rating={this.props.specificRating}
              place={this.props.specificPlace}
            />
            <button onClick={() => this.props.dispatch(toggleEditRating())}>
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <button onClick={() => this.props.dispatch(toggleEditRating())}>
              Edit rating
            </button>
            <button onClick={() => this.deleteRating()}>Delete</button>
          </div>
        );
      }
    }

    let specificPlace = this.props.specificPlace;
    if (specificPlace) {
      return (
        <Fragment>
          <div className="listing">
            <img alt={`${specificPlace.photos[0].caption}`} src={`${specificPlace.photos[0].url}`} />
            <h2>{specificPlace.name}</h2>
            <h3>Type of place: {specificPlace.type}</h3>
            <h3>Overall coziness: {specificPlace.averageCozyness}</h3>
            <h3>
              Address: {specificPlace.address}, {specificPlace.city},{' '}
              {specificPlace.state}
            </h3>
            <ul>
              <li>Warm lighting: {specificPlace.averageWarmLighting}</li>
              <li>Relaxed Music: {specificPlace.averageRelaxedMusic}</li>
              <li>Calm Environment: {specificPlace.averageCalmEnvironment}</li>
              <li>
                Soft fabrics in space (walls or floor):{' '}
                {specificPlace.averageSoftFabrics}{' '}
              </li>
              <li>Comfy seating: {specificPlace.averageComfySeating}</li>
              <li>Hot food/drink: {specificPlace.averageHotFoodDrink}</li>
            </ul>
          </div>
          <Comments /> 
          <button onClick={() => this.showUploadWidget()}>
              Upload photos
            </button>
          {ratings}
          {ratingsFormPost}
          {ratingsFormEdit}
          {reportButton}
        </Fragment>
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
