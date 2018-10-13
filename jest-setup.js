/**
 * author: richard.sproson.
 * date: 13.10.2018.
 * file: jestsetup.js.
 */

// import raf from './jest-polyfill';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
// import 'babel-polyfill';

Enzyme.configure({ adapter: new Adapter() });

// global.fetch = require('jest-fetch-mock');
global.shallow = shallow;
// global.render = render;
// global.mount = mount;