import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Header extends Component {

    render(){

        return (
            <p>Header</p>
        );
    }
}

export default connect()(Header);