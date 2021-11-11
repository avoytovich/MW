import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Tabs,
  Tab,
  Button,
} from '@material-ui/core';

import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';

import General from './SubSections/General';
import TemplateEditor from './SubSections/TemplateEditor';
import SampleData from './SubSections/SampleData';

import CustomCard from '../../components/utils/CustomCard';
import localization from '../../localization';

import './emailBuilderDetailsScreen.scss';

const EmailBuilderDetailsView = ({
  customerName,
  templateData,
  firstSampleData,
  samplesData,
  updateData,
  selectedLang,
  setSelectedLang,
}) => {
  const [curTab, setCurTab] = useState(0);
  const [editorMode, setEditorMode] = useState('preview');

  const ExtraActions = () => (
    <Box display='flex' justifyContent='space-between' width='140px' my='-6px'>
      <Button
        variant='contained'
        color={editorMode === 'preview' ? 'primary' : 'default'}
        onClick={() => setEditorMode('preview')}
      >
        <VisibilityIcon />
      </Button>

      <Button
        variant='contained'
        color={editorMode === 'edit' ? 'primary' : 'default'}
        onClick={() => setEditorMode('edit')}
      >
        <EditIcon />
      </Button>
    </Box>
  );

  return (
    <Box className='email-builder-details'>
      <Box my={2} bgcolor='#fff'>
        <Tabs
          data-test='tabs'
          value={curTab}
          indicatorColor='primary'
          textColor='primary'
          onChange={(event, newValue) => {
            setCurTab(newValue);
          }}
        >
          <Tab label={localization.t('labels.general')} />
          <Tab label={localization.t('labels.editor')} />
          <Tab label={localization.t('labels.sampleData')} />
        </Tabs>
      </Box>

      {curTab === 0 && (
        <CustomCard title={localization.t('labels.general')}>
          <General
            customer={customerName}
            data={templateData}
            updateData={updateData}
          />
        </CustomCard>
      )}

      {curTab === 1 && (
        <CustomCard title={localization.t('labels.editor')} extraActions={<ExtraActions />}>
          <TemplateEditor
            data={templateData}
            firstSampleData={firstSampleData}
            editorMode={editorMode}
            updateData={updateData}
            selectedLang={selectedLang}
            setSelectedLang={setSelectedLang}
          />
        </CustomCard>
      )}

      {curTab === 2 && (
        <CustomCard title={localization.t('labels.sampleData')}>
          <SampleData data={samplesData} />
        </CustomCard>
      )}
    </Box>
  );
};

EmailBuilderDetailsView.propTypes = {
  customerName: PropTypes.string,
  templateData: PropTypes.object,
  firstSampleData: PropTypes.object,
  samplesData: PropTypes.object,
  selectedLang: PropTypes.string,
  updateData: PropTypes.func,
  setSelectedLang: PropTypes.func,
};

export default EmailBuilderDetailsView;
