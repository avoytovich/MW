/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import {
  Box,
  LinearProgress,
  Button,
} from '@mui/material';

import CodeIcon from '@mui/icons-material/Code';
import CodeOffIcon from '@mui/icons-material/CodeOff';
import LocalizedContentInputs from '../../../components/utils/LocalizedContent';
import { DefaultLanguage } from './LocalizationInputs';

import { getLanguagesOptions } from '../../../components/utils/OptionsFetcher/OptionsFetcher';
import JsonEditor from '../../../components/JsonEditor';

import {
  checkValue,
} from '../../../services/helpers/dataStructuring';

import {
  handleEditorParsing,
} from '../utils';

const defaultEditorData = {
  localizedMarketingName: {},
  localizedShortDesc: {},
  localizedLongDesc: {},
  localizedThankYouDesc: {},
  localizedPurchaseEmailDesc: {},
  localizedManualRenewalEmailDesc: {},
};

const LocalizedContent = ({
  myRef,
  parentId,
  setCodeMode,
  codeMode,
  curLocalizedData,
  setCurLocalizedData,
  localizedErrors,
  setLocalizedErrors,
  descriptionData,
  parentDescriptionData = false,
  errors,
}) => {
  const [descrEditorData, setDescrEditorData] = useState({ ...defaultEditorData });
  const availableLocales = getLanguagesOptions();

  const handleChangeDefaultLanguage = (defLanguage) => {
    if (typeof defLanguage === 'string') {
      setCurLocalizedData({ ...curLocalizedData, fallbackLocale: defLanguage });
    } else {
      setCurLocalizedData({ ...defLanguage });
    }
  };

  const saveDescriptionData = (newData) => {
    const data = JSON.parse(newData);

    handleEditorParsing({
      ...descriptionData, ...data,
    }, parentDescriptionData, setCurLocalizedData);
  };

  useEffect(() => {
    const newEditorData = {};

    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const ed in defaultEditorData) {
      newEditorData[ed] = checkValue(descriptionData[ed]);
    }

    setDescrEditorData(newEditorData);
  }, [descriptionData]);

  if (!curLocalizedData) return <LinearProgress />;

  return (
    <>
      <Box position='absolute' right='15px' top='20px'>
        <Button onClick={() => setCodeMode((c) => !c)}>
          {codeMode ? <CodeOffIcon /> : <CodeIcon />}
        </Button>
      </Box>

      {
        !codeMode ? (
          <>
            <DefaultLanguage
              myRef={myRef}
              curData={curLocalizedData}
              selectOptions={availableLocales}
              onChange={handleChangeDefaultLanguage}
              parentId={parentId}
              errors={errors}
            />
            <LocalizedContentInputs
              parentId={parentId}
              isVertical
              defaultLocale={checkValue(curLocalizedData.fallbackLocale)}
              setLocalizedData={(newValue) => {
                setCurLocalizedData((c) => ({
                  ...c,
                  i18nFields: newValue,
                }));
              }}
              errors={localizedErrors}
              setErrors={setLocalizedErrors}
              localizedData={curLocalizedData?.i18nFields}
            />
          </>
        ) : (
          <JsonEditor
            currentData={JSON.stringify(descrEditorData, 0, 4)}
            onSave={saveDescriptionData}
          />
        )
      }
    </>
  );
};

LocalizedContent.propTypes = {
  parentId: PropTypes.string,
  setCodeMode: PropTypes.func,
  codeMode: PropTypes.bool,
  curLocalizedData: PropTypes.object,
  setCurLocalizedData: PropTypes.func,
  localizedErrors: PropTypes.object,
  setLocalizedErrors: PropTypes.func,
  descriptionData: PropTypes.object,
  parentDescriptionData: PropTypes.any,
};

export default LocalizedContent;
