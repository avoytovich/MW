import React, { useState } from 'react';

import { Tabs, Tab, Box } from '@material-ui/core';

import TranslationsTab from './TranslationsTab';
import FontsTab from './FontsTab';
import ThemesTab from './ThemesTab';
import LayoutsTab from './LayoutsTab';

const CheckoutExperienceScreen = () => {
  const [curTab, setCurTab] = useState(0);

  return (
    <div className="identity-details-screen">
      <Tabs
        value={curTab}
        onChange={(e, newTab) => setCurTab(newTab)}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Themes" />
        <Tab label="Layouts" />
        <Tab label="Translations" />
        <Tab label="Fonts" />
      </Tabs>
      <Box mt={3}>
        {curTab === 0 && <ThemesTab />}
        {curTab === 1 && <LayoutsTab />}
        {curTab === 2 && <TranslationsTab />}
        {curTab === 3 && <FontsTab />}
      </Box>
    </div>
  );
};

export default CheckoutExperienceScreen;
