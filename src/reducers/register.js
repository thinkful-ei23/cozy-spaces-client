import {
 REGISTER_SUCCESS,
 REGISTER_ERROR,
 REGISTER_REQUEST
} from '../actions/users';

const initialState = {
  loading: false,
  error: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {...state, loading: false};
    case REGISTER_ERROR:
      return {...state, loading: false, error: action.error};
    case REGISTER_REQUEST:
      return {...state, loading: true};
    default: 
      return state;
  }
}
