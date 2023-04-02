import React from 'react';
import { shallow } from 'enzyme';
import Footer from './index';

const createComponent = (props={}) => {
  const component = shallow(<Footer {...props} />);
  return component;
};

describe('Footer component', () => {
  let component;

  beforeEach(() => {
      component = createComponent(); 
  });

  it('Should render footer', () => {
    const wrapper = component.find(`[data-test="footer"]`);
    expect(wrapper.length).toBe(1);
  });

  it('Should render footer text', () => {
    const footerText = component.find(`[data-test="footer-text"]`).text();
    expect(footerText).toMatch('© 2023 LectoGym. Todos los derechos reservados.');
  });
});