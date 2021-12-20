/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import {
  Box,
} from '@mui/material';
import General from './SubSections/General';
import Parameters from './SubSections/Parameters';
import parentPaths from '../../services/paths';
import localization from '../../localization';

import SectionLayout from '../../components/SectionLayout';
import './priceFunctionDetail.scss';

const PriceFunctionView = ({
  curPriceFunction,
  setCurPriceFunction,
  setCurParameters,
  curParameters,
  errorMessages,
  setErrorMessages,
  priceFunction,
  curTab,
}) => {
  const history = useHistory();

  const handleClick = () => {
    localStorage.setItem('filters', JSON.stringify({ productlist: { priceFunction: curPriceFunction.id } }));
    history.push(parentPaths.productlist);
  };
  return (
    <>
      {
        curTab === 0 && (
          <SectionLayout label='general'>
            <General
              curPriceFunction={curPriceFunction}
              setCurPriceFunction={setCurPriceFunction}
            />
            {priceFunction.id && (
              <Box px={2} py={4}>
                <Box>
                  {localization.t('general.productsWith')}
                  {' '}
                  <span
                    onClick={handleClick}
                    className='clickableText'
                  >
                    {priceFunction.name}

                  </span>
                  {' '}
                  {localization.t('general.priceFunction')}
                </Box>
              </Box>
            )}
          </SectionLayout>
        )
      }
      {
        curTab === 1 && (
          <SectionLayout label='parameters'>
            <Parameters
              errorMessages={errorMessages}
              setErrorMessages={setErrorMessages}
              setCurParameters={setCurParameters}
              curParameters={curParameters}
            />
          </SectionLayout>
        )
      }
    </>
  );
};

PriceFunctionView.propTypes = {
  setCurPriceFunction: PropTypes.func,
  curPriceFunction: PropTypes.object,
  setCurParameters: PropTypes.func,
  curParameters: PropTypes.object,
  errorMessages: PropTypes.object,
  setErrorMessages: PropTypes.func,
  priceFunction: PropTypes.object,
  curTab: PropTypes.bool,
};

export default PriceFunctionView;
