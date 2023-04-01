import React from 'react';
import { shallow } from 'enzyme';
import CustomLink from './index';

const createComponent = (props={}) => {
  const component = shallow(
    <CustomLink.WrappedComponent {...props}>
      Custom Link
    </CustomLink.WrappedComponent>
  );
  return component;
};

describe('CustomLink component', () => {
  let component;
  let props;
  const onClick = jest.fn();
  
  beforeEach(() => {
    props = {
      to: '/route',
      onClick: onClick,
      history: {
        push: () => {}
      }
    }
  });

  it('Should render CustomLink', () => {
    component = createComponent(props);
    const wrapper = component.find(`[data-test="link"]`);
    expect(wrapper.length).toBe(1);
  });

  it('Should fire onClick event', () => {
    component = createComponent(props)
    const wrapper = component.find(`[data-test="link"]`);
    wrapper.simulate('click');
    expect(onClick).toHaveBeenCalled();
  });

  it('Should render children', () => {
    component = createComponent(props)
    const wrapper = component.find(`[data-test="link"]`);
    expect(wrapper.children().text()).toBe('Custom Link');
  });
});
