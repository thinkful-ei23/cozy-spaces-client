import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { storeInformedUser } from '../actions/auth';

export class LearnAboutCoziness extends Component {

  componentDidMount() {
    this.props.dispatch(storeInformedUser());
  }

  render(){
    let registerInfo;
    if (!this.props.loggedIn) {
        registerInfo = <div><p>If you agree to rate public spaces to the best of your ability, based on the rating guide listed above, register now to begin rating. </p><Link to="/register">Register to join the cozy force</Link></div>
    }
    return (
        <main role="main">
          <p>How does Cozy Spaces and its users judge what places are cozy?</p>
          <p>*Subject to lots of change*</p>
          <p>If you've heard of Hygge, you might know where this rating guide is going. Hygge is the Danish word for comfort and togetherness. In the cold fall and winter months, it's an especially attractive way of life. This site is an attempt to organize information about the coziest/most hygge public places near you.</p>
          <p> Our categories: </p>
          <ul>    
            <li>Warm Lighting: No flourescent or harsh lights. Prefer dim or warm lights. Lighting must be strong enough to read a book.</li>
            <li>Relaxed Music: If there is music, it should be lower tempo. No frenetic music.</li>
            <li>Calm Environment: People in the space should behave calmly, which means no loud voices, not too many people, and staff who aren't swamped. Often the most calm, but lively, environments must hit that sweet spot between empty and busy.</li>
            <li>Soft Fabrics: Fabrics in an environment can dampen sound and make the space appear more welcoming.</li>
            <li>Comfy seating: To relax properly in a place, you need couches or chairs that have some kind of cushions. Some businesses don't want you getting too comfortable so that they can have you move along. Hygge places aren't like this. </li>
            <li>Hot food or drink: Having a nice cup of tea or coffee/hot soup is really nice in the cold months. Higher quality food or drink is important, but </li>  
            </ul>
          {registerInfo}
        </main>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser
});


export default connect(mapStateToProps)(LearnAboutCoziness);