import React, { Component } from 'react';
import { connect } from 'react-redux'; 

import {fetchPlaces, fetchPlaceByID} from '../actions/places';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Search from './Search'


class Dashboard extends Component {
    componentDidMount() {
        return (
            this.props.dispatch(fetchPlaces())
        );

        
    }

    setPlace(id) {
        this.props.dispatch(fetchPlaceByID(id));
    }

    getLocation() {
      let geoLocationPlaceholder = document.getElementById('geolocation');
      if (navigator.geolocation) {
        console.log(true);
        navigator.geolocation.getCurrentPosition(showPosition)
      } else {
        console.log(false);
        geoLocationPlaceholder.innerHTML = 'Geolocation is not supported by this browser.';
      }

      function showPosition(position) {
        geoLocationPlaceholder.innerHTML = 'Latitude: ' + position.coords.latitude + 
        '<br>Longitude: ' + position.coords.longitude; 
      }
    }



    render(){

    if (this.props.places) {
        if (!this.props.returningUser) {
            return <Redirect to="/" />;
        }
        // {place.photos[0]} put this back
        return (
            <div className="dashboard">
              <button onClick={() => this.getLocation()}>Get Location</button>
              <p id='geolocation'></p>
              <Search />
                <ul>{(this.props.places).map(place =>
                    <li key={place._id}>
                    <img alt={`${place.photos[0].caption}`} src={`${place.photos[0].url}`} />
                    <div>
                        <span className="name">{place.name}, </span><span className="type">{place.type}</span><br></br>
                        <span className="overallRating">Overall cozy rating: {place.averageCozyness}</span>
                    </div>
                    <Link onClick={() => this.setPlace(place._id)} to={`/places/${place._id}`}>Check out this place in detail</Link>
                    </li>
                    )}
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