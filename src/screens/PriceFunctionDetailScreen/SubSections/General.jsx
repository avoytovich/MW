import React from 'react';
import {
  Box,
  Typography,
  Grid,
} from '@material-ui/core';

import { FileCopy as FileCopyIcon } from '@material-ui/icons';
import moment from 'moment';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { copyText } from '../../../services/helpers/utils';
import parentPaths from '../../../services/paths';
import localization from '../../../localization';
import { InputCustom } from '../../../components/Inputs';
import '../priceFunctionDetail.scss';

const General = ({ setCurPriceFunction, curPriceFunction }) => (
  <Grid container>
    <Grid item md={12}>
      {curPriceFunction.id && (
        <Box display="flex" p={2} flexDirection="row">
          <Box pr={2}><Typography>{localization.t('labels.priceFunctionId')}</Typography></Box>
          <Box pr={2}>
            <Typography color='secondary'>{curPriceFunction.id}</Typography>
          </Box>
          <Box>
            <FileCopyIcon
              color='secondary'
              className="copyIcon"
              onClick={() => copyText(curPriceFunction.id)}
            />
          </Box>
        </Box>
      )}
      <Box display="flex" p={2} flexDirection="row">
        <Box pr={2}><Typography>{localization.t('labels.customer')}</Typography></Box>
        <Box pr={2}>
          <Link to={`${parentPaths.customers}/${curPriceFunction.customerId}`} className='customerLink'>
            <Typography>{curPriceFunction.customerName}</Typography>
          </Link>
        </Box>
        <Box>
          <FileCopyIcon
            color='secondary'
            className="copyIcon"
            onClick={() => copyText(curPriceFunction.customerId)}
          />
        </Box>
      </Box>
      {curPriceFunction.id && (
      <>
        <Box display="flex" p={2} flexDirection="row">
          <Box pr={2}><Typography>{localization.t('labels.creationDate')}</Typography></Box>
          <Box>
            <Typography color='secondary'>{moment(curPriceFunction.createDate).format('YYYY-MM-DD HH:mm')}</Typography>
          </Box>
        </Box>
        <Box display="flex" p={2} flexDirection="row">
          <Box pr={2}><Typography>{localization.t('labels.lastUpdate')}</Typography></Box>
          <Box>
            <Typography color='secondary'>{moment(curPriceFunction.updateDate).format('YYYY-MM-DD HH:mm')}</Typography>
          </Box>
        </Box>
      </>
      )}
    </Grid>
    <Grid item md={6} sm={12}>
      <Box p={2}>
        <InputCustom
          label='priceFunctionName'
          value={curPriceFunction.name}
          onChangeInput={(e) => setCurPriceFunction({
            ...curPriceFunction,
            name: e.target.value,
          })}
          isRequired
        />
      </Box>
      <Box p={2}>
        <InputCustom
          label='variables'
          isMultiline
          helperText='Please enter values one per one'

          value={curPriceFunction.variables.join('\r\n')}
          onChangeInput={(e) => {
            let res = [];
            if (e.target.value) {
              res = e.target.value.split(/\r?\n/);
            }
            setCurPriceFunction({
              ...curPriceFunction,
              variables: res,
            });
          }}
        />
      </Box>
      <Box p={2}>
        <InputCustom
          label='productFields'
          helperText='Please enter values one per one'
          isMultiline
          value={curPriceFunction.productFields.join('\r\n')}
          onChangeInput={(e) => {
            let res = [];
            if (e.target.value) {
              res = e.target.value.split(/\r?\n/);
            }
            setCurPriceFunction({
              ...curPriceFunction,
              productFields: res,
            });
          }}
        />
      </Box>
      <Box p={2}>
        <InputCustom
          label='expression'
          isMultiline
          value={curPriceFunction.expression}
          onChangeInput={(e) => setCurPriceFunction({
            ...curPriceFunction,
            expression: e.target.value,
          })}
          isRequired
        />
      </Box>
    </Grid>
  </Grid>
);

General.propTypes = {
  curPriceFunction: PropTypes.object,
  setCurPriceFunction: PropTypes.func,
};

export default General;
