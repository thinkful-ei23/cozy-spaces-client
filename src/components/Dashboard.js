import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { fetchLatLng } from '../actions/places';
import { fetchPlaces, fetchPlaceByID } from '../actions/places';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: {},
      geolocationError: false,
      fields: {zip: ''},
      errors: {}
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitSearchForm = this.submitSearchForm.bind(this);
  }



  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  }

  submitSearchForm(e) {
    e.preventDefault();
    let errors = {}

    if(this.validateForm()) {
      this.sendZip();
      let fields = {};
      fields['zip'] = '';
      this.setState({fields:fields});
    } else {
      errors['zip'] = 'Please enter a valid zip code';
      this.setState({errors: errors})
      console.log(false);
    }
  }

  validateForm() {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields['zip']) {
      formIsValid = false;
      errors['zip'] = 'Please enter a zip code';
    }

    if (typeof fields['zip'] !== 'undefined') {
      if (!fields['zip'].match(/^[0-9]{5}$/)) {
        formIsValid = false;
        this.setState({
          errors: errors
        })
      }
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }






  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => this.setPosition(position),
        () => {
          this.handleLocationError(true);
        }
      );
    } else {
      this.handleLocationError(false);
    }
  }

  setPlace(id) {
    this.props.dispatch(fetchPlaceByID(id));
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => this.setPosition(position),
        () => {
          this.handleLocationError(true);
        }
      );
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false);
    }
  }

  setPosition(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    console.log(pos);
    this.setState({ currentLocation: pos, geoLocationError: false });
    this.props.dispatch(fetchPlaces(pos));
    // send this filter to get places
  }

  handleLocationError(browserHasGeolocation) {
    this.setState({ geolocationError: true });
  }

  sendZip() {
    let zip = this.state.fields.zip;
    this.props.dispatch(fetchLatLng(zip)).then(latLng => {
      // send this filter to get places
      this.setState({ currentLocation: latLng });
      this.props.dispatch(fetchPlaces(latLng));
    });
  }

  render() {
    let geoLocationError;
    let error;
    let places;

    if (this.props.places) {
      if (!this.props.returningUser) {
        return <Redirect to="/" />;
      }

      if (this.state.geolocationError) {
        geoLocationError = <p>'Error: The Geolocation service failed'</p>;
      }
      if (this.props.places.length >= 1) {
      places = this.props.places.map(place => (
        <li key={place._id}>
          {/* <img alt={`${place.photos[0].caption}`} src={`${place.photos[0].url}`} /> */}
          {/* This needs to be commented out temporarily because new listings don't have photos */}
          <div>
            <span className="name">{place.name}, </span>
            <span className="type">{place.type}</span>
            <br />
            <span className="overallRating">
              Overall cozy rating: {place.averageCozyness}
            </span>
          </div>
          <Link
            onClick={() => this.setPlace(place._id)}
            to={`/places/${place._id}`}
          >
            Check out this place in detail
          </Link>
        </li>
      ));
    } else {
        places = <li>There are no cozy spaces recorded in your area yet. <Link to={`/add-listing`}>Add a cozy space now?</Link></li>
    }

      if (this.state.errors.zip) {
        error = <p>{this.state.errors.zip}</p>;
      }

      return (
        <div className="dashboard">
          <div id="geolocation">
            {geoLocationError}
            <form onSubmit={(e) => this.submitSearchForm(e)}>
              <label htmlFor="zip">
                Enter a zipcode to find locations:{' '}
              </label>
              <input type="text" name="zip" value={this.state.fields.zip} onChange={this.handleChange} id="zip-code" title="Five digit zip code"></input>
              <button type='submit'>Submit</button>
              {error}
            </form>
          </div>
          <ul>
            {places}
          </ul>
        </div>
      );
    } else {
      return <p>Incoming coziness</p>;
    }
  }
}

const mapStateToProps = state => ({
  places: state.places.places,
  loggedIn: state.auth.currentUser !== null,
  returningUser: state.auth.returningUser
});

export default connect(mapStateToProps)(Dashboard);