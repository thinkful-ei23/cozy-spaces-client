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
          <section className='textCenter'>
            <h3>Click on the map, and then a marker, to add a listing</h3>
           <GoogleMap/>
           </section>
        );
    }
}

export default connect()(AddAListingPage);