/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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

const LocalizedContent = ({
  parentId,
  setCodeMode,
  codeMode,
  jsonIsValid,
  setJsonIsValid,
  curLocalizedData,
  setCurLocalizedData,
  setDescriptionData,
  localizedErrors,
  setLocalizedErrors,
  descriptionData,
  parentDescriptionData = false,
}) => {
  const [descrRequestData, setDescrRequestData] = useState(null);
  const availableLocales = getLanguagesOptions();

  const handleChangeDefaultLanguage = (defLanguage) => {
    if (typeof defLanguage === 'string') {
      setCurLocalizedData({ ...curLocalizedData, fallbackLocale: defLanguage });
    } else {
      setCurLocalizedData({ ...defLanguage });
    }
  };

  const updateContentByEditor = (content) => {
    if (descriptionData !== content) {
      try {
        const data = JSON.parse(content);
        handleEditorParsing(data, parentDescriptionData, setCurLocalizedData);

        setDescriptionData(data);
      } catch (e) {
        setCurLocalizedData(content);
      }
    }
  };

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
              curData={curLocalizedData}
              selectOptions={availableLocales}
              onChange={handleChangeDefaultLanguage}
              parentId={parentId}
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
            currentData={typeof curLocalizedData === 'object' ? JSON.stringify(descriptionData, 0, 4) : descriptionData}
            setCurrentData={(content) => updateContentByEditor(content)}
            jsonIsValid={jsonIsValid}
            setJsonIsValid={setJsonIsValid}
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
  jsonIsValid: PropTypes.bool,
  setJsonIsValid: PropTypes.func,
  curLocalizedData: PropTypes.object,
  setCurLocalizedData: PropTypes.func,
  localizedErrors: PropTypes.object,
  setLocalizedErrors: PropTypes.func,
  descriptionData: PropTypes.object,
  parentDescriptionData: PropTypes.any,
  setDescriptionData: PropTypes.func,
};

export default LocalizedContent;
