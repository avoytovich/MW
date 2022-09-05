import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
  Box, Typography, Grid,
} from '@mui/material';
import { FileCopy } from '@mui/icons-material';
import PropTypes from 'prop-types';
import InheritanceField from '../ProductDetailsScreen/InheritanceField';
import parentPaths from '../../services/paths';
import {
  InputCustom, NumberInput, SelectWithChip,
} from '../../components/Inputs';
import localization from '../../localization';
import { copyText } from '../../services/helpers/utils';

import './AuthenticationRealmDetailsView.scss';

const AuthenticationRealmDetailsView = ({
  currentRealm,
  setCurrentRealm,
  selectOptions,
  setRealms,
}) => (
  <Box className="theme-screen">
    {currentRealm.id && (
      <Box width="100%" flexWrap="nowrap" display="flex" flexDirection="row" mb="8px">
        <Grid item md={3} xs={12}>
          <Typography color="textPrimary">
            {localization.t('labels.id')}
          </Typography>
        </Grid>
        <Grid item md={9} xs={12} width="100%" flexWrap="nowrap" display="flex" flexDirection="row">
          <Box>
            <Typography>{currentRealm.id}</Typography>
          </Box>
          <Box ml="10px">
            <FileCopy color='secondary' onClick={() => copyText(currentRealm.id)} />
          </Box>
        </Grid>
      </Box>
    )}
    <Box width="100%" flexWrap="nowrap" display="flex" flexDirection="row" mb="8px">
      <Grid item md={3} xs={12}>
        <Typography color="textPrimary">
          {localization.t('labels.creationDate')}
        </Typography>
      </Grid>
      <Grid item md={9} xs={12}>
        <Typography>{moment(currentRealm.createDate).format('YYYY/MM/DD kk:mm (Z)')}</Typography>
      </Grid>
    </Box>
    <Box width="100%" flexWrap="nowrap" display="flex" flexDirection="row" mb="8px">
      <Grid item md={3} xs={12}>
        <Typography color="textPrimary">
          {localization.t('labels.lastUpdate')}
        </Typography>
      </Grid>
      <Grid item md={9} xs={12}>
        <Typography>{moment(currentRealm.updateDate).format('YYYY/MM/DD kk:mm (Z)')}</Typography>
      </Grid>
    </Box>
    <Box width="100%" flexWrap="nowrap" display="flex" flexDirection="row" mb="8px">
      <Grid item md={3} xs={12}>
        <Typography color="textPrimary">
          {localization.t('labels.associatedCustomer')}
        </Typography>
      </Grid>
      <Grid item md={9} xs={12} width="100%" flexWrap="nowrap" display="flex" flexDirection="row">
        <Box>
          <Link to={`${parentPaths.customers}/${currentRealm.id}`} className='link-to-customer'>
            <Typography>{currentRealm.id}</Typography>
          </Link>
        </Box>
        <Box ml="10px">
          <FileCopy color='secondary' onClick={() => copyText(currentRealm.id)} />
        </Box>
      </Grid>
    </Box>
    <Box pr={4} pt="8px" pb="8px">
      <InputCustom
        label='path'
        value={currentRealm.path}
        onChangeInput={(e) => setCurrentRealm({ ...currentRealm, path: e.target.value })}
      />
    </Box>
    <Box pr={4} pt="8px" pb="8px">
      <NumberInput
        minMAx={{ min: 1000 * 60 * 5, max: 1000 * 60 * 60 * 24 * 7, step: 1000 * 60 }}
        label='resetPasswordTokenLifespan'
        value={currentRealm.tokenDuration}
        onChangeInput={(e) => setCurrentRealm({ ...currentRealm, tokenDuration: e.target.value })}
      />
    </Box>
    <Box pr={4} pb="8px" pt="8px">
      <SelectWithChip
        data-test='managedCustomers'
        label='managedCustomers'
        value={currentRealm.authorizedCustomerIds}
        selectOptions={selectOptions.customers}
        onChangeSelect={(e) => {
          setCurrentRealm({
            ...currentRealm,
            authorizedCustomerIds: e.target.value,
          });
        }}
        onClickDelIcon={(chip) => {
          const newValue = [...currentRealm.authorizedCustomerIds].filter(
            (val) => val !== chip,
          );
          setCurrentRealm({
            ...currentRealm,
            authorizedCustomerIds: newValue,
          });
        }}
      />
      <Typography color="textPrimary" margin='7px'>
        {localization.t('labels.identitiesForRealm')}
      </Typography>
    </Box>
    <Box pr={4} pb="8px" pt="8px">
      <InheritanceField
        field='jwtPublicKey'
        onChange={setRealms}
        value={currentRealm.jwtPublicKey}
        style={{ width: '100%' }}
      >
        <InputCustom
          fullWidth
          isMultiline
          label='jwtPublicKey'
          value={currentRealm.jwtPublicKey}
          onChangeInput={(e) => setCurrentRealm({
            ...currentRealm,
            jwtPublicKey: e.target.value,
          })}
        />
      </InheritanceField>
    </Box>
  </Box>
);

AuthenticationRealmDetailsView.propTypes = {
  currentRealm: PropTypes.object,
  setCurrentRealm: PropTypes.func,
  selectOptions: PropTypes.object,
  setSelectOptions: PropTypes.func,
  realms: PropTypes.object,
  setRealms: PropTypes.func,
};

export default AuthenticationRealmDetailsView;
