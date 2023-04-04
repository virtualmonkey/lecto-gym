import { runSaga } from 'redux-saga';
import { normalize } from 'normalizr';

import * as schemas from '../../weeks/weeks.schemas';
import * as weeksActions from '../../weeks/weeks.actions';
import { fetchWeeks } from '../../weeks/weeks.sagas';

describe('weeks sagas', () => {
  afterEach(() => {
    fetch.mockClear();
  });

  it('should call fetchWeeks', async () => {
    const mockWeeks = {
      id: 1,
      days: [
        {
          id: "1",
          name: "week 1",
          progression: 35
        },
        {
          id: "2",
          name: "week 2",
          progression: 35
        },
        {
          id: "3",
          name: "week 3",
          progression: 28
        },
        {
          id: "4",
          name: "week 4",
          progression: 0
        }
      ]
    };

    const {
      entities: { weeks },
      result,
    } = normalize(mockWeeks, schemas.weeks);

    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockWeeks),
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
      fetchWeeks,
      weeksActions.startFetchWeeks()
    ).toPromise();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([weeksActions.completeFetchWeeks(weeks, result)]);
  });

  it('should dispatch failFetchWeeks due to API error', async () => {
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
      fetchWeeks,
      weeksActions.startFetchWeeks()
    ).toPromise();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([weeksActions.failFetchWeeks('Failed to fetch weeks')]);
  });

  it('should dispatch failFetchWeeks due to fetch error', async () => {
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
      fetchWeeks,
      weeksActions.startFetchWeeks()
    ).toPromise();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([weeksActions.failFetchWeeks('fetch error')]);
  });
});