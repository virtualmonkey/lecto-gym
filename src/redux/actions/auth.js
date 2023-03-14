import {
  SIGNIN_USER_STARTED,
  SIGNIN_USER_FAILED,
  SIGNIN_USER_COMPLETED,
  SIGNUP_USER_STARTED,
  SIGNUP_USER_FAILED,
  SIGNUP_USER_COMPLETED,
  SIGNOUT_USER_COMPLETED,
  GET_USER_STARTED,
  GET_USER_FAILED,
  GET_USER_COMPLETED
} from '../types/auth';


export const startSignIn = ({ email, password }) => ({
  type: SIGNIN_USER_STARTED,
  payload: { email, password }
});

export const completeSignIn = (token) => ({
  type: SIGNIN_USER_COMPLETED,
  payload: { token }
});

export const failSignIn = error => ({
  type: SIGNIN_USER_FAILED,
  payload: { error },
});

export const startSignUp = ({name, email, password, passwordConfirmation}) => ({
  type: SIGNUP_USER_STARTED,
  payload: { name, email, password, passwordConfirmation },
});

export const completeSignUp = (token) => ({
  type: SIGNUP_USER_COMPLETED,
  payload: { token }
});

export const failSignUp = error => ({
  type: SIGNUP_USER_FAILED,
  payload: { error },
});

export const completeSignOut = () => ({
  type: SIGNOUT_USER_COMPLETED,
});

export const startGetUser = (token) => ({
  type: GET_USER_STARTED,
  payload: { token }
});

export const failGetUser = error => ({
  type: GET_USER_FAILED,
  payload: { error }
});

export const completeGetUser = (user) => ({
  type: GET_USER_COMPLETED,
  payload: { user }
});