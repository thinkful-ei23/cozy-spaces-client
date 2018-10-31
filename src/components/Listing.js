import React, { Component } from 'react';
import { connect } from 'react-redux';

class Listing extends Component {

    render(){

        return (
            <p>This is a stub for the listing page</p>
        );
    }
}

export default connect()(Listing);