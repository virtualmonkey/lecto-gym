export const getExerciseTypeString = (type) => {
  switch (type) {
    case 0:
      return 'Seguir flechas';
    case 1:
      return 'Percepción de palabras';
    case 2:
      return 'Encontrar palabras';
    case 3:
      return 'Encontrar antónimos';
    case 4:
      return 'Lectura'
    default:
      return ''
  }
};