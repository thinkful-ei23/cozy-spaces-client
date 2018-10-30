import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
// import { loadAuthToken } from './local-storage';
import registerReducer from './reducers/register';
import authReducer from './reducers/auth';
import { reducer as formReducer } from 'redux-form';
import {composeWithDevTools} from 'redux-devtools-extension';


const rootReducer = combineReducers({
  form: formReducer,
  register: registerReducer,
  auth: authReducer
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
// const authToken = loadAuthToken();
// if (authToken) {
//     const token = authToken;
    // store.dispatch(setAuthToken(token));
    // store.dispatch(refreshAuthToken());
// }

export default store;
