import {
  FETCH_RATINGS_SUCCESS,
  FETCH_RATINGS_ERROR,
  FETCH_RATINGS_REQUEST,
  FETCH_RATING_BY_ID_REQUEST,
  FETCH_RATING_BY_ID_ERROR,
  FETCH_RATING_BY_ID_SUCCESS,
  POST_RATING_REQUEST,
  POST_RATING_ERROR,
  POST_RATING_SUCCESS,
  EDIT_RATING_REQUEST,
  EDIT_RATING_ERROR,
  EDIT_RATING_SUCCESS
} from '../actions/ratings';
 
 const initialState = {
   ratings: [],
   loading: false,
   error: null,
   specificRating : null,
   editing: false
 };
 
 export default function reducer(state = initialState, action) {
   switch (action.type) {
     case FETCH_RATINGS_SUCCESS:
      console.log(action.ratings);
       return {...state, ratings: action.ratings, loading: false, error: null};
     case FETCH_RATINGS_ERROR:
       return {...state, loading: false, error: action.error};
     case FETCH_RATINGS_REQUEST:
       return {...state, loading: true};
     case FETCH_RATING_BY_ID_REQUEST: 
       return {...state, loading: true};
     case FETCH_RATING_BY_ID_ERROR: 
       return {...state, loading: false, error: action.error};
     case FETCH_RATING_BY_ID_SUCCESS: 
       return {...state, loading: false, specificRating: action.rating, error: null}
     case POST_RATING_REQUEST : 
       return {...state, loading: true};
     case POST_RATING_SUCCESS: 
       return {...state, loading: false};
     case POST_RATING_ERROR: 
       return {...state, loading: false, error: action.error};
     case EDIT_RATING_REQUEST: 
       return {...state, editing: true};
     case EDIT_RATING_SUCCESS: 
       return {...state, editing: false};
     case EDIT_RATING_ERROR: 
       return {...state, editing: false, error: action.error}
     default: 
       return state;
   }
 }
