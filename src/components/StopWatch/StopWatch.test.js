import React from 'react';
import { shallow } from 'enzyme';
import StopWatch from './index';

const createComponent = (props={}) => {
  const component = shallow(
    <StopWatch {...props}  />
  );
  return component;
};

describe('StopWatch component', () => {
  let component;
  let props;
  const setTimeExpired = jest.fn();
  const setElapsedTime = jest.fn();

  beforeEach(() => {
    props = {
      setTimeExpired: setTimeExpired,
      setElapsedTime: setElapsedTime
    }
  });

  it('Should render StopWatch', () => {
    component = createComponent(props);
    const wrapper = component.find(`[data-test="stopWatch"]`);
    expect(wrapper.length).toBe(1);
  });

  it('Should fire setElapsedTime', async () => {
    component = createComponent(props);
    component.find(`[data-test="stopWatch-start"]`).simulate('click');
    await new Promise((r) => setTimeout(r, 2000));
    component.find(`[data-test="stopWatch-stop"]`).simulate('click');
    expect(setElapsedTime).toHaveBeenCalledTimes(2);
  });

  it('Should fire setTimeExpired', async () => {
    component = createComponent(props);
    component.find(`[data-test="stopWatch-start"]`).simulate('click');
    await new Promise((r) => setTimeout(r, 1000));
    component.find(`[data-test="stopWatch-stop"]`).simulate('click');
    expect(setTimeExpired).toHaveBeenCalled();
  });
});