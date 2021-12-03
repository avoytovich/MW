import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import 'moment-timezone';

import {
  Box,
  Typography,
  Grid,
  Button,
  Menu,
  MenuItem,
  Tabs,
  Tab,
} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import { toast } from 'react-toastify';

import localization from '../../localization';
import parentPaths from '../../services/paths';
import api from '../../api';
import {
  generateData as generateDataCart,
  defaultShow as defaultShowCart,
} from '../../services/useData/tableMarkups/cartDetails';
import {
  generateData as generateDataEmails,
  defaultShow as defaultShowEmails,
} from '../../services/useData/tableMarkups/emailDetails';
import { tabLabelsView, structureGeneral, structureEndUser } from './utils';
import CustomCard from '../../components/utils/CustomCard';
import OrderDetailsTableComponent from '../../components/TableComponent/OrderDetailsTableComponent';

import './cartDetailsScreeen.scss';

const CartDetailsScreenView = ({ detailsData, customer }) => {
  const { id } = useParams();
  const history = useHistory();

  const [curTab, setCurTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [products, setProducts] = useState(null);
  const [emails, setEmails] = useState(null);

  const handleClose = () => setAnchorEl(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const makeCopy = (value) => {
    navigator.clipboard.writeText(value)
      .then(() => toast(localization.t('general.itemHasBeenCopied')));
  };

  const renderDefault = (each) => (
    <>
      <Grid item md={3} xs={12}>
        <Typography variant='h6'>
          {localization.t(`labels.${each.label}`)}
        </Typography>
      </Grid>
      <Grid item md={9} xs={12}>
        <Box>
          <Typography variant='subtitle1'>
            {each.field}
          </Typography>
        </Box>
      </Grid>
    </>
  );

  const renderCartId = (each) => (
    <>
      <Grid item md={3} xs={12}>
        <Typography variant='h6'>
          {localization.t(`labels.${each.label}`)}
        </Typography>
      </Grid>
      <Grid item md={9} xs={12}>
        <Box className='cart'>
          <Typography variant='subtitle1' className='cart-value'>
            {each.field}
          </Typography>
          <FileCopyIcon
            onClick={() => makeCopy(detailsData?.id)}
            style={{ marginLeft: '5px' }}
            color="secondary"
          />
        </Box>
      </Grid>
    </>
  );

  const renderCheckoutUrl = (each) => (
    <>
      <Grid item md={3} xs={12}>
        <Typography variant='h6'>
          {localization.t(`labels.${each.label}`)}
        </Typography>
      </Grid>
      <Grid item md={9} xs={12}>
        <Box className='checkout-url'>
          <Typography variant='subtitle1' className='checkout-url-value'>
            {each.field}
          </Typography>
          <FileCopyIcon
            onClick={() => makeCopy(detailsData?.checkoutUrl)}
            style={{ marginLeft: '5px' }}
            color="secondary"
          />
        </Box>
      </Grid>
    </>
  );

  const renderCustomer = (each) => (
    <>
      <Grid item md={3} xs={12}>
        <Typography variant='h6'>
          {localization.t(`labels.${each.label}`)}
        </Typography>
      </Grid>
      <Grid item md={9} xs={12}>
        <Box className='customer'>
          <Typography variant='subtitle1' className='customer-value-name'>
            {`${each.field}, `}
          </Typography>
          <span
            className="customer-value-id"
            onClick={() => history.push(`${parentPaths.customers}/${customer.id}`)} // ToDo: should be replaced with new customer route
          >
            {customer.id}
          </span>
          <FileCopyIcon
            onClick={() => makeCopy(customer.id)}
            style={{ marginLeft: '5px' }}
            color="secondary"
          />
        </Box>
      </Grid>
    </>
  );

  const renderStore = (each) => (
    <>
      <Grid item md={3} xs={12}>
        <Typography variant='h6'>
          {localization.t(`labels.${each.label}`)}
        </Typography>
      </Grid>
      <Grid item md={9} xs={12}>
        <Box className='store'>
          <Typography variant='subtitle1' className='store-value-name'>
            {`${each.field} store, (`}
          </Typography>
          <span
            className="store-value-id"
            onClick={() => history.push(`${parentPaths.stores}/${detailsData?.storeId}`)} // ToDo: should be replaced with new customer route
          >
            {detailsData?.storeId}
          </span>
          <FileCopyIcon
            onClick={() => makeCopy(detailsData?.storeId)}
            style={{ marginLeft: '5px' }}
            color="secondary"
          />
          <Typography variant='subtitle1' className='store-value-name'>
            , Allows quotes: NO)
          </Typography>
        </Box>
      </Grid>
    </>
  );

  const renderGeneralFields = (each) => {
    switch (each.label) {
      case 'cartId':
        return renderCartId(each);
      case 'checkoutUrl':
        return renderCheckoutUrl(each);
      case 'customer':
        return renderCustomer(each);
      case 'store':
        return renderStore(each);
      default:
        return renderDefault(each);
    }
  };

  const renderGeneral = () => (
    structureGeneral(detailsData, customer).map((each) => (
      <Grid container spacing={2} key={each.label}>
        {renderGeneralFields(each)}
      </Grid>
    ))
  );

  const renderEndUser = () => (
    structureEndUser(detailsData).map((each) => (
      <Grid container spacing={2} key={each.label}>
        {renderGeneralFields(each)}
      </Grid>
    ))
  );

  const renderProducts = () => products && (
    <Box
      height={1}
      width={1}
    >
      <CustomCard title="Products" noDivider>
        <Box
          border={1}
          borderRadius="borderRadius"
          borderColor="#c7c7c7"
        >
          <OrderDetailsTableComponent
            showColumn={defaultShowCart}
            tableData={products}
            isLoading={products === null}
            customPath='disabled'
            errorHighlight='processingError'
            noActions
          />
        </Box>
      </CustomCard>
    </Box>
  );

  const renderEmails = () => emails && (
    <Box
      height={1}
      width={1}
    >
      <CustomCard title="Emails" noDivider>
        <Box
          border={emails.values.length ? 1 : 0}
          borderRadius="borderRadius"
          borderColor="#c7c7c7"
        >
          <OrderDetailsTableComponent
            showColumn={defaultShowEmails}
            tableData={emails}
            isLoading={emails === null}
            customPath='disabled'
            errorHighlight='processingError'
            noActions
          />
        </Box>
      </CustomCard>
    </Box>
  );

  const renderContent = () => {
    switch (curTab) {
      case 0:
        return renderGeneral();
      case 1:
        return renderEndUser();
      case 2:
        return renderProducts();
      case 3:
        return renderEmails();
      default:
        return renderGeneral();
    }
  };

  const sendByEmail = () => api.sendByEmailByCartId(id)
    .then((data) => {
      if ([200, 201].includes(data.status)) return toast(localization.t('general.sendByEmailByCartIdSuccessed'));
      return toast.error(localization.t('general.sendByEmailByCartIdFailure'));
    })
    .catch((err) => toast.error(localization.t('general.sendByEmailByCartIdFailure')));

  useEffect(() => {
    const productsTableData = generateDataCart(detailsData?.products || []);
    setProducts(productsTableData || []);

    return () => setProducts(null);
  });

  useEffect(() => {
    const emailsTableData = generateDataEmails(detailsData?.sentEmails || []);
    setEmails(emailsTableData || []);

    return () => setEmails(null);
  });

  return (
    <>
      <Box position='sticky' top='90px' bgcolor='#f9f9f9' zIndex='2'>
        <Box display='flex' flexDirection='row' justifyContent='flex-end'>
          <Box display='flex' alignItems='flex-end'>
            <Button
              aria-haspopup='true'
              variant='contained'
              color='primary'
              aria-controls='checkoutMenu'
              onClick={handleClick}
              size='large'
            >
              {localization.t('forms.buttons.actions')}
            </Button>
            <Menu
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={sendByEmail}>
                <Button color="inherit" fullWidth>{localization.t('forms.buttons.sendByEmail')}</Button>
              </MenuItem>
              <MenuItem onClick={() => {}}>
                <Button color="inherit" fullWidth disabled>{localization.t('forms.buttons.generateQuote')}</Button>
              </MenuItem>
              <MenuItem onClick={() => {}}>
                <Button
                  color="inherit"
                  target='_blank'
                  href={`https://dev-kasperskyfrance-default.staging.nexway.build/checkout/add?cartid=${id}&layout=default&layoutname=default`}
                  fullWidth
                >
                  {localization.t('forms.buttons.checkout')}
                </Button>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        <Box my={2} bgcolor='#fff'>
          <Tabs
            value={curTab}
            indicatorColor='primary'
            textColor='primary'
            onChange={(event, newValue) => {
              setCurTab(newValue);
            }}
            aria-label='disabled tabs example'
            >
            {tabLabelsView.map((tab) => (
              <Tab key={tab} label={localization.t(`labels.${tab}`)} />
              ))}
          </Tabs>
        </Box>
      </Box>
      {
        detailsData && customer && (
          <Grid container spacing={2} className="wrapper-cart-details">
            {renderContent()}
          </Grid>
        )
      }
    </>
  );
};

CartDetailsScreenView.propTypes = {
  detailsData: PropTypes.object,
  customer: PropTypes.string,
};

export default CartDetailsScreenView;
