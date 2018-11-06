import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Comments extends React.Component {

  render() {
    return (
      <div className="comments">
        <h4>Comments from Cozy Spaces visitors</h4>
          <ul>{(this.props.userComments).map(userComment =>
              <li key={userComment._id} className="comment">{userComment.comment}</li>
              )}
          </ul>
          <p><Link to="/register">Have a comment to share? Join the cozy force!</Link></p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userComments: state.places.specificPlace.userComments
});

export default connect(mapStateToProps)(Comments);