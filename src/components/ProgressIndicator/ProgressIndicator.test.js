import React from 'react';
import { shallow } from 'enzyme';
import ProgressIndicator from './index';

const createComponent = (props={}) => {
  const component = shallow(<ProgressIndicator {...props} />);
  return component;
};

describe('ProgressIndicator component', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      progression: 1
    }
  });

  it('Should render ProgressIndicator', () => {
    component = createComponent(props)
    const wrapper = component.find(`[data-test="progressIndicator"]`);
    expect(wrapper.length).toBe(1);
  });

  it('Should render with class modifier', () => {
    component = createComponent(props);
    const wrapper = component.find(`[data-test="progressIndicator"]`);
    expect(wrapper.hasClass(`progress-indicator--${props.progression}`)).toEqual(true);
  });

  it('Should render with progression prop as text', () => {
    component = createComponent(props);
    const wrapper = component.find(`[data-test="progressIndicator"]`);
    expect(wrapper.text()).toMatch('1');
  });
});