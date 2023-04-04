import configureStore from 'redux-mock-store';

import * as types from '../../auth/auth.types';
import * as actions from '../../auth/auth.actions';

const mockStore = configureStore();
const store = mockStore();

describe('auth actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Should start signin', () => {
    const expectedActions = [
      {
        type: types.SIGNIN_USER_STARTED,
        payload: { email:'dev@gmail.com',  password:'Dev123'},
      }
    ]

    store.dispatch(actions.startSignIn({ 
      email: 'dev@gmail.com',
      password: 'Dev123',
    }));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should complete signin', () => {
    const expectedActions = [
      {
        type: types.SIGNIN_USER_COMPLETED,
        payload: { token:'1|12342' },
      }
    ]

    store.dispatch(actions.completeSignIn('1|12342'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should fail signin', () => {
    const expectedActions = [
      {
        type: types.SIGNIN_USER_FAILED,
        payload: { error:'signin error' },
      }
    ]

    store.dispatch(actions.failSignIn('signin error'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should start signup', () => {
    const expectedActions = [
      {
        type: types.SIGNUP_USER_STARTED,
        payload: { 
          name: 'dev',
          email:'dev@gmail.com',  
          password:'Dev123',
          passwordConfirmation: 'Dev123'
        },
      }
    ]

    store.dispatch(actions.startSignUp({ 
      name: 'dev',
      email:'dev@gmail.com',  
      password:'Dev123',
      passwordConfirmation: 'Dev123'
    }));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should complete signup', () => {
    const expectedActions = [
      {
        type: types.SIGNUP_USER_COMPLETED,
        payload: { token:'1|12342' },
      }
    ]

    store.dispatch(actions.completeSignUp('1|12342'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should fail signup', () => {
    const expectedActions = [
      {
        type: types.SIGNUP_USER_FAILED,
        payload: { error:'signup error' },
      }
    ]

    store.dispatch(actions.failSignUp('signup error'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should complete signout', () => {
    const expectedActions = [
      {
        type: types.SIGNOUT_USER_COMPLETED,
      }
    ]

    store.dispatch(actions.completeSignOut());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should start get user', () => {
    const expectedActions = [
      {
        type: types.GET_USER_STARTED,
        payload: { token:'1|12342' },
      }
    ]

    store.dispatch(actions.startGetUser('1|12342'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should complete get user', () => {
    const expectedActions = [
      {
        type: types.GET_USER_COMPLETED,
        payload: { 
          user: {
            name: 'dev',
            email:'dev@gmail.com',  
            password:'Dev123'
          } 
        },
      }
    ]

    store.dispatch(actions.completeGetUser({
      name: 'dev',
      email:'dev@gmail.com',  
      password:'Dev123'
    }));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should fail get user', () => {
    const expectedActions = [
      {
        type: types.GET_USER_FAILED,
        payload: { error:'get user error' },
      }
    ]

    store.dispatch(actions.failGetUser('get user error'));

    expect(store.getActions()).toEqual(expectedActions);
  });
});