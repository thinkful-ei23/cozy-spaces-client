import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Comments extends React.Component {

  render() {
    return (
      <div className="comments">
        <h4>Comments from Cozy Spaces visitors</h4>
          <ul>{(this.props.ratings).map(rating =>
              <li key={rating._id} className="comment">{rating.rating.comment}</li>
              )}
          </ul>
          <p><Link to="/register">Have a comment to share? Join the cozy force!</Link></p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ratings: state.places.specificPlace.ratings,
  // userComments: state.places.specificPlace.userComments
});

export default connect(mapStateToProps)(Comments);