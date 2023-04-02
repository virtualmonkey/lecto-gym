import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import enableHooks from 'jest-react-hooks-shallow';

enableHooks(jest);

Enzyme.configure({
  adapter: new EnzymeAdapter(),
  disableLifecycleMethods: true,
});