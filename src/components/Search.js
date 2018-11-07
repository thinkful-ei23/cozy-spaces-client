import React, { Component } from 'react';
import { connect } from 'react-redux';
import requiresLogin from "./requires-login";

export class Search extends Component {
    onSubmit(e) {
      e.preventDefault();
      // const answer = this.input.value;
    }

    render(){
        return (
          <form onSubmit={(e) => this.onSubmit(e)}>
            <label htmlFor="zip-code">ZIP Code</label>
            <input ref={input => (this.input = input)} id="zip-code" type="text" pattern="[0-9]{5}" title="Five digit zip code"></input>
            <button>Search</button>
          </form>
        );
    }
}



const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: currentUser.username,
    userId: currentUser.id
  }
};

export default requiresLogin()(connect(mapStateToProps)(Search));