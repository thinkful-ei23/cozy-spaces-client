import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
import {SubmissionError} from 'redux-form';

export const FETCH_RATINGS_SUCCESS = 'FETCH_RATINGS_SUCCESS';
export const fetchRatingsSuccess = ratings => ({
    type: FETCH_RATINGS_SUCCESS,
    ratings
});

export const FETCH_RATINGS_ERROR = 'FETCH_RATINGS_ERROR';
export const fetchRatingsError = error => ({
    type: FETCH_RATINGS_ERROR,
    error
});

export const FETCH_RATINGS_REQUEST = 'FETCH_RATINGS_REQUEST';
export const fetchRatingsRequest = () => ({
    type: FETCH_RATINGS_REQUEST
});

export const FETCH_RATING_BY_PLACEID_REQUEST = 'FETCH_RATING_BY_PLACEID_REQUEST';
export const fetchRatingsByPlaceIdRequest = () => ({
    type: FETCH_RATING_BY_PLACEID_REQUEST
});

export const FETCH_RATING_BY_PLACEID_SUCCESS = 'FETCH_RATING_BY_PLACEID_SUCCESS';
export const fetchRatingsByPlaceIdSuccess = (rating) => ({
    type: FETCH_RATING_BY_PLACEID_SUCCESS,
    rating
});

export const FETCH_RATING_BY_PLACEID_ERROR = 'FETCH_RATING_BY_PLACEID_ERROR';
export const fetchRatingsByPlaceIdError = (error) => ({
    type: FETCH_RATING_BY_PLACEID_ERROR,
    error
});


export const POST_RATING_REQUEST = 'POST_RATING_REQUEST';
export const postRatingRequest = () => ({
    type: POST_RATING_REQUEST
});

export const POST_RATING_SUCCESS = 'POST_RATING_SUCCESS';
export const postRatingSuccess = (rating) => ({
    type: POST_RATING_SUCCESS,
    rating
});

export const POST_RATING_ERROR = 'POST_RATING_ERROR';
export const postRatingError = (error) => ({
    type: POST_RATING_ERROR,
    error
});

export const TOGGLE_EDIT_RATING = 'TOGGLE_EDIT_RATING';
export const toggleEditRating = () => ({
    type: TOGGLE_EDIT_RATING
});

export const EDIT_RATING_REQUEST = 'EDIT_RATING_REQUEST';
export const editRatingRequest = () => ({
    type: EDIT_RATING_REQUEST
});

export const EDIT_RATING_SUCCESS = 'EDIT_RATING_SUCCESS';
export const editRatingSuccess = (rating) => ({
    type: EDIT_RATING_SUCCESS,
    rating
});

export const EDIT_RATING_ERROR = 'EDIT_RATING_ERROR';
export const editRatingError = (error) => ({
    type: EDIT_RATING_ERROR,
    error
});

export const fetchRatings = () => dispatch => {
  dispatch(fetchRatingsRequest());
  fetch(`${API_BASE_URL}/ratings`, {
    method: 'GET'
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json()) 
    .then((res) => dispatch(fetchRatingsSuccess(res)))
    .catch(error => {
      dispatch(fetchRatingsError(error));
    });
}

export const fetchRatingsByPlaceId = (placeId) => (dispatch, getState) => {
    console.log('in fetch ratings');
    // actually fetches by place
    const authToken = getState().auth.authToken;
    dispatch(fetchRatingsByPlaceIdRequest());
    return fetch(`${API_BASE_URL}/ratings/${placeId}`, {
      method: 'GET',
      headers: {
        // Provide our existing token as credentials to get a new one
        Authorization: `Bearer ${authToken}`
    }
    })
      .then(res => normalizeResponseErrors(res))
      .then(res => res.json()) 
      .then((res) => dispatch(fetchRatingsByPlaceIdSuccess(res)))
      .catch(error => {
        dispatch(fetchRatingsByPlaceIdError(error)); 
      });
  }

  export const postRating = (rating) => (dispatch, getState) => {
    console.log('rating', rating);
    const authToken = getState().auth.authToken;
    dispatch(postRatingRequest());
    return fetch(`${API_BASE_URL}/ratings`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(rating)
    })
      .then(res => normalizeResponseErrors(res))
      .then(res => res.json()) 
      .then((res) => dispatch(postRatingSuccess(res)))
      .catch(error => {
          console.log('client side error');
        const {reason, message, location} = error;
        dispatch(postRatingError(error));
            if (reason === 'ValidationError') {
                console.log('in reason')
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                // need help from TJ on how to get this submission error into the right place
                return Promise.reject(
                    new SubmissionError({
                        [location] : message
                    })
                );
            } 
      });
  }

  export const editRating = (rating, placeId) => (dispatch, getState) => {
    console.log('editrating', rating);
    const authToken = getState().auth.authToken;
    dispatch(toggleEditRating())
    dispatch(editRatingRequest());
    return fetch(`${API_BASE_URL}/ratings/${placeId}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(rating)
    })
      .then(res => normalizeResponseErrors(res))
      .then(res => res.json()) 
      .then((res) => dispatch(editRatingSuccess(res)))
      .catch(error => {
          console.log(error);
        dispatch(editRatingError(error)); 
      });
  }

  export const deleteRating = (placeID) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    console.log('placeID: ', placeID);
    console.log('authToken: ', authToken);
    return fetch(`${API_BASE_URL}/ratings/${placeID}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .catch(err => {
      const { reason, message, location } = err;
      if (reason === 'ValidationError') {
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
    });
  };
