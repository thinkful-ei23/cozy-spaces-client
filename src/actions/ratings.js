import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

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

export const FETCH_RATING_BY_ID_REQUEST = 'FETCH_RATING_BY_ID_REQUEST';
export const fetchRatingsByUserRequest = () => ({
    type: FETCH_RATING_BY_ID_REQUEST
});

export const FETCH_RATING_BY_ID_SUCCESS = 'FETCH_RATING_BY_ID_SUCCESS';
export const fetchRatingsByUserSuccess = (rating) => ({
    type: FETCH_RATING_BY_ID_SUCCESS,
    rating
});

export const FETCH_RATING_BY_ID_ERROR = 'FETCH_RATING_BY_ID_ERROR';
export const fetchRatingsByUserError = (error) => ({
    type: FETCH_RATING_BY_ID_ERROR,
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

export const fetchRatingsByUser = (id) => (dispatch, getState) => {
    console.log('in fetch ratings');
    const authToken = getState().auth.authToken;
    dispatch(fetchRatingsByUserRequest());
    return fetch(`${API_BASE_URL}/ratings/${id}`, {
      method: 'GET',
      headers: {
        // Provide our existing token as credentials to get a new one
        Authorization: `Bearer ${authToken}`
    }
    })
      .then(res => normalizeResponseErrors(res))
      .then(res => res.json()) 
      .then((res) => dispatch(fetchRatingsByUserSuccess(res)))
      .catch(error => {
        dispatch(fetchRatingsByUserError(error)); 
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
        dispatch(postRatingError(error)); 
      });
  }