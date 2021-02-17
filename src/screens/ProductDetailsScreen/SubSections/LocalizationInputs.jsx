import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Box } from '@material-ui/core';

import { InputCustom } from '../../../components/Inputs';

import localization from '../../../localization';

const LocalizationInputs = ({ data, handleChange }) => {
  const [value, setValue] = useState(0);

  return (
    <Box display='flex' width='100%' flexDirection='column'>
      <Box width='50%' px={4} mb={4}>
        {
          data?.marketingName ? (
            <div
              style={{
                width: '100%',
                height: '56px',
                border: '1px solid rgba(0, 0, 0, 0.23)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 15px',
              }}
              dangerouslySetInnerHTML={{ __html: data.marketingName }}
            />
          ) : (
            <InputCustom
              label='marketingName'
              value={data?.marketingName}
              onChangeInput={handleChange}
            />
          )
        }
      </Box>

      <Box width='100%' px={4} mb={4}>
        {
          data?.shortDesc ? (
            <div
              style={{
                width: '100%',
                height: '56px',
                border: '1px solid rgba(0, 0, 0, 0.23)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 15px',
              }}
              dangerouslySetInnerHTML={{ __html: data.shortDesc }}
            />
          ) : (
            <InputCustom
              label='shortDesc'
              value={data?.shortDesc}
              onChangeInput={handleChange}
            />
          )
        }
      </Box>

      <Box width='100%' px={4} mb={4}>
        {
          data?.longDesc ? (
            <div
              style={{
                width: '100%',
                height: '56px',
                border: '1px solid rgba(0, 0, 0, 0.23)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 15px',
              }}
              dangerouslySetInnerHTML={{ __html: data.longDesc }}
            />
          ) : (
            <InputCustom
              label='longDesc'
              value={data?.longDesc}
              onChangeInput={handleChange}
            />
          )
        }
      </Box>

      <Box width='100%' px={4} mb={4}>
        {
          data?.thankYouDesc ? (
            <div
              style={{
                width: '100%',
                height: '56px',
                border: '1px solid rgba(0, 0, 0, 0.23)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 15px',
              }}
              dangerouslySetInnerHTML={{ __html: data.thankYouDesc }}
            />
          ) : (
            <InputCustom
              label='thanksDesc'
              value={data?.thankYouDesc}
              onChangeInput={handleChange}
            />
          )
        }
      </Box>

      <Box width='100%' px={4} mb={4}>
        {
          data?.purchaseEmailDesc ? (
            <div
              style={{
                width: '100%',
                height: '56px',
                border: '1px solid rgba(0, 0, 0, 0.23)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 15px',
              }}
              dangerouslySetInnerHTML={{ __html: data.purchaseEmailDesc }}
            />
          ) : (
            <InputCustom
              label='purchaseDesc'
              value={data?.purchaseEmailDesc}
              onChangeInput={handleChange}
            />
          )
        }
      </Box>

      <Box width='100%' px={4} mb={4}>
        {
          data?.manualRenewalEmailDesc ? (
            <div
              style={{
                width: '100%',
                height: '56px',
                border: '1px solid rgba(0, 0, 0, 0.23)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 15px',
              }}
              dangerouslySetInnerHTML={{ __html: data.manualRenewalEmailDesc }}
            />
          ) : (
            <InputCustom
              label='manualRenDesc'
              value={data?.manualRenewalEmailDesc}
              onChangeInput={handleChange}
            />
          )
        }
      </Box>
    </Box>
  );
};

LocalizationInputs.propTypes = {
  data: PropTypes.object,
  handleChange: PropTypes.func,
};

export default LocalizationInputs;
