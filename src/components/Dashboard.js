import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import {fetchPlaces} from '../actions/places';

export class Dashboard extends Component {
    componentDidMount() {
        return (
            this.props.dispatch(fetchPlaces())
        );
    }

    render(){
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
    places: state.places.places
});

export default connect(mapStateToProps)(Dashboard);