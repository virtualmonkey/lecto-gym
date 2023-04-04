import * as types from '../auth/auth.types';
import authReducer from '../auth/auth.reducer';

describe('auth reducer', () => {
  it('Should return default state', () => {
    const action = { type: 'dummy_action' };
    const initialState = {
      account: null,
      isGettingUser: false,
      gettingUserError: null,
      token: null,
      isAuthenticating: false,
      error: null,
    };

    expect(authReducer(undefined, action)).toEqual(initialState);
  });

  describe('account subreducer', () => {
    it('Should return account with user', () => {
      const action = {
        type: types.GET_USER_COMPLETED,
        payload: {
          user: {
            name: 'dev',
            email: 'dev@gmail.com',
            password: 'Dev123'
          }
        },
      };

      expect(authReducer(undefined, action).account).toEqual({
        name: 'dev',
        email: 'dev@gmail.com',
        password: 'Dev123'
      });
    });

    it('Should return null account', () => {
      const action = {
        type: types.SIGNOUT_USER_COMPLETED,
      };

      expect(authReducer(undefined, action).account).toEqual(null);
    });
  });

  describe('isGettingUser subreducer', () => {
    it('Should return true', () => {
      const action = {
        type: types.GET_USER_STARTED,
        payload: { token: '1|12342' },
      };

      expect(authReducer(undefined, action).isGettingUser).toEqual(true);
    });

    it('Should return false', () => {
      const action = {
        type: types.GET_USER_COMPLETED,
        payload: {
          user: {
            name: 'dev',
            email: 'dev@gmail.com',
            password: 'Dev123'
          }
        },
      };

      expect(authReducer(undefined, action).isGettingUser).toEqual(false);
    });
  });

  describe('gettingUserError subreducer', () => {
    it('Should return null', () => {
      const action = {
        type: types.GET_USER_STARTED,
        payload: { token: '1|12342' },
      };

      expect(authReducer(undefined, action).gettingUserError).toEqual(null);
    });

    it('Should return error', () => {
      const action = {
        type: types.GET_USER_FAILED,
        payload: { error: 'get user error' },
      };

      expect(authReducer(undefined, action).gettingUserError).toEqual('get user error');
    });
  });

  describe('token subreducer', () => {
    it('Should return token', () => {
      const action = {
        type: types.SIGNUP_USER_COMPLETED,
        payload: { token: '1|12342' },
      };

      expect(authReducer(undefined, action).token).toEqual('1|12342');
    });

    it('Should return null', () => {
      const action = {
        type: types.SIGNOUT_USER_COMPLETED,
      };

      expect(authReducer(undefined, action).token).toEqual(null);
    });
  });

  describe('isAuthenticating subreducer', () => {
    it('Should return true', () => {
      const action = {
        type: types.SIGNIN_USER_STARTED,
        payload: { email: 'dev@gmail.com', password: 'Dev123' },
      };

      expect(authReducer(undefined, action).isAuthenticating).toEqual(true);
    });

    it('Should return false', () => {
      const action = {
        type: types.SIGNIN_USER_COMPLETED,
        payload: { token: '1|12342' },
      };

      expect(authReducer(undefined, action).isAuthenticating).toEqual(false);
    });

    it('Should return false again', () => {
      const action = {
        type: types.GET_USER_FAILED,
        payload: { error: 'get user error' },
      };

      expect(authReducer(undefined, action).isAuthenticating).toEqual(false);
    });
  });

  describe('error subreducer', () => {
    it('Should return null', () => {
      const action = {
        type: types.SIGNIN_USER_STARTED,
        payload: { email: 'dev@gmail.com', password: 'Dev123' },
      };

      expect(authReducer(undefined, action).error).toEqual(null);
    });

    it('Should return error', () => {
      const action = {
        type: types.SIGNIN_USER_FAILED,
        payload: { error: 'signin error' },
      };

      expect(authReducer(undefined, action).error).toEqual('signin error');
    });
  });
});