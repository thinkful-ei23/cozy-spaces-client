import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Comments extends React.Component {

  render() {
    let registerLink;

    if (!this.props.loggedIn) {
      registerLink =  <p><Link to="/register">Have a comment to share? Join the cozy force!</Link></p>;
    }

    return (
      <div className="comments">
        <h4>Comments from Cozy Spaces visitors</h4>
          <ul>
              {(this.props.ratings).reduce((acc, rating) => {
                if (rating.rating.comment !== null) {
                  acc.push (<li key={rating._id} className="comment">{rating.rating.comment}</li>);
                }
                return acc;
              },[]
              
              )}
          </ul>
          {registerLink}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ratings: state.places.specificPlace.ratings,
  loggedIn: state.auth.currentUser !== null
  // userComments: state.places.specificPlace.userComments
});

export default connect(mapStateToProps)(Comments);