// ToDo[major]: add exact routes for not staging env
import React, { lazy, useEffect } from 'react';
import { Switch, Redirect, Route, useHistory } from 'react-router-dom';
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
        path="/"
        exact
        component={lazy(() => import('../../screens/DashboardScreen'))}
      />
      <Route
        path="/overview/products/:id"
        component={lazy(() => import('../../screens/ProductDetailsScreen/EditProduct'))}
      />
      <Route
        path='/overview/products'
        component={lazy(() => import('../../screens/ProductsScreen'))}
      />
      <Route
        path='/overview/stores/:id'
        component={lazy(() => import('../../screens/StoreDetailsScreen'))}
      />
      <Route
        path='/overview/stores'
        component={lazy(() => import('../../screens/StoresScreen'))}
      />
      <Route
        path='/overview/orders/:id'
        component={lazy(() => import('../../screens/OrderDetailsScreen'))}
      />
      <Route
        path='/overview/orders'
        component={lazy(() => import('../../screens/OrdersScreen'))}
      />
      <Route
        path='/my-account'
        component={lazy(() => import('../../screens/MyAccountScreen'))}
      />
      <Route
        path='/settings/identities/:id'
        component={lazy(() => import('../../screens/IdentityDetailsScreen'))}
      />
      <Route
        path='/settings/identities'
        component={lazy(() => import('../../screens/IdentitiesScreen'))}
      />
      <Route
        path='/settings/administration/customers/:id'
        component={lazy(() =>
          import(
            '../../screens/AdministrationDetailsScreens/CustomerDetailScreen'
          ),
        )}
      />
      <Route
        path='/settings/administration/metaRoles/:id'
        component={lazy(() =>
          import(
            '../../screens/AdministrationDetailsScreens/MetaRoleDetailScreen'
          ),
        )}
      />
      <Route
        path='/settings/administration/roles/:id'
        component={lazy(() =>
          import('../../screens/AdministrationDetailsScreens/RoleDetailScreen'),
        )}
      />
      <Route
        path='/settings/administration/privileges/:id'
        component={() => <>privilege</>}
      />
      <Route
        path='/settings/administration'
        component={lazy(() => import('../../screens/AdministrationScreen'))}
      />
      <Route
        path='/marketing/discounts/:id'
        component={lazy(() => import('../../screens/DiscountDetailsScreen'))}
      />
      <Route
        path='/marketing/recommendations/:id'
        component={lazy(() => import('../../screens/RecoDetailsScreen'))}
      />
      <Route
        path='/marketing/campaigns/:id'
        component={lazy(() => import('../../screens/CampaignDetailsScreen'))}
      />
      <Route
        path='/marketing/prices/:id'
        component={lazy(() => import('../../screens/PricesDetailsScreen'))}
      />
      <Route
        path='/marketing'
        component={lazy(() => import('../../screens/MarketingScreen'))}
      />
      <Route
        path='/checkout-experience/fonts/add'
        component={lazy(() => import('../../screens/FontScreen/FontAddScreen'))}
      />
      <Route
        path='/checkout-experience/themes/add'
        component={lazy(() =>
          import('../../screens/ThemeScreen/ThemeAddScreen'),
        )}
      />
      <Route
        path='/checkout-experience/layouts/add'
        component={lazy(() =>
          import('../../screens/LayoutScreen/LayoutAddScreen'),
        )}
      />
      <Route
        path='/checkout-experience/translations/add'
        component={lazy(() =>
          import('../../screens/TranslationScreen/TranslationAddScreen'),
        )}
      />
      <Route
        path='/checkout-experience/themes/:id'
        component={lazy(() =>
          import('../../screens/ThemeScreen/ThemeEditScreen'),
        )}
      />
      <Route
        path='/checkout-experience/layouts/:id'
        component={lazy(() =>
          import('../../screens/LayoutScreen/LayoutEditScreen'),
        )}
      />
      <Route
        path='/checkout-experience/translations/:id'
        component={lazy(() =>
          import('../../screens/TranslationScreen/TranslationEditScreen'),
        )}
      />
      <Route
        path='/checkout-experience/fonts/:id'
        component={lazy(() =>
          import('../../screens/FontScreen/FontEditScreen'),
        )}
      />
      <Route
        path='/checkout-experience'
        component={lazy(() => import('../../screens/CheckoutExperienceScreen'))}
      />
      <Route
        path='/products/add'
        component={lazy(() =>
          import('../../screens/ProductDetailsScreen/CreateProduct'),
        )}
      />

      <Redirect to='/' />
    </Switch>
  );
};

export default SignedRoutes;
