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

export const fetchPlaces = () => dispatch => {
  dispatch(fetchPlacesRequest());
  return fetch(`${API_BASE_URL}/places/`, {
    method: 'GET'
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json()) 
    .then((res) => dispatch(fetchPlacesSuccess(res)))
    .catch(error => {
      dispatch(fetchPlacesError(error));
    });
}