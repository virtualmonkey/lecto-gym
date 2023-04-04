import { runSaga } from 'redux-saga';
import { normalize } from 'normalizr';

import * as weekActions from '../../week/week.actions';
import { fetchWeek } from '../../week/week.sagas';
import * as schemas from '../../week/week.schemas';

describe('week sagas', () => {
  afterEach(() => {
    fetch.mockClear();
  });

  it('should call fetchWeek', async () => {
    const mockWeek = {
      id: 1,
      days: [
        {
          id: 1,
          name: "Día 1",
          exercises: [{
            day: 1,
            id: 1,
            itemId: 2,
            name: "Ejercicio 1",
            progression: 3,
            tools: "Ninguna",
            type: 0,
            week: 1,
          },
          {
            day: 1,
            id: 2,
            itemId: 3,
            name: "Ejercicio 2",
            progression: 2,
            tools: "Taquistoscopio",
            type: 0,
            week: 1,
          }]
        },
        {
          id: 2,
          name: "Día 2",
          exercises: [{
            day: 2,
            id: 3,
            itemId: 3,
            name: "Ejercicio 1",
            progression: 3,
            tools: "Ninguna",
            type: 0,
            week: 1,
          },
          {
            day: 2,
            id: 4,
            itemId: 4,
            name: "Ejercicio 2",
            progression: 2,
            tools: "Taquistoscopio",
            type: 0,
            week: 1,
          }]
        }
      ]
    };

    const normalizedData = normalize(mockWeek, schemas.week);
    const normalizedDays = normalize(normalizedData.entities.days, schemas.days);
    const normalizedExercises = normalize(normalizedData.entities.exercises, schemas.exercises);

    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockWeek),
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
      fetchWeek,
      weekActions.startFetchWeek({ id: 1 })
    ).toPromise();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([weekActions.completeFetchWeek(          normalizedData.result,
      {
        entities: normalizedDays.entities.days,
        order: normalizedDays.result,
      },
      {
        entities: normalizedExercises.entities.exercises,
        order: normalizedExercises.result,
      }
    )]);
  });

  it('should dispatch failFetchWeek due to API error', async () => {
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
      fetchWeek,
      weekActions.startFetchWeek({ id: 1 })
    ).toPromise();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([weekActions.failFetchWeek('Failed to fetch week')]);
  });

  it('should dispatch failFetchWeek due to fetch error', async () => {
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
      fetchWeek,
      weekActions.startFetchWeek({ id: 1 })
    ).toPromise();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([weekActions.failFetchWeek('fetch error')]);
  });
});