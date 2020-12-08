import React, { useState } from 'react';

import { Tabs, Tab } from '@material-ui/core';

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
      {curTab === 0 && <ThemesTab />}
      {curTab === 1 && <LayoutsTab />}
      {curTab === 2 && <TranslationsTab />}
      {curTab === 3 && <FontsTab />}
    </div>
  );
};

export default CheckoutExperienceScreen;
