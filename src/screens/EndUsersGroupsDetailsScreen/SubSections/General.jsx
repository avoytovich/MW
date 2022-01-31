import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import {
  Box,
  Typography,
  TextField,
} from '@mui/material';

import FileCopy from '@mui/icons-material/FileCopyOutlined';

import { SelectCustom } from '../../../components/Inputs';
import { getLanguagesOptions } from '../../../components/utils/OptionsFetcher/OptionsFetcher';
import { getCustomerName } from '../../../services/helpers/customersHelper';

import localization from '../../../localization';

const General = ({ setData, data }) => {
  const [customerName, setCustomerName] = useState(null);

  useEffect(() => {
    if (data?.customerId) {
      getCustomerName(data?.customerId).then((name) => setCustomerName(name));
    }
  }, []);

  const availableLocales = getLanguagesOptions();

  const copyData = (text) => {
    navigator.clipboard.writeText(text).then(() => toast(localization.t('general.itemHasBeenCopied')));
  };

  return (
    <>
      <Box display="flex" pb={2}>
        <Box px={1} width="50%">
          <TextField
            fullWidth
            label="Name"
            name="name"
            type="text"
            required
            value={data?.name || ''}
            onChange={(e) => setData((c) => ({ ...c, name: e.target.value }))}
            variant="outlined"
          />
        </Box>

        <Box px={1} width="50%">
          <SelectCustom
            label='fallbackLocale'
            onChangeSelect={(e) => {
              if (!data.localizedContent[e.target.value]) {
                setData((c) => ({ ...c, localizedContent: { ...c.localizedContent, [e.target.value]: { localizedShortDesc: '', localizedLongDesc: '' } } }));
              }
              setData((c) => ({ ...c, fallbackLocale: e.target.value }));
            }}
            selectOptions={availableLocales}
            value={data?.fallbackLocale || ''}
          />
        </Box>
      </Box>

      {
        data.customerId && (
          <Box px={1} display='flex' justifyContent='space-between' width='50%' my='15px'>
            <Typography variant='h5'>{localization.t('labels.customer')}</Typography>

            <Box display='flex'>
              <Typography>{customerName}</Typography>
              <FileCopy
                color='secondary'
                style={{ cursor: 'pointer', marginLeft: '10px' }}
                onClick={(e) => { e.stopPropagation(); copyData(data.customerId); }}
              />
            </Box>
          </Box>
        )
      }

      {
        data.id && (
          <Box px={1} display='flex' justifyContent='space-between' width='50%' my='15px'>
            <Typography variant='h5'>{localization.t('labels.endUserGroupId')}</Typography>

            <Box display='flex'>
              <Typography>{data.id}</Typography>
              <FileCopy
                color='secondary'
                style={{ cursor: 'pointer', marginLeft: '10px' }}
                onClick={(e) => { e.stopPropagation(); copyData(data.id); }}
              />
            </Box>
          </Box>
        )
      }
    </>
  );
};

General.propTypes = {
  setData: PropTypes.func,
  data: PropTypes.object,
};

export default General;
