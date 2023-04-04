import { runSaga } from 'redux-saga';

import * as authActions from '../../auth/auth.actions';
import { signIn, signUp, getUser } from '../../auth/auth.sagas';

describe('auth sagas', () => {
  afterEach(() => {
    fetch.mockClear();
  });

  it('should call signIn', async () => {
    const mockToken = '1|12345';

    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ token: mockToken }),
      })
    );

    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      signIn,
      authActions.startSignIn({ email: 'dev@gmail.com', password: 'Password123' })
    ).toPromise();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([authActions.completeSignIn(mockToken), authActions.startGetUser(mockToken)]);
  });

  it('should dispatch failSignIn due to API error', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      status: 400,
    }));

    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      signIn,
      authActions.startSignIn({ email: 'dev@gmail.com', password: 'Password123' })
    ).toPromise();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([authActions.failSignIn('Could not fetch user due to an API error')]);
  });

  it('should dispatch failSignIn due to fetch error', async () => {
    global.fetch = jest.fn(() => Promise.reject(
      new Error('fetch error')
    ));

    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      signIn,
      authActions.startSignIn({ email: 'dev@gmail.com', password: 'Password123' })
    ).toPromise();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([authActions.failSignIn('fetch error')]);
  });

  it('should call signUp', async () => {
    const mockToken = '1|12345';

    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ token: mockToken }),
      })
    );

    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      signUp,
      authActions.startSignUp(
        {
          name: 'dev',
          email: 'dev@gmail.com',
          password: 'Password123',
          passwordConfirmation: 'Password123'
        }
      )
    ).toPromise();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([authActions.completeSignUp(mockToken), authActions.startGetUser(mockToken)]);
  });

  it('should dispatch failSignUp due to API error', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      status: 400,
    }));

    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      signUp,
      authActions.startSignUp(
        {
          name: '',
          email: 'dev@gmail.com',
          password: 'Password123',
          passwordConfirmation: 'Password123'
        }
      )
    ).toPromise();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([authActions.failSignUp('Could not sign up user due to API error')]);
  });

  it('should dispatch failSignUp due to fetch error', async () => {
    global.fetch = jest.fn(() => Promise.reject(
      new Error('fetch error')
    ));

    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      signUp,
      authActions.startSignUp(
        {
          name: '',
          email: 'dev@gmail.com',
          password: 'Password123',
          passwordConfirmation: 'Password123'
        }
      )
    ).toPromise();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([authActions.failSignUp('fetch error')]);
  });

  it('should call getUser', async () => {
    const mockUser = {
      id: 1,
      name: 'dev',
      email: 'dev@gmail.com',
      password: 'Password123',
      passwordConfirmation: 'Password123',
      has_completed_tutorial: false,
      has_completed_initial_test: false,
      has_completed_final_test: false,
      can_access_final_test: false,
    };
  
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockUser),
      })
    );
  
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      getUser,
      authActions.startGetUser('1|12345')
    ).toPromise();
  
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([authActions.completeGetUser(mockUser)]);
  });

  it('should dispatch failGetUser due to incorrect token', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      status: 400,
    }));

    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      getUser,
      authActions.startGetUser('1|12345')
    ).toPromise();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([authActions.failGetUser('Could not get user with given token')]);
  });

  it('should dispatch failGetUser due to fetch error', async () => {
    global.fetch = jest.fn(() => Promise.reject(
      new Error('fetch error')
    ));

    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      getUser,
      authActions.startGetUser('1|12345')
    ).toPromise();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([authActions.failGetUser('fetch error')]);
  });
});
