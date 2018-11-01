import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { Redirect } from 'react-router-dom';
import {fetchPlaces} from '../actions/places';

class Dashboard extends Component {
    componentDidMount() {
        return (
            this.props.dispatch(fetchPlaces())
        );
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
            </li>
            )}
        </ul>
       </div>
      );
    }
}

const mapStateToProps = state => ({
    places: state.places.places,
    returningUser: state.auth.returningUser
});

export default connect(mapStateToProps)(Dashboard);