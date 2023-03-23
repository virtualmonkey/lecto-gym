import * as constants from './constants';

export const getExerciseTypeString = (type) => {
  switch (type) {
    case constants.ITEM_TYPE_FOLLOW_ARROWS:
      return 'Seguir flechas';
    case constants.ITEM_TYPE_SKIM_WORDS:
      return 'Percepción de palabras';
    case constants.ITEM_TYPE_FIND_WORDS:
      return 'Encontrar palabras';
    case constants.ITEM_TYPE_FIND_ANTONYMS:
      return 'Encontrar antónimos';
    case constants.ITEM_TYPE_READ_TEXT: 
      return 'Lectura'
    default:
      return ''
  }
};

export const getInputLabelString = (type) => {
  switch (type) {
    case constants.ITEM_TYPE_FOLLOW_ARROWS:
    case constants.ITEM_TYPE_SKIM_WORDS:
      return 'Número de iteraciones';
    case constants.ITEM_TYPE_FIND_WORDS:
    case constants.ITEM_TYPE_FIND_ANTONYMS:
    case constants.ITEM_TYPE_READ_TEXT: 
      return 'Tiempo en segundos';    
    default:
      return ''
  }
};