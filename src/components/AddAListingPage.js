import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMap from './GoogleMap';

export class AddAListingPage extends Component {

    render(){
      // need to use the geolocation of the person to center the google map
        return (
          <div>
            <h3>Click on the map to add a listing</h3>
           <GoogleMap />
           </div>
        );
    }
}

export default connect()(AddAListingPage);