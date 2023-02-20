import {
  SIGNIN_USER_STARTED,
  SIGNIN_USER_FAILED,
  SIGNIN_USER_COMPLETED,
  SIGNUP_USER_STARTED,
  SIGNUP_USER_FAILED,
  SIGNUP_USER_COMPLETED,
  SIGNOUT_USER_COMPLETED,
} from '../types/auth';

// TODO: check if the shape of the payload is correct
export const startSignIn = ({ username, password }) => ({
  type: SIGNIN_USER_STARTED,
  payload: { username, password }
});

export const completeSignIn = (user) => ({
  type: SIGNIN_USER_COMPLETED,
  payload: { user }
});

export const failSignIn = error => ({
  type: SIGNIN_USER_FAILED,
  payload: { error },
});

// TODO: check if the shape of the payload is correct
export const startSignUp = (username, password) => ({
  type: SIGNUP_USER_STARTED,
  payload: { username, password },
});

export const completeSignUp = (user) => ({
  type: SIGNUP_USER_COMPLETED,
  payload: { user }
});

export const failSignUp = error => ({
  type: SIGNUP_USER_FAILED,
  payload: { error },
});

export const completeSignOut = () => ({
  type: SIGNOUT_USER_COMPLETED,
});
