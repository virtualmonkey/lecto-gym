import React from 'react';
import { shallow } from 'enzyme';
import Radio from './index';

const createComponent = (props={}) => {
  const component = shallow(<Radio {...props} />);
  return component;
};

describe('Radio component', () => {
  let component;
  const onChange = jest.fn();

  it('Should render Radio', () => {
    const props = {
      text: 'option 1',
      name: 'question-1',
      value: 1,
      checked: false,
      onChange: onChange
    };

    component = createComponent(props)
    const wrapper = component.find(`[data-test="radio"]`);
    expect(wrapper.length).toBe(1);
  });

  it('Should render label', () => {
    const props = {
      text: 'option 1',
      name: 'question-1',
      value: 1,
      checked: false,
      onChange: onChange
    };

    component = createComponent(props)
    const wrapper = component.find(`[data-test="radio-label"]`);
    expect(wrapper.text()).toMatch('option 1');
  });

  it('Should display checked', () => {
    const props = {
      text: 'option 1',
      name: 'question-1',
      value: 1,
      checked: true,
      onChange: onChange
    };

    component = createComponent(props)
    const wrapper = component.find(`[data-test="radio"]`);
    expect(wrapper.hasClass('radio--checked')).toEqual(true);
  });

  it('Should have value', () => {
    const props = {
      text: 'option 1',
      name: 'question-1',
      value: 1,
      checked: true,
      onChange: onChange
    };

    component = createComponent(props)
    const wrapper = component.find(`[data-test="radio-input"]`);
    expect(wrapper.props().value).toBe(1);
  });

  it('Should have name', () => {
    const props = {
      text: 'option 1',
      name: 'question-1',
      value: 1,
      checked: true,
      onChange: onChange
    };

    component = createComponent(props)
    const wrapper = component.find(`[data-test="radio-input"]`);
    expect(wrapper.props().name).toMatch('question-1');
  });

  it('Should fire onChange event', () => {
    const props = {
      text: 'option 1',
      name: 'question-1',
      value: 1,
      checked: false,
      onChange: onChange
    };

    component = createComponent(props)
    const wrapper = component.find(`[data-test="radio-input"]`);
    wrapper.simulate('change');
    expect(onChange).toHaveBeenCalled();
  });
});