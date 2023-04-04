import { runSaga } from 'redux-saga';

import * as testsActions from '../../tests/tests.actions';
import * as authActions from '../../auth/auth.actions';
import { submitTutorial, submitInitialTest, submitFinalTest } from '../../tests/tests.sagas';

describe('tests sagas', () => {
  afterEach(() => {
    fetch.mockClear();
  });

  it('should call submitTutorial', async () => {
    const mockResponse = {
      user_id: 1,
      words_percentage: 0,
      words_per_minute: 0,
      time: 0,
      type: 0,
      updated_at: "2023-04-04T15:58:27.000000Z",
      created_at: "2023-04-04T15:58:27.000000Z",
      id: 1
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 201,
        json: () => Promise.resolve(mockResponse),
      })
    );

    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ 
          auth: {
            token: '1|12345'
          }
        })
      },
      submitTutorial,
      testsActions.startSubmitTutorial()
    ).toPromise();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([testsActions.completeSubmitTutorial(), authActions.startGetUser('1|12345')]);
  });

  it('should dispatch failSubmitTutorial due to API error', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      status: 400,
    }));

    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ 
          auth: {
            token: '1|12345'
          }
        })
      },
      submitTutorial,
      testsActions.startSubmitTutorial()
    ).toPromise();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([testsActions.failSubmitTutorial('Failed to submit tutorial')]);
  });

  it('should dispatch failSubmitTutorial due to fetch error', async () => {
    global.fetch = jest.fn(() => Promise.reject(
      new Error('fetch error')
    ));

    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ 
          auth: {
            token: '1|12345'
          }
        })
      },
      submitTutorial,
      testsActions.startSubmitTutorial()
    ).toPromise();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([testsActions.failSubmitTutorial('fetch error')]);
  });

  it('should call submitInitialTest', async () => {
    const mockResponse = {
      user_id: 1,
      words_percentage: 50,
      words_per_minute: 120,
      time: 60,
      type: 1,
      updated_at: "2023-04-04T15:58:27.000000Z",
      created_at: "2023-04-04T15:58:27.000000Z",
      id: 2
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 201,
        json: () => Promise.resolve(mockResponse),
      })
    );

    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ 
          auth: {
            token: '1|12345'
          }
        })
      },
      submitInitialTest,
      testsActions.startSubmitInitialTest(50, 60, 120, 1)
    ).toPromise();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([testsActions.completeSubmitInitialTest(), authActions.startGetUser('1|12345')]);
  });

  it('should dispatch failSubmitInitialTest due to API error', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      status: 400,
    }));

    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ 
          auth: {
            token: '1|12345'
          }
        })
      },
      submitInitialTest,
      testsActions.startSubmitInitialTest(50, 60, 120, 1)
    ).toPromise();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([testsActions.failSubmitInitialTest('Failed to submit initial test')]);
  });

  it('should dispatch failSubmitInitialTest due to fetch error', async () => {
    global.fetch = jest.fn(() => Promise.reject(
      new Error('fetch error')
    ));

    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ 
          auth: {
            token: '1|12345'
          }
        })
      },
      submitInitialTest,
      testsActions.startSubmitInitialTest(50, 60, 120, 1)
    ).toPromise();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([testsActions.failSubmitInitialTest('fetch error')]);
  });

    it('should call submitFinalTest', async () => {
    const mockResponse = {
      user_id: 1,
      words_percentage: 50,
      words_per_minute: 120,
      time: 60,
      type: 2,
      updated_at: "2023-04-04T15:58:27.000000Z",
      created_at: "2023-04-04T15:58:27.000000Z",
      id: 3
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 201,
        json: () => Promise.resolve(mockResponse),
      })
    );

    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ 
          auth: {
            token: '1|12345'
          }
        })
      },
      submitFinalTest,
      testsActions.startSubmitFinalTest(50, 60, 120, 2)
    ).toPromise();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([testsActions.completeSubmitFinalTest(), authActions.startGetUser('1|12345')]);
  });

  it('should dispatch failSubmitFinalTest due to API error', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      status: 400,
    }));

    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ 
          auth: {
            token: '1|12345'
          }
        })
      },
      submitFinalTest,
      testsActions.startSubmitFinalTest(50, 60, 120, 2)
    ).toPromise();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([testsActions.failSubmitFinalTest('Failed to submit final test')]);
  });

  it('should dispatch failSubmitFinalTest due to fetch error', async () => {
    global.fetch = jest.fn(() => Promise.reject(
      new Error('fetch error')
    ));

    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ 
          auth: {
            token: '1|12345'
          }
        })
      },
      submitFinalTest,
      testsActions.startSubmitFinalTest(50, 60, 120, 2)
    ).toPromise();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([testsActions.failSubmitFinalTest('fetch error')]);
  });
});
