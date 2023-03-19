import * as types from './auth.types';
import { combineReducers } from 'redux';

const account = (state = null, action) => {
  switch (action.type) {
    case types.GET_USER_COMPLETED: {
      return  {
        ...state,
        ...action.payload.user
      }
    }

    case types.SIGNOUT_USER_COMPLETED: {
      return null
    }

    default:
      return state;
  }
};

const isGettingUser = (state = false, action) => {
  switch(action.type) {
    case types.GET_USER_STARTED: {
      return true;
    }
    case types.GET_USER_COMPLETED:
    case types.SIGNOUT_USER_COMPLETED: {
      return false;
    }
    case types.GET_USER_FAILED: {
      return false;
    }

    default: {
      return false;
    }
  }
};

const gettingUserError = (state = null, action) => {
  switch(action.type) {
    case types.GET_USER_STARTED: {
      return null;
    }

    case types.GET_USER_COMPLETED: 
    case types.SIGNOUT_USER_COMPLETED: {
      return null;
    }

    case types.GET_USER_FAILED: {
      return action.payload.error;
    }

    default:
      return state;
  }
};

const token = (state = null, action) => {
  switch (action.type) {
    case types.SIGNUP_USER_COMPLETED: {
      return action.payload.token
    }

    case types.SIGNIN_USER_COMPLETED: {
      return action.payload.token
    }

    case types.SIGNOUT_USER_COMPLETED: {
      return null
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
  isGettingUser,
  gettingUserError,
  token,
  isAuthenticating,
  error,
});

export default auth;

export const getToken = state => state.token;
export const getAuthUser = state => state.account ? state.account : null;
export const getIsGettingUser = state => state.isGettingUser;
export const getIsGettingUserError = state => state.gettingUserError;
export const getIsAuthenticating = state => state.isAuthenticating;
export const getAuthenticatingError = state => state.error;
