import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
  CLEAR_AUTH,
  SET_AUTH_TOKEN
 } from '../actions/auth';
 
 const initialState = {
   loading: false,
   error: null,
   currentUser: null,
   authToken : null
 };
 
 export default function reducer(state = initialState, action) {
   switch (action.type) {
     case AUTH_SUCCESS:
       return {...state, loading: false, currentUser: action.currentUser};
     case AUTH_ERROR:
       return {...state, loading: false, error: action.error};
     case AUTH_REQUEST:
       return {...state, loading: true};
      case SET_AUTH_TOKEN:
       return {...state, authToken: action.authToken};
      case CLEAR_AUTH:
        return {...state, currentUser: null, authToken: null}
     default: 
       return state;
   }
 }