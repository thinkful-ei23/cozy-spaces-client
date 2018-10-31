import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import {fetchPlaces, fetchPlaceByID} from '../actions/places';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {

    componentDidMount() {
        return (
            this.props.dispatch(fetchPlaces())
        );
    }

    fetchPlaceById(id) {
        return this.props.dispatch(fetchPlaceByID(id));
    }

    render(){
      if (!this.props.returningUser) {
        return <Redirect to="/" />;
      }
      return (
       <div className="dashboard">
        <ul>{(this.props.places).map(place =>
            <li key={place.id}>
            <div>{place.photos[0]}</div>
            <div>
                <span className="name">{place.name}</span><span className="type">{place.type}</span><br></br>
                <span className="overallRating">{place.rating}</span>
            </div>
            <Link to={`/places/${place.id}`} onClick={() => this.fetchPlaceById(place.id)}>Check out this place in detail</Link>
            </li>
            )}
        </ul>
       </div>
      );
    }
}

const mapStateToProps = state => ({
    places: state.places.places,
    loggedIn: state.auth.currentUser !== null,
    returningUser: state.auth.returningUser
});

export default connect(mapStateToProps)(Dashboard);