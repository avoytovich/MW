import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Button,
  Typography,
} from '@mui/material';

import moment from 'moment';

import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

import General from './SubSections/General';
import TemplateEditor from './SubSections/TemplateEditor';
import SampleData from './SubSections/SampleData';

import { getLanguagesOptions } from '../../components/utils/OptionsFetcher/OptionsFetcher';
import { SelectCustom } from '../../components/Inputs';
import CustomCard from '../../components/utils/CustomCard';
import localization from '../../localization';

import './emailBuilderDetailsScreen.scss';

import api from '../../api';

const EmailBuilderDetailsView = ({
  customerName,
  templateData,
  firstSampleData,
  samplesData,
  updateData,
  selectedLang,
  setSelectedLang,
  saveCustomSample,
  customSample,
  jsonIsValid,
  setJsonIsValid,
  refCustomers,
  curRefCustomer,
  setCurRefCustomer,
  curSelectedSample,
  setCurSelectedSample,
  curTab,
}) => {
  const availableLocales = [{ id: 'neutral', value: 'neutral' }, ...getLanguagesOptions()];
  const [editorMode, setEditorMode] = useState('preview');
  const [activatedCapture, setActivatedCapture] = useState(false);

  const activateCapture = () => {
    const captureData = {
      customerId: samplesData?.customerId,
      dbVersion: samplesData?.dbVersion,
      id: samplesData?.id,
      inDevUntil: moment().add(1, 'hours').valueOf(),
      name: samplesData?.name,
    };

    api
      .updateEmailTemplateSample(samplesData?.id, captureData)
      .then(() => setActivatedCapture(true));
  };

  const ExtraActions = () => (
    <Box display='flex' width={1} justifyContent='space-between' alignItems='center'>
      <Box display='flex' justifyContent='space-between' width='140px' height='40px'>
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

      <Box width="40%" my={1}>
        <SelectCustom
          label='fallbackLocale'
          onChangeSelect={(e) => updateData((c) => ({ ...c, fallbackLocale: e.target.value }))}
          selectOptions={availableLocales}
          value={templateData?.fallbackLocale || ''}
        />
      </Box>
    </Box>
  );

  const SampleExtraActions = () => (
    <Box display='flex' justifyContent='flex-end' alignItems='center' width='250px'>
      {moment().isBefore(samplesData.inDevUntil) || activatedCapture ? (
        <Typography variant='h5' color='primary'>Capture is activated</Typography>
      ) : (
        <>
          <Typography variant='h5' style={{ marginRight: '10px' }}>Activate capture</Typography>

          <Button
            variant='outlined'
            color={editorMode === 'preview' ? 'primary' : 'default'}
            onClick={activateCapture}
          >
            Activate
          </Button>
        </>
      )}
    </Box>
  );

  return (
    <Box className='email-builder-details'>
      {curTab === 0 && (
        <CustomCard title={localization.t('labels.general')} mt={0}>
          <General
            customer={customerName}
            data={templateData}
            updateData={updateData}
          />
        </CustomCard>
      )}

      {curTab === 1 && (
        <CustomCard
          noTitleSpace
          showDivider
          extraActions={<ExtraActions />}
          mt={0}
          justifyContent='space-between'
        >
          <TemplateEditor
            data={templateData}
            firstSampleData={firstSampleData}
            samplesData={samplesData}
            curSelectedSample={curSelectedSample}
            editorMode={editorMode}
            updateData={updateData}
            selectedLang={selectedLang}
            setSelectedLang={setSelectedLang}
          />
        </CustomCard>
      )}

      {curTab === 2 && (
        <CustomCard
          title={localization.t('labels.sampleData')}
          extraActions={samplesData && <SampleExtraActions />}
          mt={0}
        >
          <SampleData
            customSample={customSample}
            jsonIsValid={jsonIsValid}
            setJsonIsValid={setJsonIsValid}
            data={samplesData}
            curRefCustomer={curRefCustomer}
            setCurRefCustomer={setCurRefCustomer}
            saveCustomSample={saveCustomSample}
            refCustomers={refCustomers}
            curSelectedSample={curSelectedSample}
            setCurSelectedSample={setCurSelectedSample}
          />
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
  saveCustomSample: PropTypes.func,
  customSample: PropTypes.string,
  jsonIsValid: PropTypes.bool,
  setJsonIsValid: PropTypes.func,
  refCustomers: PropTypes.array,
  curTab: PropTypes.number,
  curRefCustomer: PropTypes.object,
  setCurRefCustomer: PropTypes.func,
  curSelectedSample: PropTypes.any,
  setCurSelectedSample: PropTypes.func,
};

export default EmailBuilderDetailsView;
