// ToDo[major]: add exact routes for not staging env
import React, { lazy, useEffect } from 'react';
import {
  Switch, Redirect, Route, useHistory,
} from 'react-router-dom';
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
        path="/overview/products/:id"
        component={lazy(() => import('../../screens/ProductDetailsScreen'))}
      />
      <Route
        path="/overview/products"
        component={lazy(() => import('../../screens/ProductsScreen'))}
      />
      <Route
        path="/overview/stores/:id"
        component={lazy(() => import('../../screens/StoreDetailsScreen'))}
      />
      <Route
        path="/overview/stores"
        component={lazy(() => import('../../screens/StoresScreen'))}
      />
      <Route
        path="/overview/orders/:id"
        component={lazy(() => import('../../screens/OrderDetailsScreen'))}
      />
      <Route
        path="/overview/orders"
        component={lazy(() => import('../../screens/OrdersScreen'))}
      />
      <Route
        path="/my-account"
        component={lazy(() => import('../../screens/MyAccountScreen'))}
      />
      <Route
        path="/settings/identities/:id"
        component={lazy(() => import('../../screens/IdentityDetailsScreen'))}
      />
      <Route
        path="/settings/identities"
        component={lazy(() => import('../../screens/IdentitiesScreen'))}
      />
      <Route
        path="/settings/administration/:id"
        component={lazy(() => import('../../screens/AdministrationDetailsScreen'))}
      />
      <Route
        path="/settings/administration"
        component={lazy(() => import('../../screens/AdministrationScreen'))}
      />
      <Route
        path="/marketing/discounts/:id"
        component={lazy(() => import('../../screens/DiscountDetailsScreen'))}
      />
      <Route
        path="/marketing/recommendations/:id"
        component={lazy(() => import('../../screens/RecoDetailsScreen'))}
      />
      <Route
        path="/marketing/campaigns/:id"
        component={lazy(() => import('../../screens/CampaignDetailsScreen'))}
      />
      <Route
        path="/marketing"
        component={lazy(() => import('../../screens/MarketingScreen'))}
      />
      <Route
        path="/checkout-experience/fonts/add"
        component={lazy(() => import('../../screens/FontScreen/FontAddScreen'))}
      />
      <Route
        path="/checkout-experience/themes/add"
        render={() => <div>add theme</div>}
      />
      <Route
        path="/checkout-experience/layouts/add"
        render={() => <div> add layout</div>}
      />
      <Route
        path="/checkout-experience/translations/add"
        render={() => <div> add translation</div>}
      />
      <Route
        path="/checkout-experience/themes/:id"
        render={() => <div>theme</div>}
      />
      <Route
        path="/checkout-experience/layouts/:id"
        render={() => <div>layout</div>}
      />
      <Route
        path="/checkout-experience/translations/:id"
        component={lazy(() => import('../../screens/TranslationScreen/TranslationEditScreen'))}
      />
      <Route
        path="/checkout-experience/fonts/:id"
        component={lazy(() => import('../../screens/FontScreen/FontEditScreen'))}
      />

      <Route
        path="/checkout-experience"
        component={lazy(() => import('../../screens/CheckoutExperienceScreen'))}
      />
      <Redirect to="/overview/products" />
    </Switch>
  );
};

export default SignedRoutes;
