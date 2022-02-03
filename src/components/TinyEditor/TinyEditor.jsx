import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Box, CircularProgress } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';

import contentCss from 'tinymce/skins/content/default/content.min.css';
import contentUiCss from 'tinymce/skins/ui/oxide/content.min.css';

import { setTempProductLocales } from '../../redux/actions/TempData';
import { checkValue } from '../../services/helpers/dataStructuring';
import InheritanceField from '../../screens/ProductDetailsScreen/InheritanceField';

import './tinyEditor.scss';

const tinyApiKey = 'se7x7gpvgb27p864drb8azmziv0pjikrjogirc7hqcsd5fng';

const TinyEditor = ({
  val,
  data,
  curLocal,
  parentId,
  placeholder,
  setHasLocalizationChanges,
}) => {
  const dispatch = useDispatch();
  const [editorLoading, setEditorLoading] = useState(true);
  const [editorRef, setEditorRef] = useState(false);
  const { i18nFields = {} } = useSelector(({ tempData }) => tempData);
  const initValue = i18nFields[curLocal] ? i18nFields[curLocal][val] : '';

  const settleUpdates = (newData) => {
    const hasChanges = JSON.stringify(data) !== JSON.stringify(newData);

    setHasLocalizationChanges(hasChanges);
  };

  const makeNewData = (e) => {
    const curContent = e.target.getContent();
    const correctContent = curContent === '<p></p>' ? undefined : curContent;

    let generatedData = {};

    if (parentId) {
      generatedData = {
        ...data,
        [curLocal]: {
          ...i18nFields[curLocal],
          [val]: {
            ...i18nFields[curLocal][val],
            value: correctContent,
          },
        },
      };
    } else {
      generatedData = {
        ...data,
        [curLocal]: {
          ...i18nFields[curLocal],
          [val]: correctContent,
        },
      };
    }

    dispatch(setTempProductLocales(generatedData));
    settleUpdates(generatedData);
  };

  const makeNewInheritanceData = (inheritanceData) => {
    if (!parentId) return;

    const newData = {
      ...data,
      [curLocal]: { ...inheritanceData },
    };

    dispatch(setTempProductLocales(newData));

    if (inheritanceData[val]?.state === 'inherits') {
      editorRef.target.setContent(inheritanceData[val]?.parentValue || '');
      editorRef.target.getBody().setAttribute('class', 'mce-content-body mce-content-readonly');
      editorRef.target.getBody().setAttribute('contenteditable', false);
    } else {
      editorRef.target.getBody().setAttribute('class', 'mce-content-body');
      editorRef.target.getBody().setAttribute('contenteditable', true);
    }

    settleUpdates(newData);
  };

  return (
    <Box style={{ position: 'relative', height: '56px' }}>
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
          currentProductData={i18nFields[curLocal]}
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
            onBlur={makeNewData}
            onInit={(ref) => {
              setEditorLoading(false);
              setEditorRef(ref);

              if (i18nFields[curLocal][val]?.state === 'inherits') {
                setTimeout(() => {
                  ref.target.getBody().setAttribute('class', 'mce-content-body mce-content-readonly');
                  ref.target.getBody().setAttribute('contenteditable', false);
                }, 100);
              }
            }}
          />
        </InheritanceField>
      </Box>
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
};

export default TinyEditor;
