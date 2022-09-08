import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import LogoHome from '../../components/utils/LogoHome';
import localization from '../../localization';
import api from '../../api';
import './OnboardingLayout.scss';
import OnboardingForm from '../../components/OnboardingForm/OnboardingForm';

const OnboardingLayout = () => {
  const location = useLocation();
  const [realmData, setRealmData] = useState(null);

  useEffect(() => {
    const realmName = location.pathname.split('/')[1];
    try {
      api.getRealmDataByName(realmName)
        .then(({ data }) => setRealmData(data));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }, []);

  return (
    <Grid
      className='authWrapperContainer'
      container
      direction="column"
      alignItems='center'
    >
      <LogoHome>
        <Typography variant="h4" xs={1}>{localization.t('general.logoCenter')}</Typography>
      </LogoHome>
      {realmData && realmData?.name !== 'Nexway'
          && (
          <Grid
            className='realmField'
          >
            <Typography
              variant="h1"
              xs={1}
              fontSize={50}
            >
              {realmData?.name }
            </Typography>
          </Grid>
          )}

      <Grid
        container
        justifyContent='center'
        maxWidth='50%'
      >
        <Box pt={4} pb={2}>
          <Typography variant="h2">{localization.t('general.onboard')}</Typography>
        </Box>
        <Box>
          <Typography variant="h6">{localization.t('general.onboardDescriptionText')}</Typography>
        </Box>
        <Grid
          justifyContent='center'
          alignItems='center'
          direction='row'
          className='authWrapperChild'
        >
          <Grid item>
            <OnboardingForm realmData={realmData} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OnboardingLayout;
