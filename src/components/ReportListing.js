import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPlaceByID, reportPlace, unReportPlace } from '../actions/places';

class ReportListings extends React.Component {
  reportPlace() {
    const report = {
      placeId: this.props.specificPlace._id
    };
    return this.props
      .dispatch(reportPlace(report))
      .then(() => this.props.dispatch(fetchPlaceByID(report.placeId)));
  }

  unReportPlace() {
    const report = {
      placeId: this.props.specificPlace._id
    };
    return this.props
      .dispatch(unReportPlace(report))
      .then(() => this.props.dispatch(fetchPlaceByID(report.placeId)));
  }

  render() {
    let reportPlaceButton;

    if (
      this.props.hasOwnProperty('specificPlace') &&
      this.props.specificPlace !== null
    ) {
      if (this.props.specificPlace.hasOwnProperty('userReports')) {
        let found = this.props.specificPlace.userReports.find(report => {
          let convertedAndStrippedReport = JSON.stringify(report).replace(
            /['"]+/g,
            ''
          );
          return convertedAndStrippedReport === this.props.currentUser.id;
        });
        if (found) {
          reportPlaceButton = <button className='button' onClick={() => this.unReportPlace()}>Delete Report</button>;
          return (
            <div className='textCenter'>
              <p>Was that a mistake?</p>
              {reportPlaceButton}
            </div>
          ) 
        } else {
          reportPlaceButton = <button className='button' onClick={() => this.reportPlace()}>Report</button>
          return (
            <div className='textCenter'>
              <p>Does this place not meet the <Link className='romanceColor' to="/learn-more">cozy standards?</Link></p>
              {reportPlaceButton}
            </div>
          ) 
        }
      } else {
        return '';
      }
    } else {
      return '';
    }
  }
}

const mapStateToProps = state => ({
  specificPlace: state.places.specificPlace,
  loggedIn: state.auth.currentUser,
  currentUser: state.auth.currentUser,
  ratingError: state.ratings.error,
  specificRating: state.ratings.specificRating,
  editing: state.ratings.editing
});

export default connect(mapStateToProps)(ReportListings);