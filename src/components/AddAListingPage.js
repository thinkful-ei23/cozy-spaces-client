import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMap from './GoogleMap';

import {clearSpecificPlace} from '../actions/places';

export class AddAListingPage extends Component {

  componentWillMount() {
    this.props.dispatch(clearSpecificPlace())
  }

    render(){
      // need to use the geolocation of the person to center the google map
        return (
          <div>
            <h3>Click on the map and the marker to add a listing</h3>
           <GoogleMap/>
           </div>
        );
    }
}

export default connect()(AddAListingPage);