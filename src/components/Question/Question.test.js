import React from 'react';
import { shallow } from 'enzyme';
import Question from './index';
import Radio from '../Radio';

const createComponent = (props={}) => {
  const component = shallow(
    <Question {...props}>
      <Radio text="option-1" name="question-1" value={1}>1</Radio>
      <Radio text="option-2" name="question-1" value={2}>2</Radio>
      <Radio text="option-3" name="question-1" value={3}>3</Radio>
      <Radio text="option-4" name="question-1" value={4}>4</Radio>
    </Question>
  );
  return component;
};

describe('Question component', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      questionNumber: 1,
      totalQuestions: 4,
      text: 'Escoge la opción correcta',
    }
  });

  it('Should render Question', () => {
    component = createComponent(props);
    const wrapper = component.find(`[data-test="question"]`);
    expect(wrapper.length).toBe(1);
  });

  it('Should render children', () => {
    component = createComponent(props);
    const wrapper = component.find(`[data-test="question-options"]`);
    expect(wrapper.children()).toHaveLength(4);
  });

  it('Should render Question title', () => {
    component = createComponent(props);
    const wrapper = component.find(`[data-test="question-title"]`);
    expect(wrapper.text()).toMatch('Pregunta 1 de 4');
  });

  it('Should render Question text', () => {
    component = createComponent(props);
    const wrapper = component.find(`[data-test="question-text"]`);
    expect(wrapper.text()).toMatch('Escoge la opción correcta');
  });
});