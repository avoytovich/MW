import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import moment from 'moment';

import {
  Box,
  Typography,
} from '@mui/material';

import { FileCopy } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import localization from '../../../localization';
import parentPaths from '../../../services/paths';
import { InputCustom, SelectWithDeleteIcon } from '../../../components/Inputs';

import api from '../../../api';

import '../emailBuilderDetailsScreen.scss';

const General = ({
  data,
  customer,
  updateData,
}) => {
  const [storeOptions, setStoreOptions] = useState([]);

  useEffect(() => {
    if (data.customerId) {
      api
        .getSellingStoreOptions(data.customerId)
        .then(({ data: { items } }) => {
          setStoreOptions([...items.map((st) => ({ id: st.id, value: st.name }))]);
        });
    }
  }, []);

  const makeCopy = (value) => {
    navigator.clipboard.writeText(value)
      .then(() => toast(localization.t('general.itemHasBeenCopied')));
  };

  return (
    <>
      <Box display="flex" py={2} pb={0} px={1}>
        <Box py={2} px={1}>
          <Box pb={1}>
            <Typography color='secondary'>{localization.t('labels.customer')}</Typography>
          </Box>
          <Box display='flex'>
            <Typography>{customer}</Typography>
            <Box px={1}><FileCopy color='secondary' onClick={() => makeCopy(data.customerId)} /></Box>
            <Link to={`${parentPaths.customers}/${data.customerId}`} className='link-to-customer'>
              <Typography>{data.customerId}</Typography>
            </Link>
          </Box>
        </Box>
      </Box>

      <Box display="flex" py={2}>
        <Box px={1} width="100%">
          <InputCustom
            label='name'
            isDisabled
            value={data?.name}
          />
        </Box>
        <Box px={1} width="100%">
          <SelectWithDeleteIcon
            label='store'
            value={data?.storeId || ''}
            selectOptions={storeOptions}
            onChangeSelect={(e) => {
              updateData({ ...data, storeId: e.target.value });
            }}
            onClickDelIcon={() => {
              const newData = { ...data };
              delete newData?.storeId;
              updateData({ ...newData });
            }}
          />
        </Box>
      </Box>

      <Box display="flex" py={2}>
        <Box px={1} width="100%">
          <InputCustom
            label='tags'
            helperText='Tags are space-separated'
            value={data?.tags?.length ? data.tags.join(' ') : ''}
            onChangeInput={(e) => {
              updateData({
                ...data,
                tags: e.target.value ? e.target.value.split(' ') : [],
              });
            }}
          />
        </Box>
      </Box>

      <Box display="flex" py={2} px={1}>
        <Box px={1} width="100%" alignSelf='center'>
          <Box>
            <Typography color="secondary">{localization.t('labels.version')}</Typography>
          </Box>
          <Box>
            <Typography data-test='updateDate'>{data?.version?.toString()}</Typography>
          </Box>
        </Box>

        <Box px={1} width="100%" alignSelf='center'>
          <Box>
            <Typography color="secondary">{localization.t('labels.lastUpdate')}</Typography>
          </Box>
          <Box>
            <Typography data-test='updateDate'>{moment(data?.updateDate).format('YYYY/MM/DD kk:mm (Z)')}</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

General.propTypes = {
  data: PropTypes.object,
  customer: PropTypes.string,
  updateData: PropTypes.func,
};

export default General;
