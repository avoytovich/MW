// ToDo[major]: add exact routes for not staging env
import React, { lazy, useEffect } from 'react';
import {
  Switch,
  Redirect,
  Route,
  useHistory,
} from 'react-router-dom';
import defPath from '../helpers/routingHelper';
import Session from '../session';

const SignedRoutes = () => {
  const history = useHistory();

  useEffect(() => {
    const redirect = Session.getRedirect();
    Session.clearRedirect();

    if (redirect && redirect !== '/' && redirect !== '/login') {
      history.push(redirect);
    }

    return () => Session.clearRedirect();
  }, []);

  return (
    <Switch>
      <Route
        path={`${defPath}/`}
        exact
        component={lazy(() => import('../../screens/DashboardScreen'))}
      />
      <Route
        path={`${defPath}/overview/products/:id`}
        component={lazy(() => import('../../screens/ProductDetailsScreen/EditProduct'))}
      />
      <Route
        path={`${defPath}/overview/products`}
        component={lazy(() => import('../../screens/ProductsScreen'))}
      />
      <Route
        path={`${defPath}/overview/stores/:id`}
        component={lazy(() => import('../../screens/StoreDetailsScreen'))}
      />
      <Route
        path={`${defPath}/overview/stores`}
        component={lazy(() => import('../../screens/StoresScreen'))}
      />
      <Route
        path={`${defPath}/overview/orders/:id`}
        component={lazy(() => import('../../screens/OrderDetailsScreen'))}
      />
      <Route
        path={`${defPath}/overview/orders`}
        component={lazy(() => import('../../screens/OrdersScreen'))}
      />
      <Route
        path={`${defPath}/overview/subscriptions/:id`}
        component={lazy(() => import('../../screens/SubscriptionDetailsScreen'))}
      />
      <Route
        path={`${defPath}/overview/subscriptions`}
        component={lazy(() => import('../../screens/SubscriptionsScreen'))}
      />
      <Route
        path={`${defPath}/my-account`}
        component={lazy(() => import('../../screens/MyAccountScreen'))}
      />
      <Route
        path={`${defPath}/settings/identities/:id`}
        component={lazy(() => import('../../screens/IdentityDetailsScreen'))}
      />
      <Route
        path={`${defPath}/settings/identities`}
        component={lazy(() => import('../../screens/IdentitiesScreen'))}
      />
      <Route
        path={`${defPath}/settings/administration/customers/:id`}
        component={lazy(() => import('../../screens/AdministrationDetailsScreens/CustomerDetailScreen'))}
      />
      <Route
        path={`${defPath}/settings/administration/metaRoles/:id`}
        component={lazy(() => import('../../screens/AdministrationDetailsScreens/MetaRoleDetailScreen'))}
      />
      <Route
        path={`${defPath}/settings/administration/roles/:id`}
        component={lazy(() => import('../../screens/AdministrationDetailsScreens/RoleDetailScreen'))}
      />
      <Route
        path={`${defPath}/settings/administration/privileges/:id`}
        component={lazy(() => import('../../screens/AdministrationDetailsScreens/PrivilegesDetailScreen'))}
      />
      <Route
        path={`${defPath}/settings/administration`}
        component={lazy(() => import('../../screens/AdministrationScreen'))}
      />
      <Route
        path={`${defPath}/marketing/discounts/:id`}
        component={lazy(() => import('../../screens/DiscountDetailsScreen'))}
      />
      <Route
        path={`${defPath}/marketing/recommendations/:id`}
        component={lazy(() => import('../../screens/RecoDetailsScreen'))}
      />
      <Route
        path={`${defPath}/marketing/campaigns/:id`}
        component={lazy(() => import('../../screens/CampaignDetailsScreen'))}
      />
      <Route
        path={`${defPath}/marketing/prices/:id`}
        component={lazy(() => import('../../screens/PricesDetailsScreen'))}
      />
      <Route
        path={`${defPath}/marketing`}
        component={lazy(() => import('../../screens/MarketingScreen'))}
      />
      <Route
        path={`${defPath}/checkout-experience/fonts/add`}
        component={lazy(() => import('../../screens/FontScreen/FontAddScreen'))}
      />
      <Route
        path={`${defPath}/checkout-experience/themes/add`}
        component={lazy(() => import('../../screens/ThemeScreen/ThemeAddScreen'))}
      />
      <Route
        path={`${defPath}/checkout-experience/layouts/add`}
        component={lazy(() => import('../../screens/LayoutScreen/LayoutAddScreen'))}
      />
      <Route
        path={`${defPath}/checkout-experience/translations/add`}
        component={lazy(() => import('../../screens/TranslationScreen/TranslationAddScreen'))}
      />
      <Route
        path={`${defPath}/checkout-experience/themes/:id`}
        component={lazy(() => import('../../screens/ThemeScreen/ThemeEditScreen'))}
      />
      <Route
        path={`${defPath}/checkout-experience/layouts/:id`}
        component={lazy(() => import('../../screens/LayoutScreen/LayoutEditScreen'))}
      />
      <Route
        path={`${defPath}/checkout-experience/translations/:id`}
        component={lazy(() => import('../../screens/TranslationScreen/TranslationEditScreen'))}
      />
      <Route
        path={`${defPath}/checkout-experience/fonts/:id`}
        component={lazy(() => import('../../screens/FontScreen/FontEditScreen'))}
      />
      <Route
        path={`${defPath}/checkout-experience`}
        component={lazy(() => import('../../screens/CheckoutExperienceScreen'))}
      />
      <Route
        path={`${defPath}/products/add`}
        component={lazy(() => import('../../screens/ProductDetailsScreen/CreateProduct'))}
      />
      <Route
        path={`${defPath}/overview/invoices-credit-notes`}
        component={lazy(() => import('../../screens/InvoicesCreditNotesScreen/InvoicesCreditNotesScreen'))}
      />

      <Redirect to={`${defPath}/`} />
    </Switch>
  );
};

export default SignedRoutes;
