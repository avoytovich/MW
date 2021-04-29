import React from 'react';
import moment from 'moment';
import { LinearProgress, Grid, Typography, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import localization from '../../../localization';


const General = ({ curIdentity, setCurIdentity }) => (
  curIdentity === null ?
    <LinearProgress /> :
    <>
    {console.log(curIdentity)}
      <Grid container>
        <Grid item md={4} sm={12}>
          <Box pt={4} pl={2}>
            <Typography color="secondary">{localization.t('labels.createDate')}</Typography>
          </Box>
          <Box p={2}>
            <Typography>{moment(curIdentity.createDate).format('YYYY/MM/DD kk:mm (Z)')}</Typography>
          </Box>
        </Grid>
        <Grid item md={4} sm={12}>
          <Box pt={4} pl={2}>
            <Typography color="secondary">{localization.t('labels.lastUpdate')}</Typography>
          </Box>
          <Box p={2}>
            <Typography>{moment(curIdentity.updateDate).format('YYYY/MM/DD kk:mm (Z)')}</Typography>
          </Box>
        </Grid>
        <Grid item md={4} sm={12}>
          {/* {curIdentity.lastUpdateReason && <>
            <Box pt={4} pl={2}>
              <Typography color="secondary">{localization.t('labels.lastUpdateReason')}</Typography>
            </Box>
            <Box p={2}>
              <Typography>{curIdentity.lastUpdateReason}</Typography>
            </Box>
          </>} */}
        </Grid>
      </Grid>
      {/* <Box p={2} mt={3} width='70%'>
        <InputCustom
          label='reasonForCurrentChange'
          value={curIdentity.reason}
          onChangeInput={(e) =>
            setCurIdentity({ ...curIdentity, reason: e.target.value })
          }
          isRequired
        />
      </Box>
      <Box p={2} width='70%'>
        <InputCustom
          label='name'
          value={curIdentity.name}
          onChangeInput={(e) =>
            setCurIdentity({ ...curIdentity, name: e.target.value })
          }
          isRequired
        />
      </Box> */}
    </>
)

General.propTypes = {
  curIdentity: PropTypes.object,
  setCurIdentity: PropTypes.func,
};

export default General;
