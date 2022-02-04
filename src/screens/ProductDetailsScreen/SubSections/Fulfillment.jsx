import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Typography,
} from '@mui/material';

import InheritanceField from '../InheritanceField';

import { InputCustom, SelectWithDeleteIcon } from '../../../components/Inputs';
import { checkValue } from '../../../services/helpers/dataStructuring';
import localization from '../../../localization';

import './FulfillmentAndSubscription.scss';

const Fulfillment = ({
  setProductData,
  currentProductData,
  selectOptions,
  parentId,
}) => (
  <>
    <Box display="flex" flexDirection="row" alignItems="baseline">
      <Box p={2} width="50%">
        <InheritanceField
          field='fulfillmentTemplate'
          onChange={setProductData}
          value={currentProductData?.fulfillmentTemplate}
          parentId={parentId}
          currentProductData={currentProductData}
        >
          <SelectWithDeleteIcon
            label="fulfillmentTemplate"
            value={checkValue(currentProductData.fulfillmentTemplate)}
            selectOptions={selectOptions.fulfillmentTemplates}
            onChangeSelect={(e) => {
              setProductData({ ...currentProductData, fulfillmentTemplate: e.target.value });
            }}
            onClickDelIcon={() => setProductData({
              ...currentProductData,
              fulfillmentTemplate: '',
              releaseDate: '',
            })}
          />
        </InheritanceField>
      </Box>
    </Box>

    <Box width="50%" display="flex" flexDirection="row" alignItems="center" height='56px'>
      <Box p={2}>
        <Typography color="secondary">{localization.t('labels.licenseKeyPackages')}</Typography>
      </Box>

      <Box p={2}><Typography>{localization.t('general.noPackagesFound')}</Typography></Box>
    </Box>

    <Box p={2} width="50%">
      <InheritanceField
        field='externalContext'
        onChange={setProductData}
        value={currentProductData?.externalContext}
        parentId={parentId}
        currentProductData={currentProductData}
      >
        <InputCustom
          isMultiline
          tooltip={localization.t('tooltips.externalContext')}
          label='externalContext'
          value={checkValue(currentProductData?.externalContext)}
          onChangeInput={(e) => setProductData({
            ...currentProductData,
            externalContext: e.target.value,
          })}
        />
      </InheritanceField>
    </Box>
  </>
);

Fulfillment.propTypes = {
  setProductData: PropTypes.func,
  currentProductData: PropTypes.object,
  selectOptions: PropTypes.object,
  parentId: PropTypes.string,
};

export default Fulfillment;
