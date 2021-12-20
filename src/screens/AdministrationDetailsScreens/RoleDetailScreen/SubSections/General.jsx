import React from 'react';
import moment from 'moment';
import {
  LinearProgress, Grid, Typography, Box,
} from '@mui/material';
import PropTypes from 'prop-types';
import { InputCustom } from '../../../../components/Inputs';
import localization from '../../../../localization';

const General = ({ curRole, setCurRole }) => (
  curRole === null
    ? <LinearProgress />
    : (
      <>
        <Grid container>
          <Grid item md={4} sm={12}>
            <Box pt={4} pl={2}>
              <Typography color="secondary">{localization.t('labels.createDate')}</Typography>
            </Box>
            <Box p={2}>
              <Typography data-test='createDate'>{moment(curRole.createDate).format('YYYY/MM/DD kk:mm (Z)')}</Typography>
            </Box>
          </Grid>
          <Grid item md={4} sm={12}>
            <Box pt={4} pl={2}>
              <Typography color="secondary">{localization.t('labels.lastUpdate')}</Typography>
            </Box>
            <Box p={2}>
              <Typography data-test='updateDate'>{moment(curRole.updateDate).format('YYYY/MM/DD kk:mm (Z)')}</Typography>
            </Box>
          </Grid>
          <Grid item md={4} sm={12}>
            {curRole.lastUpdateReason
              && (
                <>
                  <Box pt={4} pl={2}>
                    <Typography color="secondary">{localization.t('labels.lastUpdateReason')}</Typography>
                  </Box>
                  <Box p={2}>
                    <Typography data-test='lastUpdateReason'>{curRole.lastUpdateReason}</Typography>
                  </Box>
                </>
              )}
          </Grid>
        </Grid>
        <Box p={2} mt={3} width='70%'>
          <InputCustom
            data-test='name'
            label='name'
            value={curRole.name}
            onChangeInput={(e) => setCurRole({ ...curRole, name: e.target.value })}
            isRequired
          />
        </Box>
        <Box p={2} width='70%'>
          <InputCustom
            data-test='description'
            label='description'
            isMultiline
            value={curRole.description}
            onChangeInput={(e) => setCurRole({ ...curRole, description: e.target.value })}
          />
        </Box>
        <Box p={2} width='70%'>
          <InputCustom
            data-test='reasonForCurrentChange'
            label='reasonForCurrentChange'
            value={curRole.reason}
            onChangeInput={(e) => setCurRole({ ...curRole, reason: e.target.value })}
          />
        </Box>

      </>
    )
);

General.propTypes = {
  curRole: PropTypes.object,
  setCurRole: PropTypes.func,
};

export default General;
