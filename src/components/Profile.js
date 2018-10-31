import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Profile extends Component {

    render(){
        return (
            <p>This is a stub for the profile page</p>
        );
    }
}

export default connect()(Profile);