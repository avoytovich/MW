import React from 'react';
import moment from 'moment';
import {
  LinearProgress, Grid, Typography, Box,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { InputCustom } from '../../../../components/Inputs';
import localization from '../../../../localization';

const General = ({ curMetaRole, setCurMetaRole }) => (
  curMetaRole === null
    ? <LinearProgress />
    : (
      <>
        <Grid container>
          <Grid item md={4} sm={12}>
            <Box pt={4} pl={2}>
              <Typography color="secondary">{localization.t('labels.createDate')}</Typography>
            </Box>
            <Box p={2}>
              <Typography>{moment(curMetaRole.createDate).format('YYYY/MM/DD kk:mm (Z)')}</Typography>
            </Box>
          </Grid>
          <Grid item md={4} sm={12}>
            <Box pt={4} pl={2}>
              <Typography color="secondary">{localization.t('labels.lastUpdate')}</Typography>
            </Box>
            <Box p={2}>
              <Typography>{moment(curMetaRole.updateDate).format('YYYY/MM/DD kk:mm (Z)')}</Typography>
            </Box>
          </Grid>
          <Grid item md={4} sm={12}>
            {curMetaRole.lastUpdateReason && (
            <>
              <Box pt={4} pl={2}>
                <Typography color="secondary">{localization.t('labels.lastUpdateReason')}</Typography>
              </Box>
              <Box p={2}>
                <Typography>{curMetaRole.lastUpdateReason}</Typography>
              </Box>
            </>
            )}
          </Grid>
        </Grid>
        <Box p={2} mt={3} width='70%'>
          <InputCustom
            label='reasonForCurrentChange'
            value={curMetaRole.reason}
            onChangeInput={(e) => setCurMetaRole({ ...curMetaRole, reason: e.target.value })}
            isRequired
          />
        </Box>
        <Box p={2} width='70%'>
          <InputCustom
            label='name'
            value={curMetaRole.name}
            onChangeInput={(e) => setCurMetaRole({ ...curMetaRole, name: e.target.value })}
            isRequired
          />
        </Box>
      </>
    )
);

General.propTypes = {
  curMetaRole: PropTypes.object,
  setCurMetaRole: PropTypes.func,
};

export default General;
