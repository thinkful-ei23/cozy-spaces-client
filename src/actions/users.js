import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config.js';
import {normalizeResponseErrors} from './utils';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const registerSuccess = () => ({
    type: REGISTER_SUCCESS
});

export const REGISTER_ERROR = 'REGISTER_ERROR';
export const registerError = (err) => ({
    type: REGISTER_ERROR,
    err
});

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const registerRequest = () => ({
    type: REGISTER_REQUEST
});

export const registerUser = user => dispatch => {
    dispatch(registerRequest());
    return fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => {
          dispatch(registerSuccess());
          res.json();
        })
        .catch(err => {
            const {reason, message} = err;
            dispatch(registerError(err));
            if (reason === 'ValidationError') {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        username : message
                    })
                );
            }
        });
};

export const deleteAccount = userId => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  return fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .catch(err => {
    const { reason, message, location } = err;
    if (reason === 'ValidationError') {
      return Promise.reject(
        new SubmissionError({
          [location]: message
        })
      );
    }
  });
};