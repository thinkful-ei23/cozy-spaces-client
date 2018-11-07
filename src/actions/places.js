import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_PLACES_SUCCESS = 'FETCH_PLACES_SUCCESS';
export const fetchPlacesSuccess = places => ({
    type: FETCH_PLACES_SUCCESS,
    places
});

export const FETCH_PLACES_ERROR = 'FETCH_PLACES_ERROR';
export const fetchPlacesError = error => ({
    type: FETCH_PLACES_ERROR,
    error
});

export const FETCH_PLACES_REQUEST = 'FETCH_PLACES_REQUEST';
export const fetchPlacesRequest = () => ({
    type: FETCH_PLACES_REQUEST
});

export const FETCH_PLACE_BY_ID_REQUEST = 'FETCH_PLACE_BY_ID_REQUEST';
export const fetchPlaceByIdRequest = () => ({
    type: FETCH_PLACE_BY_ID_REQUEST
});

export const FETCH_PLACE_BY_ID_SUCCESS = 'FETCH_PLACE_BY_ID_SUCCESS';
export const fetchPlaceByIdSuccess = (place) => ({
    type: FETCH_PLACE_BY_ID_SUCCESS,
    place
});

export const FETCH_PLACE_BY_ID_ERROR = 'FETCH_PLACE_BY_ID_ERROR';
export const fetchPlaceByIdError = (error) => ({
    type: FETCH_PLACE_BY_ID_ERROR,
    error
});

export const REPORT_PLACE_REQUEST = 'REPORT_PLACE_REQUEST';
export const reportPlaceRequest = () => ({
  type: REPORT_PLACE_REQUEST
});

export const REPORT_PLACE_SUCCESS = 'REPORT_PLACE_SUCCESS';
export const reportPlaceSuccess = () => ({
  type: REPORT_PLACE_SUCCESS
});

export const REPORT_PLACE_ERROR = 'REPORT_PLACE_ERROR';
export const reportPlaceError = (error) => ({
  type: REPORT_PLACE_ERROR,
  error
});

export const fetchPlaces = () => dispatch => {
  dispatch(fetchPlacesRequest());
  fetch(`${API_BASE_URL}/places`, {
    method: 'GET'
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json()) 
    .then((res) => dispatch(fetchPlacesSuccess(res)))
    .catch(error => {
      dispatch(fetchPlacesError(error));
    });
}

export const fetchPlaceByID = (id) => (dispatch, getState) => {
    dispatch(fetchPlaceByIdRequest());
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/places/${id}`, {
      method: 'GET',
      headers: {
        // Provide our existing token as credentials to get a new one
        Authorization: `Bearer ${authToken}`
    }
    })
      .then(res => normalizeResponseErrors(res))
      .then(res => res.json()) 
      .then((res) => dispatch(fetchPlaceByIdSuccess(res)))
      .catch(error => {
        dispatch(fetchPlaceByIdError(error));
      });
}

export const reportPlace = (placeId) => (dispatch, getState) => {
  dispatch(reportPlaceRequest());
  const authToken = getState().auth.authToken;
  console.log(placeId);
  return fetch(`${API_BASE_URL}/report`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(placeId)
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then((res) => dispatch(reportPlaceSuccess(res)))
  .catch(error => {
    dispatch(reportPlaceError(error));
  });
}

export const unReportPlace = (placeId) => (dispatch, getState) => {
  dispatch(reportPlaceRequest());
  const authToken = getState().auth.authToken;
  console.log(placeId);
  return fetch(`${API_BASE_URL}/report`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(placeId)
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then((res) => dispatch(reportPlaceSuccess(res)))
  .catch(error => {
    dispatch(reportPlaceError(error));
  });
}