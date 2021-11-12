/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  LinearProgress,
  Tabs,
  Tab,
  TextField,
  Typography,
} from '@material-ui/core';

import LocalizedContent from './LocalizedContent';
import localization from '../../../localization';
import { b64DecodeUnicode } from '../../../services/helpers/utils';
import { InputCustom, SelectCustom } from '../../../components/Inputs';

import { getLanguagesOptions } from '../../../components/utils/OptionsFetcher/OptionsFetcher';

import api from '../../../api';

const TemplateEditor = ({
  data,
  firstSampleData = {},
  editorMode,
  updateData,
  selectedLang,
  setSelectedLang,
}) => {
  const availableLocales = [{ id: 'neutral', value: 'neutral' }, ...getLanguagesOptions()];
  const [tmplData, setTmplData] = useState(null);
  const [curTab, setCurTab] = useState(0);

  useEffect(() => {
    if (data?.templates && Object.values(data?.templates).length && Object.keys(firstSampleData).length && editorMode === 'preview') {
      setTmplData(null);

      const curLocale = data.fallbackLocale && data.templates[data.fallbackLocale]
        ? data.fallbackLocale : Object.keys(data.templates)[0];

      api
        .emailTestTemplating({
          ...firstSampleData,
          template: {
            locale: curLocale,
            ...data.templates[curLocale],
          },
        })
        .then(({ data: _data }) => {
          const subject = b64DecodeUnicode(_data.subject);
          const body = b64DecodeUnicode(_data.body);

          const blob = new Blob([body], { type: 'text/html' });

          setTmplData({
            subject,
            body,
            url: URL.createObjectURL(blob),
          });
        })
        .catch(() => {
          setTmplData(false);
        });
    } else {
      setTmplData(false);
    }
  }, [editorMode]);

  const TemplatePreview = () => (
    tmplData ? (
      <>
        <Box py={2} pt={4} width="50%">
          <InputCustom
            label='mailSubjectTemplate'
            isDisabled
            value={tmplData?.subject || ''}
          />
        </Box>

        <Box bgcolor='#fff'>
          <Tabs
            data-test='tabs'
            value={curTab}
            indicatorColor='primary'
            textColor='primary'
            onChange={(event, newValue) => {
              setCurTab(newValue);
            }}
          >
            <Tab label={localization.t('labels.renderedHtml')} />
            <Tab label={localization.t('labels.htmlCode')} />
          </Tabs>
        </Box>

        <Box display="flex" py={2}>
          {tmplData?.url && curTab === 0 && (
            <iframe
              src={tmplData.url}
              title={tmplData.subject}
              onLoad={(e) => {
                if (e.target) {
                  e.target.style.height = `${e.target.contentWindow.document.body.scrollHeight}px`;
                }
              }}
              width='100%'
              scrolling='no'
              frameBorder='0'
            />
          )}

          {curTab === 1 && (
            <TextField
              fullWidth
              multiline
              value={tmplData?.body}
              variant="outlined"
            />
          )}
        </Box>
      </>
    ) : <Box pt={3}><Typography>{localization.t('general.noTmplData')}</Typography></Box>
  );

  const TemplateEdit = () => (
    <Box display='flex' flexDirection='column'>
      <Box px={3} width="50%" my={4}>
        <SelectCustom
          label='fallbackLocale'
          onChangeSelect={(e) => updateData((c) => ({ ...c, fallbackLocale: e.target.value }))}
          selectOptions={availableLocales}
          value={data?.fallbackLocale || ''}
        />
      </Box>

      <LocalizedContent
        selectedLang={selectedLang}
        setSelectedLang={setSelectedLang}
        data={data}
        setData={updateData}
      />
    </Box>
  );

  return (
    <>
      {tmplData === null ? <LinearProgress style={{ width: '100%', marginTop: '15px' }} /> : (
        editorMode === 'preview' ? <TemplatePreview /> : <TemplateEdit />
      )}
    </>
  );
};

TemplateEditor.propTypes = {
  data: PropTypes.object,
  firstSampleData: PropTypes.object,
  editorMode: PropTypes.string,
  selectedLang: PropTypes.string,
  updateData: PropTypes.func,
  setSelectedLang: PropTypes.func,
};

export default TemplateEditor;
