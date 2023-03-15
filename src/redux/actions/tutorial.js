import {
  SUBMIT_TUTORIAL_STARTED,
  SUBMIT_TUTORIAL_FAILED,
  SUBMIT_TUTORIAL_COMPLETED,
} from '../types/tutorial';

export const startSubmitTutorial = () => ({
  type: SUBMIT_TUTORIAL_STARTED,
});

export const completeSubmitTutorial = () => ({
  type: SUBMIT_TUTORIAL_COMPLETED,
});

export const failSubmitTutorial = (error) => ({
  type: SUBMIT_TUTORIAL_FAILED,
  payload: { error }
});