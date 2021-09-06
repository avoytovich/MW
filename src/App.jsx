import React, { useState, useEffect } from 'react';

import { ThemeProvider } from '@material-ui/core/styles';
import { Box, CircularProgress } from '@material-ui/core';

import RootComponent from './components/RootComponent';

import localization from './localization';
import theme from './theme';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [hasError, setError] = useState(false);

  const loadResourcesAsync = async () => {
    await import('./styles/fonts.scss');
    await localization.loadLocalization();
  };

  useEffect(() => {
    loadResourcesAsync()
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });

    return () => {
      setLoading(true);
      setError(false);
    };
  }, []);

  if (isLoading) return <CircularProgress />;

  if (hasError) return <Box color='error.main'>{localization.t('general.error')}</Box>;

  return (
    <ThemeProvider theme={theme}>
      <RootComponent />
    </ThemeProvider>
  );
};

export default App;
