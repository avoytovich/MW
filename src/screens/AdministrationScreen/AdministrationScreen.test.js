import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import AdministrationScreen from './AdministrationScreen';
import TableComponent from '../../components/TableComponent';

jest.mock('react-redux', () => ({ useDispatch: jest.fn() }));
jest.mock('../../services/useData');

describe('<AdministrationScreen />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AdministrationScreen />);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should have TableComponent component when Customers tab is active ', () => {
    wrapper = mount(
      <Router>
        <AdministrationScreen
          location={{ pathname: '/administration/customers' }}
        />
      </Router>,
    );
    expect(wrapper.find(TableComponent)).toHaveLength(1);
  });

  it('should have TableComponent component when Role tab is active ', () => {
    wrapper = mount(
      <Router>
        <AdministrationScreen
          location={{ pathname: '/administration/roles' }}
        />
      </Router>,
    );
    expect(wrapper.find(TableComponent)).toHaveLength(1);
  });

  it('should have TableComponent component when Meta-Role tab is active ', () => {
    wrapper = mount(
      <Router>
        <AdministrationScreen
          location={{ pathname: '/administration/metaRoles' }}
        />
      </Router>,
    );
    expect(wrapper.find(TableComponent)).toHaveLength(1);
  });

  it('should have TableComponent component when Privileges tab is active ', () => {
    wrapper = mount(
      <Router>
        <AdministrationScreen
          location={{ pathname: '/administration/privileges' }}
        />
      </Router>,
    );
    expect(wrapper.find(TableComponent)).toHaveLength(1);
  });

});
