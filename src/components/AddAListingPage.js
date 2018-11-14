import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMap from './GoogleMap';

import {clearSpecificPlace} from '../actions/places';

export class AddAListingPage extends Component {

  componentWillMount() {
    this.props.dispatch(clearSpecificPlace())
  }

    render(){
        return (
          <section className='textCenter'>
            <h3>Click on the map, and then the marker, to add a listing</h3>
           <GoogleMap/>
           </section>
        );
    }
}

export default connect()(AddAListingPage);