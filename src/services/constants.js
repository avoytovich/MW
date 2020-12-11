const VALID_REFRESH_SCOPES = ['products', 'stores', 'orders'];
const VALID_FILTER_SCOPES = ['products', 'stores', 'orders'];

export { VALID_REFRESH_SCOPES, VALID_FILTER_SCOPES };

export const initialSortParams = {
  value: 'updateDate',
  type: 'desc',
};

export const initialIdentitiesSortParams = {
  value: 'firstName',
  type: 'desc',
};

export const initialCustomerAdminSortParams = {
  value: 'name',
  type: 'desc',
};
