import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { fetchLatLng } from '../actions/places';
import { fetchPlaces, fetchPlaceByID } from '../actions/places';

import '../styles/dashboard.css';


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

  componentWillMount() {
    document.title = 'Dashboard | Cozy Spaces';
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
      navigator.geolocation.getCurrentPosition(
        position => this.setPosition(position),
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
        geoLocationError = <p className='geolocation-error-message textCenter'>Sorry, we can't find your location.</p>;
      }
      if (this.props.places.length >= 1) {
        places = this.props.places.map(place => (
          <li className='dashboard-places card' key={place.id}>
            <Link
              onClick={() => this.setPlace(place.id)}
              to={`/places/${place.id}`}
            >
            <img
                alt={`${place.photos[0].caption}`}
                src={`${place.photos[0].url}`}
                />
              {/* This needs to be commented out temporarily because new listings don't have photos */}
              <div className="place-card-content">
                <h2 className="inline name">{place.name}</h2>
                <div className="place-card-content-r1">
                  <p className="inline type">
                    Type: {place.type}
                  </p>
                  <p className="overallRating">
                    Cozy Rating: {place.averageCozyness}
                  </p>
                </div>

              </div>
            </Link>
          </li>
        ));
      } else {
        places = (
          <li className='textCenter'>
            <p>There are no cozy spaces recorded in your area yet.</p>
            <Link className='button' to={`/add-listing`}>Add a cozy space</Link>
          </li>
        );
      }

      if (this.state.errors.zip) {
        error = <p>{this.state.errors.zip}</p>;
      }

      return (
        <main className="dashboard">
          <div id="geolocation" className='geolocation'>
            {geoLocationError}
            <form className='geolocation-form' onSubmit={(e) => this.submitSearchForm(e)}>
              <label className='geolocation-form-label' htmlFor="zip-geo">
                Enter a zipcode to find cozy spaces near you
              </label>
              <div className='geolocation-form-input'>
                <input
                  id="zip-geo"
                  name="zip"
                  type="text"
                  value={this.state.fields.zip}
                  onChange={this.handleChange}
                  title="Five digit zip code"
                  />
                <button className='button' type='submit'>Submit</button>
                {error}
              </div>

            </form>
          </div>
          <ul className='dashboard-places-list'>
            {places}
          </ul>
        </main>
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
