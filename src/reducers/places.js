import {
  FETCH_PLACES_SUCCESS,
  FETCH_PLACES_ERROR,
  FETCH_PLACES_REQUEST
} from '../actions/places';
 
 const initialState = {
   places: [],
   loading: false,
   error: null
 };
 
 export default function reducer(state = initialState, action) {
   switch (action.type) {
     case FETCH_PLACES_SUCCESS:
       return {...state, places: action.places, loading: false, error: null};
     case FETCH_PLACES_ERROR:
       return {...state, loading: false, error: action.error};
     case FETCH_PLACES_REQUEST:
       return {...state, loading: true};
     default: 
       return state;
   }
 }
