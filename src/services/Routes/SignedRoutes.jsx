// ToDo[major]: add exact routes for not staging env
import React, { lazy, useEffect } from 'react';
import {
  Switch,
  Redirect,
  Route,
  useHistory,
} from 'react-router-dom';
import parentPaths from '../paths';
import defPath from '../helpers/routingHelper';
import Session from '../session';
import { KNOWN_REALMS } from '../constants';

const SignedRoutes = () => {
  const history = useHistory();

  useEffect(() => {
    const redirect = Session.getRedirect();
    Session.clearRedirect();

    if (redirect && redirect !== '/' && KNOWN_REALMS.indexOf(redirect) < 0) {
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
        path={`${defPath}${parentPaths.productlist}/add`}
        component={lazy(() => import('../../screens/ProductDetailsScreen/CreateProduct'))}
      />
      <Route
        path={`${defPath}${parentPaths.productlist}/:id`}
        component={lazy(() => import('../../screens/ProductDetailsScreen/EditProduct'))}
      />
      <Route
        path={`${defPath}${parentPaths.productlist}`}
        component={lazy(() => import('../../screens/ProductsScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.fulfillment}/licenseProviderDefinitions/:id`}
        component={lazy(() => import('../../screens/LicenseProviderDefinitionDetails'))}
      />
      <Route
        path={`${defPath}${parentPaths.fulfillment}`}
        component={lazy(() => import('../../screens/FulfillmentPackagesScreen'))}
      />

      <Route
        path={`${defPath}${parentPaths.stores}/:id`}
        component={lazy(() => import('../../screens/StoreDetailsScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.stores}`}
        component={lazy(() => import('../../screens/StoresScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.orderlist}/:id`}
        component={lazy(() => import('../../screens/OrderDetailsScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.orderlist}`}
        component={lazy(() => import('../../screens/OrdersScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.subscriptions}/:id`}
        component={lazy(() => import('../../screens/SubscriptionDetailsScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.subscriptions}`}
        component={lazy(() => import('../../screens/SubscriptionsScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.myaccount}`}
        component={lazy(() => import('../../screens/MyAccountScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.licenses}/:id`}
        component={lazy(() => import('../../screens/LicenseDetailsScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.licenses}`}
        component={lazy(() => import('../../screens/LicensesScreen/LicensesScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.users}/:id`}
        component={lazy(() => import('../../screens/IdentityDetailsScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.users}`}
        component={lazy(() => import('../../screens/IdentitiesScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.notifications}/notification-history/:id`}
        component={lazy(() => import('../../screens/NotificationHistoryDetailsScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.notifications}/notification-definition/:id`}
        component={lazy(() => import('../../screens/NotificationDefinitionDetailsScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.notifications}/notifications/:id`}
        component={lazy(() => import('../../screens/NotificationDetailScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.administration}/customers/:id`}
        component={lazy(() => import('../../screens/AdministrationDetailsScreens/CustomerDetailScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.administration}/metaRoles/:id`}
        component={lazy(() => import('../../screens/AdministrationDetailsScreens/MetaRoleDetailScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.administration}/roles/:id`}
        component={lazy(() => import('../../screens/AdministrationDetailsScreens/RoleDetailScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.administration}/privileges/:id`}
        component={lazy(() => import('../../screens/AdministrationDetailsScreens/PrivilegesDetailScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.administration}`}
        component={lazy(() => import('../../screens/AdministrationScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.carts}`}
        component={lazy(() => import('../../screens/CartsScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.notifications}`}
        component={lazy(() => import('../../screens/NotificationScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.marketing}/discounts/:id`}
        component={lazy(() => import('../../screens/DiscountDetailsScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.marketing}/recommendations/:id`}
        component={lazy(() => import('../../screens/RecoDetailsScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.marketing}/campaigns/:id`}
        component={lazy(() => import('../../screens/CampaignDetailsScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.marketing}/prices/:id`}
        component={lazy(() => import('../../screens/PricesDetailsScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.marketing}`}
        component={lazy(() => import('../../screens/MarketingScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.checkoutpagebuilder}/fonts/add`}
        component={lazy(() => import('../../screens/FontScreen/FontAddScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.checkoutpagebuilder}/themes/add`}
        component={lazy(() => import('../../screens/ThemeScreen/ThemeAddScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.checkoutpagebuilder}/layouts/add`}
        component={lazy(() => import('../../screens/LayoutScreen/LayoutAddScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.checkoutpagebuilder}/themes/:id`}
        component={lazy(() => import('../../screens/ThemeScreen/ThemeEditScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.checkoutpagebuilder}/layouts/:id`}
        component={lazy(() => import('../../screens/LayoutScreen/LayoutEditScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.checkoutpagebuilder}/fonts/:id`}
        component={lazy(() => import('../../screens/FontScreen/FontEditScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.checkoutpagebuilder}`}
        component={lazy(() => import('../../screens/CheckoutExperienceScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.localization}/translations/add`}
        component={lazy(() => import('../../screens/TranslationScreen/TranslationAddScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.localization}/translations/:id`}
        component={lazy(() => import('../../screens/TranslationScreen/TranslationEditScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.localization}`}
        component={lazy(() => import('../../screens/LocalizationScreen'))}
      />

      <Route
        path={`${defPath}${parentPaths.invoices}`}
        component={lazy(() => import('../../screens/InvoicesCreditNotesScreen/InvoicesCreditNotesScreen'))}
      />
      <Redirect to={`${defPath}/`} />
    </Switch>
  );
};

export default SignedRoutes;
