import { runSaga } from 'redux-saga';

import * as resultsActions from '../../results/results.actions';
import { fetchResults } from '../../results/results.sagas';

describe('results sagas', () => {
  afterEach(() => {
    fetch.mockClear();
  });

  it('should call fetchResults', async () => {
    const mockResults = {
      initial_test: {},
      final_test: {},
      improvement: {}
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockResults),
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
      fetchResults,
      resultsActions.startFetchResults()
    ).toPromise();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([resultsActions.completeFetchResults(mockResults.initial_test, mockResults.final_test, mockResults.improvement)]);
  });

  it('should dispatch failFetchResults due to API error', async () => {
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
      fetchResults,
      resultsActions.startFetchResults()
    ).toPromise();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([resultsActions.failFetchResults('Failed to fetch results')]);
  });

  it('should dispatch failFetchResults due to fetch error', async () => {
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
      fetchResults,
      resultsActions.startFetchResults()
    ).toPromise();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([resultsActions.failFetchResults('fetch error')]);
  });
});
