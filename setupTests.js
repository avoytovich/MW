/* eslint-disable import/no-extraneous-dependencies */
import Enzyme from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new EnzymeAdapter() });
