import { getCustomerName } from '../../helpers/customersHelper';
import { getMetaRoleName, getRoleName } from '../../helpers/commonDataHelper';
import localization from '../../../localization';

const defaultShow = {
  fullName: true,
  customer: true,
  managedCustomerId: false,
  managedCustomer: false,
  roles: false,
  rolesIds: false,
  metaRoles: false,
  metaRolesIds: false,
  linkedCustomerId: false,
  linkedCustomer: false,
  userName: true,
  identityId: false,
  email: true,
  createDate: true,
};

const markUp = {
  headers: [
    {
      value: localization.t('labels.fullName'),
      id: 'fullName',
      sortParam: 'firstName',
    },
    {
      value: localization.t('labels.customer'),
      id: 'customer',
    },
    {
      value: localization.t('labels.managedCustomerId'),
      id: 'managedCustomerId',
    },
    {
      value: localization.t('labels.managedCustomer'),
      id: 'managedCustomer',
    },
    {
      value: localization.t('labels.roles'),
      id: 'roles',
    },
    {
      value: localization.t('labels.rolesIds'),
      id: 'rolesIds',
    },
    {
      value: localization.t('labels.metaRoles'),
      id: 'metaRoles',
    },
    {
      value: localization.t('labels.metaRolesIds'),
      id: 'metaRolesIds',
    },
    {
      value: localization.t('labels.linkedCustomer'),
      id: 'linkedCustomer',
    },
    {
      value: localization.t('labels.linkedCustomerId'),
      id: 'linkedCustomerId',
      sortParam: 'customer',
    },
    {
      value: localization.t('labels.userName'),
      id: 'userName',
      sortParam: 'userName',
    },
    {
      value: localization.t('labels.identityId'),
      id: 'identityId',
    },
    { value: localization.t('labels.email'), id: 'email', sortParam: 'email' },
    {
      value: localization.t('labels.accountCreated'),
      id: 'createDate',
      sortParam: 'createDate',
    },
  ],
};

const generateData = (data) => {
  const values = data.items.map(async (val) => {
    const returnData = {
      fullName: `${val.firstName} ${val.lastName}`,
      customer: val.customerId,
      id: val.id,
      managedCustomerId: val.authorizedCustomerIds?.length ? val.authorizedCustomerIds.join(', ') : '-',
      managedCustomer: '-',
      roles: '-',
      rolesIds: val.roleIds?.length ? val.roleIds.join(', ') : '-',
      metaRoles: '-',
      metaRolesIds: val.metaRoleIds?.length ? val.metaRoleIds.join(', ') : '-',
      linkedCustomerId: val.customerId,
      linkedCustomer: val.customerId,
      userName: val.userName,
      identityId: val.id,
      email: val.email,
      createDate: val.createDate,
    };

    if (val.authorizedCustomerIds?.length) {
      const authorizedCustomers = await val.authorizedCustomerIds.map(async (c) => {
        const name = await getCustomerName(c);

        return name;
      });

      await Promise
        .all(authorizedCustomers)
        .then((resp) => {
          returnData.managedCustomer = resp.join(', ');
        });
    }

    if (val.roleIds?.length) {
      const roles = await val.roleIds.map(async (role) => {
        const name = await getRoleName(role);

        return name;
      });

      await Promise
        .all(roles)
        .then((resp) => {
          returnData.roles = resp.join(', ');
        });
    }

    if (val.metaRoleIds?.length) {
      const roles = await val.metaRoleIds.map(async (metaRole) => {
        const name = await getMetaRoleName(metaRole);

        return name;
      });

      await Promise
        .all(roles)
        .then((resp) => {
          returnData.metaRoles = resp.join(', ');
        });
    }

    if (val.customerId) {
      const name = await getCustomerName(val.customerId);
      return { ...returnData, linkedCustomer: name };
    }

    return returnData;
  });

  const meta = {
    totalPages: data.totalPages,
  };

  return Promise
    .all(values)
    .then((resp) => {
      Object.assign(markUp, { values: resp, meta });

      return markUp;
    });
};

export { generateData, defaultShow, markUp };
