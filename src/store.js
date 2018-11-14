import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { loadAuthToken, loadReturningUser, loadInformedUser } from './local-storage';
import registerReducer from './reducers/register';
import authReducer from './reducers/auth';
import placeReducer from './reducers/places';
import ratingReducer from './reducers/ratings';
import {refreshAuthToken, setAuthToken, setReturningUser, setInformedUser} from './actions/auth'
import { reducer as formReducer } from 'redux-form';
import {composeWithDevTools} from 'redux-devtools-extension';


const rootReducer = combineReducers({
  form: formReducer,
  register: registerReducer,
  auth: authReducer,
  places: placeReducer,
  ratings: ratingReducer
});

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)
));

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}

const returningUser = loadReturningUser();
if (returningUser) {
  store.dispatch(setReturningUser());
}

const informedUser = loadInformedUser();
if (informedUser) {
  store.dispatch(setInformedUser());
}

export default store;
