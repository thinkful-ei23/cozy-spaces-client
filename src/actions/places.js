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

export const FETCH_PLACE_INFO_SUCCESS = 'FETCH_PLACE_INFO_SUCCESS';
export const fetchPlaceInfoSuccess = (info) => ({
    type: FETCH_PLACE_INFO_SUCCESS,
    info
});

// export const FETCH_PLACE_BY_ID_ERROR = 'FETCH_PLACE_BY_ID_ERROR';
// export const fetchPlaceByIdError = (error) => ({
//     type: FETCH_PLACE_BY_ID_ERROR,
//     error
// });

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

export const fetchPlaceInfo = (lat, lng) => dispatch => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`, {
      method: 'GET'
    })
      .then(res => normalizeResponseErrors(res))
      .then(res => res.json()) 
      .then((res) => dispatch(fetchPlaceInfoSuccess(res)))
      .catch(error => {
        // dispatch(fetchPlacesError(error));
      });
  }

export const fetchPlaceByID = (id) => dispatch => {
    dispatch(fetchPlaceByIdRequest());
    return fetch(`${API_BASE_URL}/places/${id}`, {
      method: 'GET'
    })
      .then(res => normalizeResponseErrors(res))
      .then(res => res.json()) 
      .then((res) => dispatch(fetchPlaceByIdSuccess(res)))
      .catch(error => {
        dispatch(fetchPlaceByIdError(error));
      });
  }