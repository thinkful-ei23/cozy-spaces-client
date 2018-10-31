import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


class Dashboard extends Component {

    render(){
      if (!this.props.returningUser) {
        return <Redirect to="/" />;
      }
      return (
       <p>This is a stub for the dashboard</p>
      );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    returningUser: state.auth.returningUser
});

export default connect(mapStateToProps)(Dashboard);