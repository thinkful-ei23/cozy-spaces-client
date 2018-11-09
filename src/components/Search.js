import React, { Component } from 'react';
import { connect } from 'react-redux';
import requiresLogin from "./requires-login";

export class Search extends Component {
  constructor() {
    super();
    this.state = {
      fields: {},
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitSearchForm = this.submitSearchForm.bind(this);
  };

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  }

  submitSearchForm(e) {
    e.preventDefault();
    if(this.validateForm()) {
      let fields = {};
      fields['zip'] = '';
      this.setState({fields:fields});
      alert('Form submitted');
    }
  }

  validateForm() {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields['name']) {
      formIsValid = false;
      errors['zip'] = 'Please enter a zip code';
    }

    if (typeof fields['zip'] !== 'undefined') {
      if (!fields['zip'].match(/^[0-9]{5}$/)) {
        formIsValid = false;
        errors['zip'] = 'Please enter a valid zip code';
      }
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }



    render(){
        return (
          <form onSubmit={this.submitSearchForm}>
            <label htmlFor="zip">ZIP Code</label>
            <input type="text" name="zip" value={this.state.fields.zip} onChange={this.handleChange} id="zip-code" title="Five digit zip code"></input>
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