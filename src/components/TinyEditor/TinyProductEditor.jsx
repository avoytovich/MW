import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Box, CircularProgress } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';

import contentCss from 'tinymce/skins/content/default/content.min.css';
import contentUiCss from 'tinymce/skins/ui/oxide/content.min.css';

import { setTempProductLocales, setTempRecoLocales } from '../../redux/actions/TempData';
import { checkValue } from '../../services/helpers/dataStructuring';
import InheritanceField from '../../screens/ProductDetailsScreen/InheritanceField';
import store from '../../redux/store';

import localization from '../../localization';

import './tinyEditor.scss';

const tinyApiKey = 'se7x7gpvgb27p864drb8azmziv0pjikrjogirc7hqcsd5fng';

const TinyEditor = ({
  val,
  data,
  curLocal,
  parentId,
  placeholder,
  setHasLocalizationChanges,
  setDisabledWithMandLocal,
  isDefault,
  defaultLocale,
  reco = false,
}) => {
  const dispatch = useDispatch();
  const [editorLoading, setEditorLoading] = useState(true);
  const [editorRef, setEditorRef] = useState(false);
  const { i18nFields = {} } = useSelector(({ tempData }) => tempData);
  const i18nFieldsReco = useSelector(({ tempData }) => tempData.i18nFieldsReco) || data;
  let i18n;
  let initValue;
  if (reco) {
    i18n = i18nFieldsReco;
    initValue = i18n?.[curLocal] ? i18n?.[curLocal] : '';
  } else {
    i18n = i18nFields;
    initValue = i18n?.[curLocal] ? i18n?.[curLocal][val] : '';
  }

  const settleUpdates = (newData) => {
    const hasChanges = JSON.stringify(data) !== JSON.stringify(newData);
    setDisabledWithMandLocal(!checkValue(newData[defaultLocale]?.localizedMarketingName));
    setHasLocalizationChanges(hasChanges);
  };

  const makeNewData = (e) => {
    e.stopImmediatePropagation();
    const { tempData } = store.getState();
    const curContent = e.target.getContent();
    const correctContent = curContent === '<p></p>' ? undefined : curContent;

    let generatedData = {};

    const i18ns = tempData?.i18nFields || {};

    if (parentId) {
      generatedData = {
        // ..data,
        ...i18ns,
        [curLocal]: {
          ...i18ns?.[curLocal],
          [val]: {
            ...i18ns?.[curLocal][val],
            value: correctContent,
          },
        },
      };
    } else if (reco) {
      generatedData = {
        ...data,
        ...i18n,
        [curLocal]: correctContent,
      };
    } else {
      generatedData = {
        // ...data,
        ...i18ns,
        [curLocal]: {
          ...i18ns?.[curLocal],
          [val]: correctContent,
        },
      };
    }

    if (reco) {
      dispatch(setTempRecoLocales(generatedData));
    } else {
      dispatch(setTempProductLocales(generatedData));
      settleUpdates(generatedData);
    }
  };

  const makeNewInheritanceData = (inheritanceData) => {
    if (!parentId) return;

    if (inheritanceData[val]?.state !== i18nFields[curLocal][val]?.state) {
      const newData = {
        // ...data,
        ...i18nFields,
        [curLocal]: { ...inheritanceData },
      };

      dispatch(setTempProductLocales(newData));

      settleUpdates(newData);
    }

    if (inheritanceData[val]?.state === 'inherits') {
      editorRef.target.setContent(inheritanceData[val]?.parentValue || '');
      editorRef.target.getBody().setAttribute('class', 'mce-content-body mce-content-readonly');
      editorRef.target.getBody().setAttribute('contenteditable', false);
    } else {
      editorRef.target.getBody().setAttribute('class', 'mce-content-body');
      editorRef.target.getBody().setAttribute('contenteditable', true);
    }
  };

  return (
    <Box style={{ position: 'relative', minHeight: '56px' }}>
      {editorLoading && (
        <CircularProgress
          style={{
            position: 'absolute',
            left: 0,
            top: '15px',
          }}
          size='26px'
        />
      )}

      <Box style={{ opacity: editorLoading ? 0 : 1 }}>
        <InheritanceField
          field={val}
          onChange={(inheritanceData) => makeNewInheritanceData(inheritanceData)}
          value={initValue}
          parentId={parentId}
          currentProductData={i18n?.[curLocal]}
          isTinymce
        >
          <Editor
            apiKey={tinyApiKey}
            init={{
              placeholder,
              toolbar_mode: 'floating',
              inline: true,
              menubar: false,
              statusbar: false,
              plugins: 'lists code image',
              toolbar: 'undo redo | formatselect | bold italic | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent | removeformat | code | image',
              content_style: [contentCss, contentUiCss].join('\n'),
            }}
            initialValue={checkValue(initValue)}
            onInit={(ref) => {
              setEditorLoading(false);
              setEditorRef(ref);

              if (i18n?.[curLocal] && i18n?.[curLocal][val]?.state === 'inherits') {
                setTimeout(() => {
                  if (ref.target) {
                    ref.target.getBody().setAttribute('class', 'mce-content-body mce-content-readonly');
                    ref.target.getBody().setAttribute('contenteditable', false);
                  }
                }, 100);
              }

              if (ref.target) {
                ref.target.on('blur', makeNewData);
              }
            }}
          />
        </InheritanceField>
      </Box>

      {val === 'localizedMarketingName' && isDefault && !checkValue(i18n?.[curLocal]?.localizedMarketingName) && (
        <div className='error-message'>
          {localization.t('general.marketingNameMandatory')}
        </div>
      )}
    </Box>
  );
};

TinyEditor.propTypes = {
  val: PropTypes.string,
  placeholder: PropTypes.string,
  curLocal: PropTypes.string,
  parentId: PropTypes.string,
  data: PropTypes.object,
  setHasLocalizationChanges: PropTypes.func,
  isDefault: PropTypes.bool,
  setDisabledWithMandLocal: PropTypes.func,
  defaultLocale: PropTypes.string,
  reco: PropTypes.bool,
};

export default TinyEditor;
