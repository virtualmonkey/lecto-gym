import React from 'react';
import { shallow } from 'enzyme';
import WeekTile from './index';

const createComponent = (props={}) => {
  const component = shallow(
    <WeekTile {...props} />
  );
  return component;
};

describe('WeekTile component', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      id: 1,  
      name: 'Week 1',
      progression: 25,
      unlocked: true,
      completed: false,
    }
  });

  it('Should render WeekTile', () => {
    component = createComponent(props);
    const wrapper = component.find(`[data-test="weekTile"]`);
    expect(wrapper.length).toBe(1);
  });

  it('Should render disabled badge', () => {
    props = {
      ...props,
      unlocked: false
    };

    component = createComponent(props);
    const wrapper = component.find(`[data-test="weekTile-current-state"]`);
    expect(wrapper.hasClass('week-tile__current-state--disabled')).toBe(true)
  });

  it('Should render in-progress badge', () => {
    props = {
      ...props,
      unlocked: true,
    };

    component = createComponent(props);
    const wrapper = component.find(`[data-test="weekTile-current-state"]`);
    expect(wrapper.hasClass('week-tile__current-state--in-progress')).toBe(true)
  });

  it('Should render in-progress completed', () => {
    props = {
      ...props,
      unlocked: true,
      completed: true,
    };

    component = createComponent(props);
    const wrapper = component.find(`[data-test="weekTile-current-state"]`);
    expect(wrapper.hasClass('week-tile__current-state--completed')).toBe(true)
  });

  it('Should render WeekTile name', () => {
    component = createComponent(props);
    const wrapper = component.find(`[data-test="weekTile-name"]`);
    expect(wrapper.text()).toMatch('Week 1');
  });

  it('Should render WeekTile progress', () => {
    component = createComponent(props);
    const wrapper = component.find(`[data-test="weekTile-progress"]`);
    expect(wrapper.text()).toMatch('25/35 ejercicios completados');
  });

  it('Should pass to prop to WeekTile link', () => {
    component = createComponent(props);
    const wrapper = component.find(`[data-test="weekTile-link"]`);
    expect(wrapper.props().to).toEqual(`/week/${props.id}`);
  });
});
