import React from 'react';
import { shallow } from 'enzyme';
import CountdownTimer from './index';

const createComponent = (props={}) => {
  const component = shallow(
    <CountdownTimer {...props}  />
  );
  return component;
};

describe('CountdownTimer component', () => {
  let component;
  let props;
  const setTimeExpired = jest.fn();
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 2);

  beforeEach(() => {
    props = {
      setTimeExpired: setTimeExpired,
      expiryTimestamp: expiryTimestamp
    }
  });

  it('Should render CountdownTimer', () => {
    component = createComponent(props);
    const wrapper = component.find(`[data-test="countdownTimer"]`);
    expect(wrapper.length).toBe(1);
  });

  it('Should fire setTimeExpired', async () => {
    component = createComponent(props);
    component.find(`[data-test="countdownTimer-button"]`).simulate('click');
    await new Promise((r) => setTimeout(r, 2000));
    expect(setTimeExpired).toHaveBeenCalled();
  });

  it('Should set expiryTimeStamp', async () => {
    component = createComponent(props);
    const wrapper = component.find(`[data-test="countdownTimer-time"]`);
    expect(wrapper.text()).toBe('0 s');
  });
});
