// ToDo: consider making a common layout for such type of settings screens
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
  LinearProgress,
  Zoom,
  Button,
  Box,
  Typography,
  Tabs,
  Tab,
} from '@material-ui/core';
import { fromArrayToObject, tabsLabels } from './utils';

import SelectCustomerNotification from '../../components/utils/SelectCustomerNotification';
import CustomBreadcrumbs from '../../components/utils/CustomBreadcrumbs';
import General from './SubSections/General';
import Eligibility from './SubSections/Eligibility';
import CappingAndLimits from './SubSections/CappingAndLimits';
import api from '../../api';
import DiscountSection from './DiscountSection';
import { showNotification } from '../../redux/actions/HttpNotifications';
import localization from '../../localization';
import useDiscountDetails from '../../services/useData/useDiscountDetails';
import './discountDetailsScreen.scss';

const DiscountDetailsScreen = () => {
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);
  const history = useHistory();
  const [curTab, setCurTab] = useState(0);
  const dispatch = useDispatch();
  const { id } = useParams();

  const discountData = useDiscountDetails(id, nxState);

  const {
    discount,
    curDiscount,
    hasChanges,
    amountType,
    setCurDiscount,
    setAmountType,
    selectOptions,
  } = discountData;

  const saveDiscount = () => {
    const res = { ...curDiscount };
    res.thresholds = fromArrayToObject(curDiscount.thresholds, 'key');
    res.localizedLabels = fromArrayToObject(curDiscount.localizedLabels, 'key');
    if (amountType === 'byCurrency') {
      res.amountByCurrency = fromArrayToObject(curDiscount.amountByCurrency, 'key');
      delete res.discountRate;
    } else {
      res.discountRate = curDiscount.discountRate / 100;
      delete res.amountByCurrency;
    }
    if (curDiscount.model === 'COUPON') {
      res.codes = fromArrayToObject(curDiscount.codes);
    } else {
      delete res.codes;
    }
    if (id === 'add') {
      api.addNewDiscount(res).then(() => {
        dispatch(
          showNotification(localization.t('general.updatesHaveBeenSaved')),
        );
        history.push('/marketing/discounts');
      });
    } else {
      api.updateDiscountById(id, res).then(() => {
        dispatch(
          showNotification(localization.t('general.updatesHaveBeenSaved')),
        );
        window.location.reload();
      });
    }
  };

  const updateDiscount = (type, value, selections) => {
    let setValue = value;
    if (!curDiscount[type]) {
      setValue = [value];
    } else if (selections === 'multiple' || selections === 'empty') {
      const curValInd = curDiscount[type].indexOf(value);
      if (curValInd >= 0) {
        if (curDiscount[type].length === 1) {
          if (selections === 'multiple') return;
          setValue = [];
        } else {
          const newArr = [...curDiscount[type]];
          newArr.splice(curValInd, 1);
          setValue = newArr;
        }
      } else {
        setValue = [...curDiscount[type], value];
      }
    }
    setCurDiscount((c) => ({ ...c, [type]: setValue }));
  };
  if (id === 'add' && !nxState.selectedCustomer.id) return <SelectCustomerNotification />;

  if (curDiscount === null) return <LinearProgress />;

  return (
    <>
      {id !== 'add' && (
        <Box mx={2}>
          <CustomBreadcrumbs
            url='/marketing/discounts'
            section={localization.t('general.discount')}
            id={discount.id}
          />
        </Box>
      )}
      <Box
        display='flex'
        flexDirection='row'
        m={2}
        justifyContent='space-between'
      >
        <Box alignSelf='center'>
          <Typography data-test='discountName' gutterBottom variant='h3'>
            {id !== 'add'
              ? discount.name
              : `${localization.t('general.new')} ${localization.t(
                'general.discount',
              )}`}
          </Typography>
        </Box>
        <Zoom in={hasChanges}>
          <Box mb={1} mr={1}>
            <Button
              disabled={!curDiscount.name}
              id='save-discount-button'
              color='primary'
              size='large'
              type='submit'
              variant='contained'
              onClick={saveDiscount}
            >
              {localization.t('general.save')}
            </Button>
          </Box>
        </Zoom>
      </Box>
      <Box my={2} bgcolor='#fff'>
        <Tabs
          value={curTab}
          indicatorColor='primary'
          textColor='primary'
          onChange={(event, newValue) => {
            setCurTab(newValue);
          }}
        >
          <Tab label={localization.t(`labels.${tabsLabels[0]}`)} />
          <Tab label={localization.t(`labels.${tabsLabels[1]}`)} />
          <Tab label={localization.t(`labels.${tabsLabels[2]}`)} />
        </Tabs>
      </Box>
      {curTab === 0 && (
        <DiscountSection label='general'>
          <General
            amountType={amountType}
            setAmountType={setAmountType}
            curDiscount={curDiscount}
            setCurDiscount={setCurDiscount}
            selectOptions={selectOptions}
          />
        </DiscountSection>
      )}
      {curTab === 1 && (
        <DiscountSection label='cappingAndLimits'>
          <CappingAndLimits
            curDiscount={curDiscount}
            setCurDiscount={setCurDiscount}
          />
        </DiscountSection>
      )}
      {curTab === 2 && (
        <DiscountSection label='eligibility'>
          <Eligibility
            selectOptions={selectOptions}
            curDiscount={curDiscount}
            updateDiscount={updateDiscount}
            setCurDiscount={setCurDiscount}
          />
        </DiscountSection>
      )}
    </>
  );
};

export default DiscountDetailsScreen;
