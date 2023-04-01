import React from 'react';
import { shallow } from 'enzyme';
import DayTile from './index';
import ExerciseTile from '../ExerciseTile';

const createComponent = (props={}) => {
  const component = shallow(
    <DayTile {...props}>
      <ExerciseTile id={1} itemId={0} tools='Ninguna' name="Ejercicio 1" type={0} progression={1} disabled={false}/>
      <ExerciseTile id={2} itemId={1} tools='Taquistoscopio' name="Ejercicio 2" type={1} progression={1} disabled={false}/>
      <ExerciseTile id={3} itemId={2} tools='Ninguna' name="Ejercicio 3" type={2} progression={1} disabled={false}/>
      <ExerciseTile id={4} itemId={3} tools='Ninguna' name="Ejercicio 4" type={3} progression={1} disabled={false}/>
      <ExerciseTile id={5} itemId={4} tools='Ninguna' name="Ejercicio 5" type={4} progression={1} disabled={false}/>
    </DayTile>
  );
  return component;
};

describe('DayTile component', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      id: 1,  
      name: 'Day 1',
      unlocked: true,
      completed: false,
    }
  });

  it('Should render DayTile', () => {
    component = createComponent(props);
    const wrapper = component.find(`[data-test="day"]`);
    expect(wrapper.length).toBe(1);
  });

  it('Should not render DayTile', () => {
    props = {
      ...props,
      unlocked: false,
    }
    component = createComponent(props);
    const wrapper = component.find(`[data-test="day"]`);
    expect(wrapper.length).toBe(0);
  });

  it('Should render completed badge', () => {
    props = {
      ...props,
      completed: true
    };

    component = createComponent(props);
    const wrapper = component.find(`[data-test="day-current-state"]`);
    expect(wrapper.hasClass('day__current-state--completed')).toBe(true)
  });

  it('Should render in-progress badge', () => {
    component = createComponent(props);
    const wrapper = component.find(`[data-test="day-current-state"]`);
    expect(wrapper.hasClass('day__current-state--in-progress')).toBe(true)
  });

  it('Should change expanded state', () => {
    component = createComponent(props);
    component.find(`[data-test="day-header"]`).simulate('click');
    const wrapper = component.find(`[data-test="day"]`);
    expect(wrapper.hasClass('day--expanded')).toBe(false);
  });

  it('Should render DayTile name', () => {
    component = createComponent(props);
    const wrapper = component.find(`[data-test="day-name"]`);
    expect(wrapper.text()).toMatch('Day 1');
  });

  it('Should render children', () => {
    component = createComponent(props);
    const wrapper = component.find(`[data-test="day-exercises"]`);
    expect(wrapper.children()).toHaveLength(5);
  });
});
