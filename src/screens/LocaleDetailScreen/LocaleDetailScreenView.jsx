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

const LocaleDetailScreenView = ({
  curLocale,
  setCurLocale,
}) => (
  <SectionLayout label='general'>
    <Grid container alignItems='center'>
      {curLocale?.id && (
        <>
          <Grid item md={6}>
            <Box display="flex" p={2} flexDirection="row" alignItems="baseline">
              <Box width='30%'>
                <Typography variant='h5'>{localization.t('labels.id')}</Typography>
              </Box>
              <Box>
                <Typography>{curLocale.id}</Typography>
              </Box>
              <Box px={2} alignSelf='center'>
                <FileCopyIcon color='secondary' style={{ marginLeft: '5px', cursor: 'pointer' }} onClick={() => copyText(curLocale.id)} />
              </Box>
            </Box>
          </Grid>
          <Grid item md={6}>
            <Box display="flex" p={2} flexDirection="row" alignItems="baseline">
              <Box width='30%'>
                <Typography variant='h5'>{localization.t('labels.creationDate')}</Typography>
              </Box>
              <Box>
                <Typography>{moment(curLocale.createDate).format('D MMM YYYY')}</Typography>
              </Box>
            </Box>

          </Grid>
        </>
      )}
      <Grid item md={6}>
        <Box p={2}>
          <InputCustom
            isRequired
            data-test='code'
            label='code'
            value={curLocale.code}
            onChangeInput={(e) => {
              setCurLocale({
                ...curLocale,
                code: e.target.value,
              });
            }}
          />
        </Box>
      </Grid>
      <Grid item md={6}>
        <Box p={2}>
          <InputCustom
            isRequired
            data-test='label'
            label='label'
            value={curLocale.label}
            onChangeInput={(e) => {
              setCurLocale({
                ...curLocale,
                label: e.target.value,
              });
            }}
          />
        </Box>
      </Grid>
      {curLocale?.id && (
        <>
          <Grid item md={6}>
            <Box display="flex" p={2} flexDirection="row" alignItems="baseline">
              <Box width='30%'>
                <Typography variant='h5'>{localization.t('labels.updateDate')}</Typography>
              </Box>
              <Box>
                <Typography>{moment(curLocale.updateDate).format('D MMM YYYY')}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item md={6}>
            <Box p={2}>
              <InputCustom
                data-test='lastUpdateReason'
                label='lastUpdateReason'
                value={curLocale.lastUpdateReason}
                onChangeInput={(e) => {
                  setCurLocale({
                    ...curLocale,
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

LocaleDetailScreenView.propTypes = {
  curLocale: PropTypes.object,
  setCurLocale: PropTypes.func,
};

export default LocaleDetailScreenView;
