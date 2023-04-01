import {
  getExerciseTypeString,
  getInputLabelString,
  getDateFromIsoString,
} from '../functions';

describe('Get exercise string given type', () => {
  it('Should get exercise string with type  0', () => {
    expect(getExerciseTypeString(0)).toBe('Seguir flechas');
  });

  it('Should get exercise string with type  1', () => {
    expect(getExerciseTypeString(1)).toBe('Percepción de palabras');
  });

  it('Should get exercise string with type  2', () => {
    expect(getExerciseTypeString(2)).toBe('Encontrar palabras');
  });

  it('Should get exercise string with type  3', () => {
    expect(getExerciseTypeString(3)).toBe('Encontrar antónimos');
  });

  it('Should get exercise string with type  4', () => {
    expect(getExerciseTypeString(4)).toBe('Lectura');
  });

  it('Should get exercise string with unrecognized type', () => {
    expect(getExerciseTypeString()).toBe('');
  });
});

describe('Get input label string', () => {
  it('Should get input label with type 0', () => {
    expect(getInputLabelString(0)).toBe('Número de iteraciones');
  });

  it('Should get input label with type 1', () => {
    expect(getInputLabelString(1)).toBe('Número de iteraciones');
  });

  it('Should get input label with type 2', () => {
    expect(getInputLabelString(2)).toBe('Tiempo (calculado automáticamente)');
  });

  it('Should get input label with type 3', () => {
    expect(getInputLabelString(3)).toBe('Tiempo (calculado automáticamente)');
  });

  it('Should get input label with type 4', () => {
    expect(getInputLabelString(4)).toBe('Tiempo (calculado automáticamente)');
  });

  it('Should get input label with unrecognized type', () => {
    expect(getInputLabelString()).toBe('');
  });
});

describe('Get data from ISO string', () => {
  it('Should get date', () => {
    expect(getDateFromIsoString('2011-10-05T14:48:00.000Z')).toBe('05-10-2011');
  });
});
