import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Switch,
  TextField,
  Grid,
} from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { toast } from 'react-toastify';

import localization from '../../localization';
import parentPaths from '../../services/paths';
import { InputCustom, SelectCustom } from '../../components/Inputs';

import './catalogsDetailsView.scss';
import CustomCard from '../../components/utils/CustomCard';

const CatalogsDetailsView = ({
  id,
  customer,
  curCatalogs,
  curCatalogs: { startDate, endDate },
  setCurCatalogs,
  catalogs,
}) => {
  const history = useHistory();
  const { id: param } = useParams();

  const [runningDate, setRunningDate] = useState((startDate && endDate && 'BETWEEN') || (startDate && 'AFTER') || '');
  const [showAfter, setShowAfter] = useState(runningDate === 'AFTER');
  const [showBetween, setShowBetween] = useState(runningDate === 'BETWEEN');

  const makeCopy = (value) => {
    navigator.clipboard.writeText(value)
      .then(() => toast(localization.t('general.itemHasBeenCopied')));
  };

  const resolveRunningDate = (e) => {
    switch (e.target.value) {
      case 'AFTER':
        setRunningDate('AFTER');
        setShowBetween(false);
        setShowAfter(true);
        setCurCatalogs({
          ...curCatalogs,
          endDate: null,
        });
        break;
      case 'BETWEEN':
        setRunningDate('BETWEEN');
        setShowAfter(false);
        setShowBetween(true);
        break;
      default:
        return null;
    }
  };

  const updateCatalogs = (type, value, selections) => {
    let setValue = value;
    if (!curCatalogs[type]) {
      setValue = [value];
    } else if (selections === 'multiple' || selections === 'empty') {
      const curValInd = curCatalogs[type].indexOf(value);
      if (curValInd >= 0) {
        if (curCatalogs[type].length === 1) {
          if (selections === 'multiple') return;
          setValue = [];
        } else {
          const newArr = [...curCatalogs[type]];
          newArr.splice(curValInd, 1);
          setValue = newArr;
        }
      } else {
        setValue = [...curCatalogs[type], value];
      }
    }
    setCurCatalogs((c) => ({ ...c, [type]: setValue }));
  };

  const isAdd = () => param === 'add';

  return (
    <CustomCard mt={0}>
      <Grid item md={12} sm={12} className='wrapper-catalog' container>
        <Grid item md={6} sm={12}>
          {!isAdd() && (
            <Box display="flex" pt={2} alignItems="baseline">
              <Grid item md={3} sm={12}>
                <Box>
                  <Typography variant='h6'>{localization.t('labels.catalogsId')}</Typography>
                </Box>
              </Grid>
              <Grid item md={9} sm={12}>
                <Box className="catalogs-id" display="flex">
                  <Box>
                    <Typography variant='subtitle1' className="catalogs-id-value">
                      {id}
                    </Typography>
                  </Box>
                  <Box pl={2}>
                    <FileCopyIcon
                      onClick={() => makeCopy(id)}
                      color="secondary"
                    />
                  </Box>
                </Box>
              </Grid>
            </Box>
          )}
          <Box pt={isAdd() ? 2 : 1} display="flex" alignItems="baseline">
            <Grid item md={3} sm={12}>
              <Box>
                <Typography variant='h6'>{localization.t('labels.customer')}</Typography>
              </Box>
            </Grid>
            <Grid item md={9} sm={12}>
              <Box className="catalogs-customer" display="flex">
                <Box>
                  <Typography variant='subtitle1' className="catalogs-customer-value">
                    {customer && (
                      <span
                        className="customer-value"
                        onClick={() => history.push(`${parentPaths.customers}/${curCatalogs.customerId}`)}
                      >
                        {customer.name}
                      </span>
                    )}
                  </Typography>
                </Box>
                <Box pl={2}>
                  <FileCopyIcon
                    onClick={() => makeCopy(customer.name)}
                    color="secondary"
                  />
                </Box>
              </Box>
            </Grid>
          </Box>
          <Box display="flex" alignItems="baseline">
            <Grid item md={3} sm={12}>
              <Typography variant='h6'>{localization.t('labels.salesMode')}</Typography>
            </Grid>
            <Grid item md={9} sm={12}>
              <FormControlLabel
                control={(
                  <Checkbox
                    name='STANDARD'
                    color='primary'
                    checked={curCatalogs?.salesMode?.indexOf('STANDARD') >= 0}
                    onChange={() => updateCatalogs('salesMode', 'STANDARD')}
                    label='STANDARD'
                  />
                )}
                label='STANDARD'
              />
              <FormControlLabel
                control={(
                  <Checkbox
                    name='BILLING_PLAN'
                    color='primary'
                    checked={curCatalogs?.salesMode?.indexOf('BILLING_PLAN') >= 0}
                    onChange={() => updateCatalogs('salesMode', 'BILLING_PLAN')}
                    label='BILLING_PLAN'
                  />
                )}
                label='BILLING_PLAN'
              />
            </Grid>
          </Box>
          <Box display="flex" alignItems="baseline">
            <Grid item md={3} sm={12}>
              <Box>
                <Typography variant='h6'>{localization.t('labels.singleUse_v1')}</Typography>
              </Box>
            </Grid>
            <Grid item md={9} sm={12}>
              <Box className='catalogs-singleUse'>
                <Typography variant='subtitle1' className='catalogs-singleUse-value'>
                  <FormControlLabel
                    control={(
                      <Switch
                        name='singleUse'
                        onChange={(e) => {
                          setCurCatalogs({
                            ...curCatalogs,
                            singleUse: !!e.target.checked,
                          });
                        }}
                        color="primary"
                        checked={curCatalogs.singleUse}
                      />
                    )}
                    label={curCatalogs.singleUse
                      ? localization.t('labels.yes') : localization.t('labels.no')}
                  />
                </Typography>
              </Box>
            </Grid>
          </Box>
          <Box display="flex" alignItems="baseline">
            <Grid item md={3} sm={12}>
              <Typography variant='h6'>
                {`${localization.t(
                  'labels.status',
                )} *`}
              </Typography>
            </Grid>
            <Grid item md={9} sm={12}>
              <FormControlLabel
                control={(
                  <Switch
                    color={curCatalogs?.status === 'ENABLED' ? 'success' : 'primary'}
                    checked={curCatalogs?.status === 'ENABLED'}
                    name='status'
                  />
                  )}
                onChange={(e) => {
                  setCurCatalogs({
                    ...curCatalogs,
                    status: e.target.checked ? 'ENABLED' : 'DISABLED',
                  });
                }}
                label={
                curCatalogs?.status === 'ENABLED'
                  ? localization.t('labels.enabled')
                  : localization.t('labels.disabled')
                }
              />
            </Grid>
          </Box>
          <Box display="flex" alignItems="baseline">
            <Grid item md={3} sm={12}>
              <Box>
                <Typography variant='h6'>{localization.t('labels.running')}</Typography>
              </Box>
            </Grid>
            <Grid item md={9} sm={12}>
              <Box className='catalogs-running'>
                <Typography variant='subtitle1' className='catalogs-running-value'>
                  <FormControlLabel
                    control={(
                      <Switch
                        name='running'
                        isDisabled
                        color="primary"
                        checked={curCatalogs.running}
                      />
                    )}
                    label={curCatalogs.running
                      ? localization.t('labels.yes') : localization.t('labels.no')}
                  />
                </Typography>
              </Box>
            </Grid>
          </Box>
        </Grid>
        <Grid item md={6} sm={12}>
          <Box p={2}>
            <InputCustom
              isRequired
              label='name'
              value={curCatalogs.name}
              onChangeInput={(e) => setCurCatalogs({
                ...curCatalogs,
                name: e.target.value,
              })}
            />
          </Box>
          <Box p={2}>
            <SelectCustom
              isDisabled
              label='type'
              value={curCatalogs.type}
              selectOptions={[
                { id: 'INTERNAL', value: localization.t('labels.internal') },
                { id: 'FULL_REMOTE', value: localization.t('labels.fullRemote') },
                { id: 'PRICING_REMOTE', value: localization.t('labels.pricingRemote') },
                { id: 'VARIANT_PRICING_REMOTE', value: localization.t('labels.variantPricingRemote') },
                { id: 'SIGNED', value: localization.t('labels.signed') },
                { id: 'SHARED', value: localization.t('labels.shared') },
              ]}
            />
          </Box>
          <Box p={2}>
            <SelectCustom
              label='runningDate'
              value={runningDate}
              onChangeSelect={(e) => resolveRunningDate(e)}
              selectOptions={[
                { id: 'AFTER', value: localization.t('labels.after') },
                { id: 'BETWEEN', value: localization.t('labels.between') },
              ]}
            />
          </Box>
          {showAfter && (
            <Box p={2}>
              <TextField
                fullWidth
                name='afterDate'
                value={curCatalogs?.startDate ? moment(curCatalogs.startDate).format('YYYY-MM-DDTHH:mm') : ''}
                label={localization.t('labels.after')}
                type='datetime-local'
                variant='outlined'
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  style: {
                    fontSize: '12px', height: '56px', boxSizing: 'border-box', color: '#b9b1b1', padding: '8px',
                  },
                }}
                onChange={(e) => {
                  setCurCatalogs({
                    ...curCatalogs,
                    startDate: Date.parse(e.target.value),
                  });
                }}
              />
            </Box>
          )}
          {showBetween && (
            <Box p={2}>
              <TextField
                fullWidth
                name='fromDate'
                value={curCatalogs?.startDate ? moment(curCatalogs.startDate).format('YYYY-MM-DDTHH:mm') : ''}
                label={localization.t('labels.from')}
                type='datetime-local'
                variant='outlined'
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  style: {
                    fontSize: '12px', height: '56px', boxSizing: 'border-box', color: '#b9b1b1', padding: '8px',
                  },
                }}
                onChange={(e) => {
                  setCurCatalogs({
                    ...curCatalogs,
                    startDate: Date.parse(e.target.value),
                  });
                }}
              />
              <Box pt={2}>
                <TextField
                  fullWidth
                  name='toDate'
                  value={curCatalogs?.endDate ? moment(curCatalogs.endDate).format('YYYY-MM-DDTHH:mm') : ''}
                  label={localization.t('labels.to')}
                  type='datetime-local'
                  variant='outlined'
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    style: {
                      fontSize: '12px', height: '56px', boxSizing: 'border-box', color: '#b9b1b1', padding: '8px',
                    },
                  }}
                  onChange={(e) => {
                    setCurCatalogs({
                      ...curCatalogs,
                      endDate: Date.parse(e.target.value),
                    });
                  }}
                />
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </CustomCard>
  );
};

CatalogsDetailsView.propTypes = {
  id: PropTypes.string,
  customer: PropTypes.object,
  curCatalogs: PropTypes.object,
  setCurCatalogs: PropTypes.func,
  catalogs: PropTypes.object,
};

export default CatalogsDetailsView;
