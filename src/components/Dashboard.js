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
      geolocationError: false
    };
    this.componentDidMount = this.componentDidMount.bind(this);
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

  sendZip(e) {
    e.preventDefault();
    let zip = document.getElementById('zip-geo').value;
    console.log(zip);
    this.props.dispatch(fetchLatLng(zip)).then(latLng => {
      // send this filter to get places
      this.setState({ currentLocation: latLng });
      this.props.dispatch(fetchPlaces(latLng));
    });
  }

  render() {
    let geoLocationError;
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
          <img alt={`${place.photos[0].caption}`} src={`${place.photos[0].url}`} />
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

      return (
        <div className="dashboard">
          <div id="geolocation">
            {geoLocationError}
            <form>
              <label htmlFor="zip-geo">
                Enter a zipcode to find locations:{' '}
              </label>
              <input
                id="zip-geo"
                type="text"
                pattern="[0-9]{5}"
                title="Five digit zip code"
              />
              <button onClick={e => this.sendZip(e)}>Submit</button>
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