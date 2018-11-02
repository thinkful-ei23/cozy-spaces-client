import {
  FETCH_RATINGS_SUCCESS,
  FETCH_RATINGS_ERROR,
  FETCH_RATINGS_REQUEST,
  FETCH_RATING_BY_ID_REQUEST,
  FETCH_RATING_BY_ID_ERROR,
  FETCH_RATING_BY_ID_SUCCESS
} from '../actions/ratings';
 
 const initialState = {
   ratings: [],
   loading: false,
   error: null,
   specificRating : null
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
     console.log(action.rating);
       return {...state, loading: false, specificRating: action.rating, error: null}
     default: 
       return state;
   }
 }
