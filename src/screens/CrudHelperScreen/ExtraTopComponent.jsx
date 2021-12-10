import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Button,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

// import AddCircle from '@material-ui/icons/AddCircle';
import CachedIcon from '@material-ui/icons/Cached';

import { InputCustom } from '../../components/Inputs';

// import parentPaths from '../../services/paths';
import { setNexwayState } from '../../redux/actions/Account';

import localization from '../../localization';

const endpointsOptions = [
  { id: '/catalogs', value: '/catalogs' },
  { id: '/consent-manager/consents', value: '/consent-manager/consents' },
  { id: '/contracts/partners', value: '/contracts/partners' },
  { id: '/dexter/logs', value: '/dexter/logs' },
  { id: '/email-builder/template-samples', value: '/email-builder/template-samples' },
  { id: '/geoip', value: '/geoip' },
  { id: '/license-manager/license-provider-definitions', value: '/license-manager/license-provider-definitions' },
  { id: '/license-manager/licenses', value: '/license-manager/licenses' },
  { id: '/payment-proxy/persisted-payments', value: '/payment-proxy/persisted-payments' },
  { id: '/payment-proxy/transactions', value: '/payment-proxy/transactions' },
  { id: '/service-example-golang/examples', value: '/service-example-golang/examples' },
  { id: '/service-example-java/examples', value: '/service-example-java/examples' },
  { id: '/stores', value: '/stores' },
  { id: '/subscription-manager/models', value: '/subscription-manager/models' },
  { id: '/subscription-manager/subscriptionModels', value: '/subscription-manager/subscriptionModels' },
  { id: '/subscription-manager/subscriptions', value: '/subscription-manager/subscriptions' },
  { id: '/subscriptions/models', value: '/subscriptions/models' },
  { id: '/subscriptions/subscriptions', value: '/subscriptions/subscriptions' },
  { id: '/tandcs', value: '/tandcs' },
  { id: '/tandcs/tandcs', value: '/tandcs/tandcs' },
  { id: '/tandcs/templates', value: '/tandcs/templates' },
  { id: '/tandcs/variables', value: '/tandcs/variables' },
  { id: '/vatcheck', value: '/vatcheck' },
  { id: '/vatengine', value: '/vatengine' },
  { id: '/zipcode', value: '/zipcode' },
  { id: '/assets', value: '/assets' },
  { id: '/audits/auditItems', value: '/audits/auditItems' },
  { id: '/billing-plan-manager/billing-plans', value: '/billing-plan-manager/billing-plans' },
  { id: '/campaigns/abandonedcarts', value: '/campaigns/abandonedcarts' },
  { id: '/carts', value: '/carts' },
  { id: '/carts/public', value: '/carts/public' },
  { id: '/customer-notifier/notification-definitions', value: '/customer-notifier/notification-definitions' },
  { id: '/customer-notifier/notifications', value: '/customer-notifier/notifications' },
  { id: '/customer-notifier/receivers', value: '/customer-notifier/receivers' },
  { id: '/customers', value: '/customers' },
  { id: '/customers/public', value: '/customers/public' },
  { id: '/designs/fonts', value: '/designs/fonts' },
  { id: '/designs/i18ns', value: '/designs/i18ns' },
  { id: '/designs/layouts', value: '/designs/layouts' },
  { id: '/designs/legali18ns', value: '/designs/legali18ns' },
  { id: '/designs/themes', value: '/designs/themes' },
  { id: '/designs/visual-libraries', value: '/designs/visual-libraries' },
  { id: '/discounts', value: '/discounts' },
  { id: '/discounts/usages', value: '/discounts/usages' },
  { id: '/email-builder/operations', value: '/email-builder/operations' },
  { id: '/email-builder/template-definitions', value: '/email-builder/template-definitions' },
  { id: '/email-builder/template-samples', value: '/email-builder/template-samples' },
  { id: '/endusers', value: '/endusers' },
  { id: '/endusers/groups', value: '/endusers/groups' },
  { id: '/fulfillments/fulfillments', value: '/fulfillments/fulfillments' },
  { id: '/fulfillments/partners', value: '/fulfillments/partners' },
  { id: '/iam/identities', value: '/iam/identities' },
  { id: '/iam/meta-roles', value: '/iam/meta-roles' },
  { id: '/iam/privileges', value: '/iam/privileges' },
  { id: '/iam/realms', value: '/iam/realms' },
  { id: '/iam/roles', value: '/iam/roles' },
  { id: '/iam/roles/usableForIdentity', value: '/iam/roles/usableForIdentity' },
  { id: '/iam/tokens', value: '/iam/tokens' },
  { id: '/invoices/credits', value: '/invoices/credits' },
  { id: '/invoices/invoices', value: '/invoices/invoices' },
  { id: '/license-keys-provider/import', value: '/license-keys-provider/import' },
  { id: '/license-keys-provider/packages', value: '/license-keys-provider/packages' },
  { id: '/license-manager/license-provider-definitions', value: '/license-manager/license-provider-definitions' },
  { id: '/license-manager/licenses', value: '/license-manager/licenses' },
  { id: '/marketing-campaign/campaigns', value: '/marketing-campaign/campaigns' },
  { id: '/onboarding', value: '/onboarding' },
  { id: '/orders', value: '/orders' },
  { id: '/ordersgs', value: '/ordersgs' },
  { id: '/payment-proxy', value: '/payment-proxy' },
  { id: '/payment-proxy/available-payment-types', value: '/payment-proxy/available-payment-types' },
  { id: '/payment-proxy/orders-by-card-digits', value: '/payment-proxy/orders-by-card-digits' },
  { id: '/payment-proxy/payments', value: '/payment-proxy/payments' },
  { id: '/payment-proxy/service/config', value: '/payment-proxy/service/config' },
  { id: '/prices', value: '/prices' },
  { id: '/product-recommendations', value: '/product-recommendations' },
  { id: '/products', value: '/products' },
  { id: '/products/descriptions', value: '/products/descriptions' },
  { id: '/products/price-functions', value: '/products/price-functions' },
  { id: '/purchases', value: '/purchases' },
  { id: '/remittables', value: '/remittables' },
];

const ExtraTopComponent = () => {
  const dispatch = useDispatch();
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);
  const nxCrudHelper = nxState?.crudHelper;
  const [searchVal, setSearchVal] = useState('');
  const [curEndpointVal, setCurEndpoint] = useState(nxCrudHelper?.endpointId || '');
  const [curParamsVal, setCurParams] = useState(nxCrudHelper?.extraParams || '');

  const resolveValue = () => {
    const [resolveArr] = endpointsOptions.filter((item) => item.id === curEndpointVal);

    return resolveArr || '';
  };

  const withFilter = (arr) => {
    const newArr = [...arr.reduce((acc, each) => (
      [...acc, {
        id: each.id,
        name: each.value,
      }]
    ), [])];

    const toReturn = searchVal ? newArr.filter(
      (item) => item?.name?.toLowerCase().indexOf(searchVal?.toLowerCase()) >= 0,
    ) : newArr;

    return toReturn.length ? [...toReturn] : [{ id: 'none', name: 'No Results' }];
  };

  const updateCrudSearch = () => dispatch(setNexwayState({
    ...nxState,
    crudHelper: {
      extraParams: curParamsVal,
      endpointId: curEndpointVal,
    },
  }));

  const defEndpoint = nxCrudHelper?.endpointId || '';
  const defParams = nxCrudHelper?.extraParams || '';

  const hasReloadChanges = curEndpointVal
    && (curEndpointVal !== defEndpoint || curParamsVal !== defParams);

  return (
    <Box display="flex" flexDirection="row" alignItems="center" my={2} mt='30px'>
      <Box width="40%" mr={2}>
        <Autocomplete
          data-test='renewingProducts'
          id="products-select"
          options={withFilter(endpointsOptions)}
          value={resolveValue()}
          onChange={(e, newVal) => setCurEndpoint(newVal?.id || '')}
          filterOptions={(opts) => opts}
          getOptionLabel={(option) => option.name || option.id || ''}
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              id="outlined-search"
              label={localization.t('labels.resourceUrlEndpoint')}
              type="search"
              variant="outlined"
              onChange={(e) => setSearchVal(e.target.value)}
            />
          )}
        />
      </Box>

      <Box width="40%" mr={2}>
        <InputCustom
          label='extraParams'
          value={curParamsVal}
          onChangeInput={(e) => setCurParams(e.target.value)}
        />
      </Box>

      <Box flexGrow={1} textAlign='right'>
        <Button
          id='reload-resource-button'
          color='primary'
          size='large'
          style={{ marginRight: '12px', width: '125px' }}
          variant={hasReloadChanges ? 'contained' : 'outlined'}
          onClick={updateCrudSearch}
        >
          <CachedIcon style={{ marginRight: 10, fontSize: 20 }} />
          {localization.t('general.reload')}
        </Button>

        {/* <Button
          id='add-resource-button'
          color='primary'
          size='large'
          style={{ width: '125px' }}
          variant='contained'
          component={Link}
          to={`${parentPaths.crudHelper.request}`}
        >
          <AddCircle style={{ marginRight: 10, fontSize: 20 }} />
          {localization.t('general.add')}
        </Button> */}
      </Box>
    </Box>
  );
};

export default ExtraTopComponent;
