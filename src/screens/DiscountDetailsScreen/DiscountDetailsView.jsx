// ToDo: consider making a common layout for such type of settings screens
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Tabs,
  Tab,
} from '@material-ui/core';
import { tabsLabels } from './utils';

import General from './SubSections/General';
import Eligibility from './SubSections/Eligibility';
import CappingAndLimits from './SubSections/CappingAndLimits';
import CodeGeneration from './SubSections/CodeGeneration';
import DiscountSection from './DiscountSection';
import localization from '../../localization';
import './discountDetailsScreen.scss';

const DiscountDetailsView = ({
  curDiscount, setCurDiscount, discount, setAmountType, amountType, selectOptions,
}) => {
  const [curTab, setCurTab] = useState(0);
  const [checkedSingleUseCode, setCheckedSingleUseCode] = useState(false);
  const [prevSaveSingleUseCode, setPrevSaveSingleUseCode] = useState(false);
  const [usedDiscounts, setUsedDiscounts] = useState(0);

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

  return (
    <>
      <Box my={2} bgcolor='#fff'>
        <Tabs
          data-test='tabs'
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
          {checkedSingleUseCode && <Tab label={localization.t(`labels.${tabsLabels[3]}`)} />}
        </Tabs>
      </Box>
      {curTab === 0 && (
        <DiscountSection label='general'>
          <General
            id={discount.id}
            amountType={amountType}
            setAmountType={setAmountType}
            curDiscount={curDiscount}
            setCurDiscount={setCurDiscount}
            selectOptions={selectOptions}
            setCheckedSingleUseCode={setCheckedSingleUseCode}
            setPrevSaveSingleUseCode={setPrevSaveSingleUseCode}
            setUsedDiscounts={setUsedDiscounts}
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
      {curTab === 3 && (
        <DiscountSection label='singleUseCodesGenerations'>
          <CodeGeneration
            discount={discount}
            usedDiscounts={usedDiscounts}
            prevSaveSingleUseCode={prevSaveSingleUseCode}
          />
        </DiscountSection>
      )}
    </>
  );
};
DiscountDetailsView.propTypes = {
  setCurDiscount: PropTypes.func,
  curDiscount: PropTypes.object,
  selectOptions: PropTypes.object,
  discount: PropTypes.object,
  setAmountType: PropTypes.func,
  amountType: PropTypes.string,
};

export default DiscountDetailsView;
