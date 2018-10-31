import React, { Component } from 'react';
import { connect } from 'react-redux';


export class Dashboard extends Component {

    render(){
      return (
       <p>This is a stub for the dashboard</p>
      );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Dashboard);