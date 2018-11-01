import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import {fetchPlaces, fetchPlaceByID} from '../actions/places';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {

    componentWillMount() {
        return (
            this.props.dispatch(fetchPlaces())
        );
    }

    setPlace(id) {
        this.props.dispatch(fetchPlaceByID(id));
    }

    render(){
    if (this.props.places) {
        if (!this.props.returningUser) {
            return <Redirect to="/" />;
        }
        // {place.photos[0]} put this back
        return (
            <div className="dashboard">
                <ul>{(this.props.places).map(place =>
                    <li key={place._id}>
                    <div>{place.photo}</div> 
                    <div>
                        <span className="name">{place.name}, </span><span className="type">{place.typeOfPlace}</span><br></br>
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