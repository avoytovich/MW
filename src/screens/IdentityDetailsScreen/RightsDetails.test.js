import React from 'react';
import { mount } from 'enzyme';

import RightsDetails from './RightsDetails';
import CustomCard from '../../components/utils/CustomCard';

const testIdentity = {
  roleIds: ['test-role-1', 'test-role-2', 'test-role-3'],
  metaRoleIds: ['test-meta-1', 'test-meta-2']
};

const testPrivileges = [
  { id: 'test-privilege-1', serviceName: 'test-privilege-servicename-1' },
  { id: 'test-privilege-2', serviceName: 'test-privilege-servicename-2' },
  { id: 'test-privilege-3', serviceName: 'test-privilege-servicename-3' },
  { id: 'test-privilege-4', serviceName: 'test-privilege-servicename-4' }
];

const testRoles = [
  {
    id: 'test-role-1',
    serviceName: 'test-servicename-1',
    name: 'test-name-1',
    rights: [{ serviceName: 'test-privilege-servicename-1' }]
  }, {
    id: 'test-role-2',
    serviceName: 'test-servicename-2',
    name: 'test-name-2',
    rights: [{ serviceName: 'test-privilege-servicename-2' }]
  }, {
    id: 'test-role-3',
    serviceName: 'test-servicename-3',
    name: 'test-name-3',
    rights: [{ serviceName: 'test-privilege-servicename-3' }]
  },
  { id: 'test-role-4', serviceName: 'test-servicename-4', name: 'test-name-4' },
  { id: 'test-role-5', serviceName: 'test-servicename-5', name: 'test-name-5' }
];

const testMetaRoles = [
  { id: 'test-meta-1', serviceName: 'test-meta-servicename-1', name: 'test-meta-name-1' },
  { id: 'test-meta-2', serviceName: 'test-meta-servicename-2', name: 'test-meta-name-2' },
  { id: 'test-meta-3', serviceName: 'test-meta-servicename-3', name: 'test-meta-name-3' },
  { id: 'test-meta-4', serviceName: 'test-meta-servicename-4', name: 'test-meta-name-4' },
  { id: 'test-meta-5', serviceName: 'test-meta-servicename-5', name: 'test-meta-name-5' }
];

jest.mock('../../services/useData', () => ({
  usePrivilegesData: jest.fn().mockReturnValue({ items: testPrivileges }),
  useRolesData: jest.fn().mockReturnValue({ items: testRoles }),
  useMetaRolesData: jest.fn().mockReturnValue({ items: testMetaRoles })
}));

describe('<RightsDetails />', () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(<RightsDetails identity={testIdentity} />);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should have three <CustomCard />', () => {
    expect(wrapper.find(CustomCard)).toHaveLength(3);
  });

  it('should have privileges items populated', () => {
    expect(wrapper.find('.rights-details-privileges input')).toHaveLength(testPrivileges.length);

    testPrivileges.forEach((privileges) => {
      expect(wrapper.find(`input[name="${privileges.serviceName}"]`)).toHaveLength(1);
    });
  });

  it('should have roles items populated', () => {
    expect(wrapper.find('.rights-details-roles input')).toHaveLength(testRoles.length);

    testRoles.forEach((role) => {
      expect(wrapper.find(`input[name="${role.serviceName}"]`)).toHaveLength(1);
    });
  });

  it('should have roles selected due to identity data', () => {
    testIdentity.roleIds.forEach((role) => {
      const [curRole] = testRoles.filter((r) => r.id === role);
      expect(wrapper.find(`input[name="${curRole.serviceName}"]`).instance().checked).toEqual(true);
    });
  });

  it('should have meta-roles items populated', () => {
    expect(wrapper.find('.rights-details-meta-roles input')).toHaveLength(testMetaRoles.length);

    testMetaRoles.forEach((metaRole) => {
      expect(wrapper.find(`input[name="${metaRole.serviceName}"]`)).toHaveLength(1);
    });
  });

  it('should have meta-roles selected due to identity data', () => {
    testIdentity.metaRoleIds.forEach((meta) => {
      const [curRole] = testMetaRoles.filter((r) => r.id === meta);
      expect(wrapper.find(`input[name="${curRole.serviceName}"]`).instance().checked).toEqual(true);
    });
  });
});
