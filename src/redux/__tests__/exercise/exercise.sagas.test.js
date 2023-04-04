import { runSaga } from 'redux-saga';

import * as exerciseActions from '../../exercise/exercise.actions';
import * as authActions from '../../auth/auth.actions';
import { fetchExercise, progressExercise } from '../../exercise/exercise.sagas';

describe('exercise sagas', () => {
  afterEach(() => {
    fetch.mockClear();
  });

  it('should call fetchExercise', async () => {
    const mockExercise = {
      id: 1,
      week: 1,
      day: 3,
      time: 0,
      tools: "Ninguna",
      name: "Ejercicio 5",
      objective: "obj",
      instructions: "Lee el texto proporcionado deslizando los ojos sin mover la cabeza. Cuida tu postura. Anota el tiempo en segundos que te llevó leerlo completo.",
      file_path: "image-path",
      type: 1,
      created_at: "2023-03-23T05:42:25.000000Z",
      updated_at: "2023-03-23T05:42:25.000000Z",
      isCompleted: false,
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockExercise),
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
      fetchExercise,
      exerciseActions.startFetchExercise({ id: 1 })
    ).toPromise();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([exerciseActions.completeFetchExercise(mockExercise)]);
  });

  it('should dispatch failFetchExercise due to API error', async () => {
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
      fetchExercise,
      exerciseActions.startFetchExercise({ id: 1 })
    ).toPromise();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([exerciseActions.failFetchExercise('Failed to fetch exercise')]);
  });

  it('should dispatch failFetchExercise due to fetch error', async () => {
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
      fetchExercise,
      exerciseActions.startFetchExercise({ id: 1 })
    ).toPromise();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([exerciseActions.failFetchExercise('fetch error')]);
  });

  it('should call progressExercise', async () => {
    const mockProgress = {
      old: {
        id: 1,
        user_id: 1,
        item_id: 99,
        value: 60,
        progression: 2,
        created_at: "2023-03-23T06:02:35.000000Z",
        updated_at: "2023-03-28T20:30:57.000000Z"
      },
      new: {
        id: 1,
        user_id: 1,
        item_id: 99,
        value: 60,
        progression: 3,
        created_at: "2023-03-23T06:02:35.000000Z",
        updated_at: "2023-04-04T15:36:04.000000Z"
      }
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockProgress),
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
      progressExercise,
      exerciseActions.startProgressExercise({ id: 1, value: 1 })
    ).toPromise();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([exerciseActions.completeProgressExercise(), authActions.startGetUser('1|12345')]);
  });

  it('should dispatch failProgressExercise due to API error', async () => {
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
      progressExercise,
      exerciseActions.startProgressExercise({ id: 1, value: 1 })
    ).toPromise();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([exerciseActions.failProgressExercise('Failed to submit result')]);
  });

  it('should dispatch failProgressExercise due to fetch error', async () => {
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
      progressExercise,
      exerciseActions.startProgressExercise({ id: 1, value: 1 })
    ).toPromise();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([exerciseActions.failProgressExercise('fetch error')]);
  });
});
