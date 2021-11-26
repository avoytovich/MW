// ToDo[major]: add exact routes for not staging env
import React, { lazy, useEffect } from 'react';
import {
  Switch,
  Redirect,
  Route,
  useHistory,
} from 'react-router-dom';

import defPath from '../helpers/routingHelper';
import parentPaths from '../paths';
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
        path={parentPaths.default}
        exact
        component={lazy(() => import('../../screens/DashboardScreen'))}
      />
      <Route
        path={`${parentPaths.productlist}/add`}
        component={lazy(() => import('../../screens/ProductDetailsScreen/CreateProduct'))}
      />
      <Route
        path={`${parentPaths.productlist}/:id`}
        component={lazy(() => import('../../screens/ProductDetailsScreen/EditProduct'))}
      />
      <Route
        path={`${parentPaths.productlist}`}
        component={lazy(() => import('../../screens/ProductsScreen'))}
      />
      <Route
        path={`${parentPaths.fulfillment.autoFulfillmentsTab}/:id`}
        component={lazy(() => import('../../screens/AutoFulfillmentDetails'))}
      />
      <Route
        path={`${parentPaths.fulfillment.licenseProviderDefinitionsTab}/:id`}
        component={lazy(() => import('../../screens/LicenseProviderDefinitionDetails'))}
      />
      <Route
        path={`${parentPaths.fulfillment.main}`}
        component={lazy(() => import('../../screens/FulfillmentPackagesScreen'))}
      />

      <Route
        path={`${parentPaths.stores}/:id`}
        component={lazy(() => import('../../screens/StoreDetailsScreen'))}
      />
      <Route
        path={`${parentPaths.stores}`}
        component={lazy(() => import('../../screens/StoresScreen'))}
      />
      <Route
        path={`${parentPaths.orderlist}/:id`}
        component={lazy(() => import('../../screens/OrderDetailsScreen'))}
      />
      <Route
        path={`${parentPaths.orderlist}`}
        component={lazy(() => import('../../screens/OrdersScreen'))}
      />
      <Route
        path={`${parentPaths.subscriptions}/:id`}
        component={lazy(() => import('../../screens/SubscriptionDetailsScreen'))}
      />
      <Route
        path={`${parentPaths.subscriptions}`}
        component={lazy(() => import('../../screens/SubscriptionsScreen'))}
      />
      <Route
        path={`${parentPaths.myaccount}`}
        component={lazy(() => import('../../screens/MyAccountScreen'))}
      />
      <Route
        path={`${parentPaths.licenses}/:id`}
        component={lazy(() => import('../../screens/LicenseDetailsScreen'))}
      />
      <Route
        path={`${parentPaths.licenses}`}
        component={lazy(() => import('../../screens/LicensesScreen/LicensesScreen'))}
      />
      <Route
        path={`${parentPaths.users}/:id`}
        component={lazy(() => import('../../screens/IdentityDetailsScreen'))}
      />
      <Route
        path={`${parentPaths.users}`}
        component={lazy(() => import('../../screens/IdentitiesScreen'))}
      />
      <Route
        path={`${parentPaths.notifications.notificationHistoryTab}/:id`}
        component={lazy(() => import('../../screens/NotificationHistoryDetailsScreen'))}
      />
      <Route
        path={`${parentPaths.notifications.notificationDefinitionTab}/:id`}
        component={lazy(() => import('../../screens/NotificationDefinitionDetailsScreen'))}
      />
      <Route
        path={`${parentPaths.notifications.notificationTab}/:id`}
        component={lazy(() => import('../../screens/NotificationDetailScreen'))}
      />
      <Route
        path={`${parentPaths.customers}/:id`}
        component={lazy(() => import('../../screens/CustomerDetailScreen'))}
      />
      <Route
        path={`${parentPaths.customers}`}
        component={lazy(() => import('../../screens/CustomersScreen'))}
      />
      <Route
        path={`${parentPaths.userroles.metaRoles}/:id`}
        component={lazy(() => import('../../screens/AdministrationDetailsScreens/MetaRoleDetailScreen'))}
      />
      <Route
        path={`${parentPaths.userroles.roles}/:id`}
        component={lazy(() => import('../../screens/AdministrationDetailsScreens/RoleDetailScreen'))}
      />
      <Route
        path={`${parentPaths.userroles.privileges}/:id`}
        component={lazy(() => import('../../screens/AdministrationDetailsScreens/PrivilegesDetailScreen'))}
      />
      <Route
        path={`${parentPaths.userroles.main}`}
        component={lazy(() => import('../../screens/AdministrationScreen'))}
      />
      <Route
        path={`${parentPaths.emailbuilder}/:id`}
        component={lazy(() => import('../../screens/EmailBuilderDetailsScreen'))}
      />
      <Route
        path={`${parentPaths.emailbuilder}`}
        component={lazy(() => import('../../screens/EmailBuilderScreen'))}
      />
      <Route
        path={`${parentPaths.endusers}/:id`}
        component={lazy(() => import('../../screens/EndUserDetailScreen'))}
      />
      <Route
        path={`${parentPaths.resellers}/:id`}
        component={lazy(() => import('../../screens/EndUserDetailScreen'))}
      />
      <Route
        path={`${parentPaths.resellers}`}
        component={lazy(() => import('../../screens/ResellerScreen'))}
      />
      <Route
        path={`${parentPaths.carts}/add`}
        component={lazy(() => import('../../screens/CartDetailsScreen/AddCart'))}
      />
      <Route
        path={`${parentPaths.carts}/:id`}
        component={lazy(() => import('../../screens/CartDetailsScreen'))}
      />
      <Route
        path={`${parentPaths.carts}`}
        component={lazy(() => import('../../screens/CartsScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.endusergroups}/:id`}
        component={lazy(() => import('../../screens/EndUsersGroupsDetailsScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.endusergroups}`}
        component={lazy(() => import('../../screens/EndUsersGroupsScreen'))}
      />
      <Route
        path={`${parentPaths.notifications.main}`}
        component={lazy(() => import('../../screens/NotificationScreen'))}
      />
      <Route
        path={`${parentPaths.discountrules}/:id`}
        component={lazy(() => import('../../screens/DiscountDetailsScreen'))}
      />
      <Route
        path={`${parentPaths.discountrules}`}
        component={lazy(() => import('../../screens/DiscountsScreen'))}
      />
      <Route
        path={`${parentPaths.recommendations}/:id`}
        component={lazy(() => import('../../screens/RecoDetailsScreen'))}
      />
      <Route
        path={`${parentPaths.recommendations}`}
        component={lazy(() => import('../../screens/RecommendationScreen'))}
      />
      <Route
        path={`${parentPaths.campaigns.abandoned}/:id`}
        component={lazy(() => import('../../screens/AbandonedCartDetailScreen'))}
      />
      <Route
        path={`${parentPaths.campaigns.campaigns}/:id`}
        component={lazy(() => import('../../screens/CampaignDetailsScreen'))}
      />
      <Route
        path={`${parentPaths.campaigns.main}`}
        component={lazy(() => import('../../screens/MarketingScreen'))}
      />

      <Route
        path={`${parentPaths.pricemodels.pricesTab}/:id`}
        component={lazy(() => import('../../screens/PricesDetailsScreen'))}
      />
      <Route
        path={`${parentPaths.pricemodels.main}`}
        component={lazy(() => import('../../screens/PriceModelsScreen'))}
      />
      <Route
        path={`${parentPaths.checkoutpagebuilder.themesTab}/:id`}
        component={lazy(() => import('../../screens/ThemeDetailsScreen'))}
      />
      <Route
        path={`${parentPaths.checkoutpagebuilder.layoutsTab}/:id`}
        component={lazy(() => import('../../screens/LayoutDetailsScreen'))}
      />
      <Route
        path={`${parentPaths.checkoutpagebuilder.fontsTab}/:id`}
        component={lazy(() => import('../../screens/FontDetailsScreen'))}
      />
      <Route
        path={`${parentPaths.checkoutpagebuilder.main}`}
        component={lazy(() => import('../../screens/CheckoutExperienceScreen'))}
      />
      <Route
        path={`${parentPaths.localization.translationsTab}/:id`}
        component={lazy(() => import('../../screens/TranslationDetailScreen'))}
      />
      <Route
        path={`${parentPaths.localization.main}`}
        component={lazy(() => import('../../screens/LocalizationScreen'))}
      />
      <Route
        path={`${defPath}${parentPaths.endusers}`}
        component={lazy(() => import('../../screens/EndUsersScreen'))}
      />
      <Route
        path={`${parentPaths.onboarding}/:id`}
        component={lazy(() => import('../../screens/OnboardingDetailsScreen'))}
      />
      <Route
        path={`${parentPaths.onboarding}`}
        component={lazy(() => import('../../screens/OnboardingScreen'))}
      />

      <Route
        path={`${parentPaths.invoices}`}
        component={lazy(() => import('../../screens/InvoicesCreditNotesScreen/InvoicesCreditNotesScreen'))}
      />

      <Redirect to='/' />
    </Switch>
  );
};

export default SignedRoutes;
