import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { loadAuthToken, loadReturningUser } from './local-storage';
import registerReducer from './reducers/register';
import authReducer from './reducers/auth';
<<<<<<< HEAD
import placeReducer from './reducers/auth';
import {refreshAuthToken, setAuthToken} from './actions/auth'
=======
import {refreshAuthToken, setAuthToken, setReturningUser} from './actions/auth'
>>>>>>> development
import { reducer as formReducer } from 'redux-form';
import {composeWithDevTools} from 'redux-devtools-extension';


const rootReducer = combineReducers({
  form: formReducer,
  register: registerReducer,
  auth: authReducer,
  places: placeReducer
});

// const store = createStore(
//     rootReducer,
//     applyMiddleware(thunk)
// );

// for dev
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

export default store;
