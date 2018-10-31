import React, { Component } from 'react';
import { connect } from 'react-redux'; 

export class Dashboard extends Component {

    render(){
    let specificPlace = this.props.detailedPlace;
      return (
       <div className="listing">
        <h2>{specificPlace.title}</h2>
        <div>
            {specificPlace.photos[0]}
        </div>
        <h3>Type of place: {specificPlace.type}</h3>
        <h3>Overall coziness: {specificPlace.overallRating}</h3>
        <ul>
                <li>Warm lighting: {specificPlace.lightingRating}</li>
                <li>Relaxed Music: {specificPlace.musicRating}</li>
                <li>Soft fabrics in space (walls or floor): {specificPlace.fabricRating} </li>
                <li>Comfy seating: {specificPlace.seatingRating}</li>
                <li>Hot food/drink: {specificPlace.foodRating}</li>
        </ul>
       </div>
      );
    }
}

const mapStateToProps = state => ({
    detailedPlace : state.places.detailedPlace
});

export default connect(mapStateToProps)(Dashboard);