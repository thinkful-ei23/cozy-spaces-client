import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux'; 
import { fetchPlaceByID } from '../actions/places';
import UserRatings from './UserRatings'

class Listing extends Component {

    componentDidMount() {
        if (!this.props.specificPlace) {
            const id = this.props.match.params.id;
            this.props.dispatch(fetchPlaceByID(id));
        }
    }
    // add back in later
    //  <div>
    // {specificPlace.photos[0]}
    // </div>

    render() {
    let ratings = null;  
    if (this.propsloggedIn){
     ratings = <UserRatings place={this.props.specificPlace} />
    }
    let specificPlace = this.props.specificPlace;
    console.log('this.props: ', this.props);
        if (specificPlace) {
            return (
          <Fragment>
            <div className="listing">
              <h2>{specificPlace.name}</h2>
              <h3>Type of place: {specificPlace.type}</h3>
              <h3>Overall coziness: {specificPlace.averageCozyness}</h3>
              <h3>Address: {specificPlace.address}, {specificPlace.city}, {specificPlace.state}</h3>
              <ul>
                  <li>Warm lighting: {specificPlace.warmLighting}</li>
                  <li>Relaxed Music: {specificPlace.relaxedMusic}</li>
                  <li>Soft fabrics in space (walls or floor): {specificPlace.softFabrics} </li>
                  <li>Comfy seating: {specificPlace.comfySeating}</li>
                  <li>Hot food/drink: {specificPlace.hotFoodDrink}</li>
              </ul>
            </div>
            {ratings}
          </Fragment>
            );  
        } else {
            return <p>Loading</p>
        }
    }
}

const mapStateToProps = state => ({
    specificPlace : state.places.specificPlace,
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Listing);
