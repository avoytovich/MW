import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import {
  Box,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { generateSubscriptions } from '../utils';
import localization from '../../../localization';
import api from '../../../api';
import '../orderDetailsScreen.scss';

const Subscriptions = ({ subscriptions, setUpdate }) => {
  const [subscriptionsData, setSubscriptionsData] = useState(null);

  const makeCopy = (value) => {
    navigator.clipboard.writeText(value)
      .then(() => toast(localization.t('general.itemHasBeenCopied')));
  };

  const handleClick = (id, status) => {
    const newStatus = status === 'Active' ? 'suspend' : 'reactivate';
    api.updateSubscriptions(id, newStatus).then(() => {
      toast(localization.t('general.updatesHaveBeenSaved'));
      setUpdate((u) => u + 1);
    });
  };

  useEffect(() => {
    const data = (subscriptions && subscriptions.length > 0)
      ? generateSubscriptions(subscriptions) : null;
    setSubscriptionsData(data);

    return () => setSubscriptionsData(null);
  }, []);

  return subscriptionsData ? (
    <Grid container spacing={2}>
      {subscriptionsData.map((sub) => (
        <Grid key={sub.subscriptionId} item md={4} xs={12}>
          <Box bgcolor='#fff' boxShadow={2} height='100%' py={2}>
            {Object.keys(sub).map((key) => (
              <Grid container className="orderDetailsRow" key={`${key}_${sub.subscriptionId}`}>
                <Grid item md={6} xs={6}>
                  <Box p={2} fontWeight={500}>
                    {localization.t(`labels.${key}`)}
                  </Box>
                </Grid>
                <Grid item md={6} xs={6}>
                  <Box p={2} className="rowValue">
                    {key !== 'subscriptionId' ? (
                      sub[key]
                    ) : (
                      <Box display='flex'>
                        <Box className="rowValue">
                          {sub[key]}
                        </Box>
                        <Box ml={2}>
                          <FileCopyIcon
                            onClick={() => makeCopy(sub[key])}
                            style={{ marginLeft: '5px' }}
                            color="secondary"
                            className="actionIcon"
                          />
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Grid>
              </Grid>
            ))}
            <Box p={2} style={{ textAlign: 'center' }}>
              <Button
                style={sub.status !== 'Active' ? { backgroundColor: '#00A300' } : { backgroundColor: '#FF0000' }}
                size='large'
                variant='contained'
                onClick={() => handleClick(sub.subscriptionId, sub.status)}
              >
                {sub.status !== 'Active' ? localization.t('labels.resume') : localization.t('labels.suspend')}
              </Button>
            </Box>
          </Box>

        </Grid>
      ))}
    </Grid>
  ) : <Box p={2}><Typography>{localization.t('general.noSubscriptions')}</Typography></Box>;
};
Subscriptions.propTypes = {
  subscriptions: PropTypes.array,
  setUpdate: PropTypes.func,
};

export default Subscriptions;
