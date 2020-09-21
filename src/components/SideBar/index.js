import React, { useEffect } from 'react';
import { useLocation, matchPath } from 'react-router';
// import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';

import {
  Box,
  Drawer,
  Hidden,
  List,
  ListSubheader,
} from '@material-ui/core';
import localization from '../../localization';

import NavItem from './NavItem';

const navConfig = [
  {
    subheader: localization.t('sideBar.subheaders.overview'),
    items: [
      {
        title: localization.t('sideBar.titles.products'),
        // icon: UsersIcon,
        href: '/overview/products',
      },
      {
        title: localization.t('sideBar.titles.stores'),
        // icon: ShoppingCartIcon,
        href: '/overview/stores',
      },
      {
        title: localization.t('sideBar.titles.orders'),
        // icon: FolderIcon,
        href: '/overview/orders',
      },
      {
        title: localization.t('sideBar.titles.invoicesCreditNotes'),
        // icon: FolderIcon,
        href: '/overview/invoices-credit-notes',
      },
      {
        title: localization.t('sideBar.titles.subscriptions'),
        // icon: FolderIcon,
        href: '/overview/subscriptions',
      },
    ],
  },
  {
    subheader: localization.t('sideBar.subheaders.toBeDefined'),
    items: [
      {
        title: localization.t('sideBar.titles.salesCustomers'),
        href: '/tobedefined/sales-customers',
        // icon: BriefcaseIcon,
      },
      {
        title: localization.t('sideBar.titles.marketing'),
        href: '/tobedefined/marketing',
        // icon: ShareIcon,
      },
      {
        title: localization.t('sideBar.titles.checkoutExperience'),
        href: '/tobedefined/checkout-experience',
        // icon: TrelloIcon
      },
      {
        title: localization.t('sideBar.titles.reports'),
        href: '/tobedefined/reports',
        // icon: MailIcon,
      },
      {
        title: localization.t('sideBar.titles.myAccount'),
        href: '/tobedefined/myaccount',
        // icon: MessageCircleIcon,
      },
    ],
  },
  {
    subheader: localization.t('sideBar.subheaders.settings'),
    items: [
      {
        title: localization.t('sideBar.titles.api'),
        href: '/settings/api',
        // icon: LockIcon
      },
      {
        title: localization.t('sideBar.titles.servicesConfiguration'),
        href: '/settings/services-configuration',
        // icon: UserPlusIcon
      },
      {
        title: localization.t('sideBar.titles.administration'),
        href: '/settings/administration',
        // icon: ShieldIcon
      },
      {
        title: localization.t('sideBar.titles.identities'),
        href: '/settings/identities',
        // icon: ShieldIcon
      },
    ],
  },
];

function renderNavItems({ items, ...rest }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, ...rest }),
        [],
      )}
    </List>
  );
}

function reduceChildRoutes({
  acc,
  pathname,
  item,
  depth = 0,
}) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false,
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        key={key}
        info={item.info}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
        })}
      </NavItem>,
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        key={key}
        info={item.info}
        title={item.title}
      />,
    );
  }

  return acc;
}

function NavBar({ openMobile, onMobileClose }) {
  const location = useLocation();
  const { user } = useSelector((state) => state.account);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Box p={2}>
          {navConfig.map((config) => (
            <List
              key={config.subheader}
              subheader={(
                <ListSubheader
                  disableGutters
                  disableSticky
                  color="inherit"
                >
                  {config.subheader}
                </ListSubheader>
              )}
            >
              {renderNavItems({ items: config.items, pathname: location.pathname })}
            </List>
          ))}
        </Box>
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
}

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
