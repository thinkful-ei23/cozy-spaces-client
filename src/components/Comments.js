import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/comments.css';

class Comments extends React.Component {

  render() {
    let registerLink;

    if (!this.props.loggedIn) {
      registerLink =  <div className='textCenter'>
                        <p>Have a comment to share?</p>
                        <Link to="/register"> Join the cozy force!</Link>
                      </div>;
    }

    return (
      <section className="comments main-orange-border textCenter">
        <h3>Comments from visitors</h3>
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
      </section>
    )
  }
}

const mapStateToProps = state => ({
  ratings: state.places.specificPlace.ratings,
  loggedIn: state.auth.currentUser !== null
  // userComments: state.places.specificPlace.userComments
});

export default connect(mapStateToProps)(Comments);