import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import FileCopyIcon from '@mui/icons-material/FileCopy';

import {
  Box, Grid, Typography,
} from '@mui/material';
import localization from '../../localization';
import SectionLayout from '../../components/SectionLayout';
import { InputCustom } from '../../components/Inputs';
import { copyText } from '../../services/helpers/utils';

const CurrencyDetailScreenView = ({
  curCurrency,
  setCurCurrency,
}) => (
  <SectionLayout label='general'>
    <Grid container>
      {curCurrency?.id && (
        <>
          <Grid item md={6} sm={6}>
            <Box display="flex" p={2} flexDirection="row" alignItems="baseline">
              <Box width='30%'>
                <Typography variant='h5'>{localization.t('labels.id')}</Typography>
              </Box>
              <Box>
                <Typography>{curCurrency.id}</Typography>
              </Box>
              <Box px={2} alignSelf='center'>
                <FileCopyIcon color='secondary' style={{ marginLeft: '5px', cursor: 'pointer' }} onClick={() => copyText(curCurrency.id)} />
              </Box>
            </Box>
          </Grid>
          <Grid item md={6} sm={6}>
            <Box display="flex" p={2} flexDirection="row" alignItems="baseline">
              <Box width='30%'>
                <Typography variant='h5'>{localization.t('labels.creationDate')}</Typography>
              </Box>
              <Box>
                <Typography>{moment(curCurrency.createDate).format('D MMM YYYY')}</Typography>
              </Box>
            </Box>

          </Grid>
        </>
      )}
      <Grid item md={6} sm={6}>
        <Box p={2}>
          <InputCustom
            isRequired
            data-test='code'
            label='code'
            value={curCurrency.code}
            onChangeInput={(e) => {
              setCurCurrency({
                ...curCurrency,
                code: e.target.value,
              });
            }}
          />
        </Box>
      </Grid>
      <Grid item md={6} sm={6}>
        <Box p={2}>
          <InputCustom
            isRequired
            data-test='name'
            label='name'
            value={curCurrency.name}
            onChangeInput={(e) => {
              setCurCurrency({
                ...curCurrency,
                name: e.target.value,
              });
            }}
          />
        </Box>
      </Grid>
      {curCurrency?.id && (
        <>
          <Grid item md={6} sm={6} alignSelf='center'>
            <Box display="flex" p={2} flexDirection="row" alignItems="baseline">
              <Box width='30%'>
                <Typography variant='h5'>{localization.t('labels.updateDate')}</Typography>
              </Box>
              <Box>
                <Typography>{moment(curCurrency.updateDate).format('D MMM YYYY')}</Typography>
              </Box>
            </Box>

          </Grid>
          <Grid item md={6} sm={6}>
            <Box p={2}>
              <InputCustom
                data-test='lastUpdateReason'
                label='lastUpdateReason'
                value={curCurrency.lastUpdateReason}
                onChangeInput={(e) => {
                  setCurCurrency({
                    ...curCurrency,
                    lastUpdateReason: e.target.value,
                  });
                }}
              />
            </Box>

          </Grid>
        </>
      )}
    </Grid>
  </SectionLayout>
);

CurrencyDetailScreenView.propTypes = {
  curCurrency: PropTypes.object,
  setCurCurrency: PropTypes.func,
};

export default CurrencyDetailScreenView;
