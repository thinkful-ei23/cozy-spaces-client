import React, { Fragment }  from 'react';
import { connect } from 'react-redux'; 

import { fetchPlaceByID, reportPlace, unReportPlace } from '../actions/places';
import { fetchRatingsByUser } from '../actions/ratings';

class ReportListings extends React.Component {

  // componentDidMount() {
  //   const id = this.props.match.params.id;
  //   return this.props.dispatch(fetchPlaceByID(id))
  //   .then(() => this.props.dispatch(fetchRatingsByUser(id)));
  // }

  reportPlace() {
    const report = {
      placeId: this.props.specificPlace._id
    }
    return this.props.dispatch(reportPlace(report))
  }

  unReportPlace() {
    const report = {
      placeId: this.props.specificPlace._id
    }
    return this.props.dispatch(unReportPlace(report))
  }

  render() {
    let reportPlaceButton;

    if (this.props.hasOwnProperty('specificPlace') && this.props.specificPlace !== null) {
      if(this.props.specificPlace.hasOwnProperty('userReports')) {
        let found = this.props.specificPlace.userReports.find((report) => {
          let convertedAndStrippedReport = JSON.stringify(report).replace(/['"]+/g, '');
          return convertedAndStrippedReport === this.props.currentUser.id;
        })
        if (found) {
          return (
            reportPlaceButton = <button onClick={() => this.unReportPlace()}>Delete Report</button>
            );
        } else {
          return (
            reportPlaceButton = <button onClick={() => this.reportPlace()}>Report</button>
          );
        }
      }
    }
  }
}

const mapStateToProps = state => ({
  specificPlace : state.places.specificPlace,
  loggedIn : state.auth.currentUser,
  currentUser : state.auth.currentUser,
  ratingError : state.ratings.error,
  specificRating : state.ratings.specificRating,
  editing : state.ratings.editing,
});

export default connect(mapStateToProps)(ReportListings);
