import React from 'react';
import { connect } from 'react-redux';

class Comments extends React.Component {

  render() {
    return (
      <div className="comments">
          <ul>{(this.props.userComments).map(userComment =>
              <li key={userComment._id} className="comment">{userComment.comment}</li>
              )}
          </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userComments: state.places.specificPlace.userComments
});

export default connect(mapStateToProps)(Comments);