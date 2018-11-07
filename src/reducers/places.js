import {
  FETCH_PLACES_SUCCESS,
  FETCH_PLACES_ERROR,
  FETCH_PLACES_REQUEST,
  FETCH_PLACE_BY_ID_REQUEST,
  FETCH_PLACE_BY_ID_ERROR,
  FETCH_PLACE_BY_ID_SUCCESS,
  POST_PLACE_REQUEST,
  POST_PLACE_ERROR,
  POST_PLACE_SUCCESS,
  FETCH_PLACE_INFO_SUCCESS
} from '../actions/places';
 
 const initialState = {
   places: [],
   loading: false,
   error: null,
   specificPlace : null,
   info: null
 };
 
 export default function reducer(state = initialState, action) {
   switch (action.type) {
     case FETCH_PLACES_SUCCESS:
      console.log(action.places);
       return {...state, places: action.places, loading: false, error: null};
     case FETCH_PLACES_ERROR:
       return {...state, loading: false, error: action.error};
     case FETCH_PLACES_REQUEST:
       return {...state, loading: true};
     case FETCH_PLACE_BY_ID_REQUEST: 
       return {...state, loading: true};
     case FETCH_PLACE_BY_ID_ERROR: 
       return {...state, loading: false, error: action.error};
     case FETCH_PLACE_BY_ID_SUCCESS: 
       return {...state, loading: false, specificPlace: action.place, error: null}
     case POST_PLACE_REQUEST: 
       return {...state, loading: true};
     case POST_PLACE_ERROR: 
       return {...state, loading: false, error: action.error};
     case POST_PLACE_SUCCESS: 
       return {...state, loading: false, specificPlace: action.place, error: null}
     case FETCH_PLACE_INFO_SUCCESS: 
       return {...state, loading: false, info: action.info}
     default: 
       return state;
   }
 }
