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
        registerInfo = <div><p>If you agree to rate public spaces to the best of your ability, based on the rating guide listed above, register now to begin rating. </p><Link to="/register">Register to join the cozy community</Link></div>
    }
    return (
        <main role="main">
          <p>How do we judge what places are cozy?</p>
          <p>If you've heard of Hygge, you might know where this rating guide is headed. Hygge is the Danish word for comfort and togetherness. In the cold fall and winter months, it's an especially attractive way of life. We have taken principles from Hygge to create our categories of coziness.</p>
          <p> Our categories: </p>
          <ul>    
            <li>Warm Lighting: Cozy spaces are lit in ways that do not stress the eyes. This means that the lighting cannot be too bright (fluorescent or harsh lights) or too dim (little to no lighting). Good lighting is somewhere in the middle and tends to favor a warmer hue.</li>
            <li>Relaxed Music: If music has a high tempo and gets your heart pumping, it's likely that you're not feeling too cozy. Cozy spaces have low tempo music that makes you slow down the pace of life.</li>
            <li>Calm Environment: Babies, children, and loud people are not conducive to a calm environment. A bustling coffee shop full of office workers going to and fro is also not a calm environment. A cozy space should feel somewhat separate from the concerns of daily life. It should be lively but not busy.</li>
            <li>Soft Fabrics: Carpets and wall hangings dampen sound and also make the space appear more warm and welcoming. Concrete floors and exposed beams may be cool, but they give a space a spartan and unwelcoming vibe.</li>
            <li>Comfy seating: To relax properly in a place, couches or comfy chairs are necessary. The cozy space should be accepting of your desire to linger. </li>
            <li>Hot food or drink: A bad cup of coffee or a stale pastry in an otherwise charming place can be a dealbreaker. Sensory pleasures make us slow down and appreciate the little things, but if the food or drink is subpar, we don't get that moment to reflect.</li>  
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
