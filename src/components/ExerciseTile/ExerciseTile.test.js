import React from 'react';
import { shallow } from 'enzyme';
import { getExerciseTypeString } from '../../utils/functions';
import ExerciseTile from './index';

const createComponent = (props={}) => {
  const component = shallow(
    <ExerciseTile {...props} />
  );
  return component;
};

describe('ExerciseTile component', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      id: 1,
      itemId: 0,
      tools: 'Taquistoscopio',
      name: 'Ejercicio 1',
      type: 1,
      progression: 0,
      disabled: true
    }
  });

  it('Should render ExerciseTile', () => {
    component = createComponent(props);
    const wrapper = component.find(`[data-test="exericseTile"]`);
    expect(wrapper.length).toBe(1);
  });

  it('Should render ExerciseTile name', () => {
    component = createComponent(props);
    const wrapper = component.find(`[data-test="exericseTile-name"]`);
    expect(wrapper.text()).toMatch('Ejercicio 1');
  });

  it('Should render ExerciseTile type', () => {
    component = createComponent(props);
    const wrapper = component.find(`[data-test="exericseTile-type"]`);
    expect(wrapper.text()).toBe(`Tipo: ${getExerciseTypeString(props.type)}`);
  });

  it('Should render ExerciseTile tools', () => {
    component = createComponent(props);
    const wrapper = component.find(`[data-test="exericseTile-tools"]`);
    expect(wrapper.text()).toBe(`Herramientas: ${props.tools}`);
  });

  it('Should render disabled WeekTile link', () => {
    component = createComponent(props);
    const wrapper = component.find(`[data-test="exerciseTile-link"]`);
    expect(wrapper.props().disabled).toBe(true);
  });

  it('Should not have disabled class WeekTile link', () => {
    props = {
      ...props,
      disabled: false
    }
    component = createComponent(props);
    const wrapper = component.find(`[data-test="exerciseTile-link"]`);
    expect(wrapper.hasClass('exercise-tile__link--disable')).toBe(false);
  });

  it('Should pass to prop to WeekTile link', () => {
    component = createComponent(props);
    const wrapper = component.find(`[data-test="exerciseTile-link"]`);
    expect(wrapper.props().to).toEqual(`/exercise/${props.itemId}/${props.id}`);
  });
});
