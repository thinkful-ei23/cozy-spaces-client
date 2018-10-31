import React, { Component } from 'react';
import { connect } from 'react-redux';

export class AddAListingPage extends Component {

    render(){

        return (
            <p>This is a stub for the add a listing page</p>
        );
    }
}

export default connect()(AddAListingPage);