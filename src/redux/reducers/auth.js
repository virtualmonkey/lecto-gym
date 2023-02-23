import * as types from '../types/auth';
import { combineReducers } from 'redux';

const INITIAL_STATE = {
  user: null,
};

const account = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SIGNUP_USER_COMPLETED: {
      return {
        ...state,
        user: action.payload.user
      }
    }

    case types.SIGNIN_USER_COMPLETED: {
      return {
        ...state,
        user: action.payload.user
      }
    }

    case types.SIGNOUT_USER_COMPLETED: {
      return {
        ...state,
        user: null,
      }
    }

    default:
      return state
  }
};

const isAuthenticating = (state = false, action) => {
  switch(action.type) {
    case types.SIGNIN_USER_STARTED: 
    case types.SIGNUP_USER_STARTED: {
      return true;
    }
    case types.SIGNIN_USER_COMPLETED:
    case types.SIGNUP_USER_COMPLETED:
    case types.SIGNOUT_USER_COMPLETED: {
      return false;
    }
    case types.SIGNUP_USER_FAILED: 
    case types.SIGNIN_USER_FAILED: 
    default: {
      return false;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.SIGNIN_USER_STARTED:
    case types.SIGNUP_USER_STARTED: {
      return null;
    }
    case types.SIGNIN_USER_COMPLETED: 
    case types.SIGNUP_USER_COMPLETED:
    case types.SIGNOUT_USER_COMPLETED: {
      return null;
    }
    case types.SIGNIN_USER_FAILED:
    case types.SIGNUP_USER_FAILED: {
      return action.payload.error;
    }
    default:
      return state;
  }
};

const auth = combineReducers({
  account,
  isAuthenticating,
  error,
});

export default auth;

export const getIsAuthenticating = state => state.isAuthenticating;
export const getAuthenticatingError = state => state.error;
export const getAuthUser = state => state.account ? state.account.user : null;
export const getAuthEmail = state => state.account ? state.account.user.email : null;