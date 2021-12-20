import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Box, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CodeEditor from '../../../components/CodeEditor';
import { InputCustom } from '../../../components/Inputs';
import { b64DecodeUnicode, b64EncodeUnicode } from '../../../services/helpers/utils';

import localization from '../../../localization';

const LocalizationInputs = ({
  data,
  lang,
  handleChange,
}) => {
  const [curSubj, setCurSubj] = useState('');
  const [curBody, setCurBody] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setCurSubj(data?.templates[lang].subject ? b64DecodeUnicode(data?.templates[lang]?.subject) : '');
    setCurBody(data?.templates[lang].body ? b64DecodeUnicode(data?.templates[lang]?.body) : '');
  }, [lang]);

  useEffect(() => {
    if (!curSubj) {
      setHasChanges(false);
      setHasError(true);
    } else {
      setHasError(false);
      const hasChange = b64DecodeUnicode(data?.templates[lang].subject) !== curSubj
        || b64DecodeUnicode(data?.templates[lang].body) !== curBody;
      setHasChanges(hasChange);
    }
  }, [curBody, curSubj]);

  const onSave = () => {
    handleChange((c) => ({
      ...c,
      templates: {
        ...c.templates,
        [lang]: {
          body: curBody ? b64EncodeUnicode(curBody) : '',
          subject: b64EncodeUnicode(curSubj),
        },
      },
    }));
  };

  return (
    <Box display='flex' width='100%' flexDirection='column' px={4}>
      <Box py={2} pt={4} display='flex'>
        <Box width="50%">
          <InputCustom
            label='subj'
            isRequired
            helperText={localization.t('general.subjectIsMandatory')}
            hasError={hasError}
            value={curSubj}
            onChangeInput={(e) => setCurSubj(e.target.value)}
          />
        </Box>

        <Box display='flex' width="50%" height='55px' justifyContent='flex-end'>
          <Button onClick={onSave} mt='15px'>
            <SaveIcon
              style={{ fontSize: '36px' }}
              color={hasChanges ? 'primary' : 'secondary'}
            />
          </Button>
        </Box>
      </Box>
      <Box display="flex">
        <CodeEditor
          title='body'
          editorName='bodyEditor'
          mode='html'
          onChangeHandler={(newVal) => setCurBody(newVal)}
          value={curBody}
        />
      </Box>
    </Box>
  );
};

LocalizationInputs.propTypes = {
  data: PropTypes.any,
  handleChange: PropTypes.func,
  lang: PropTypes.string,
};

export default LocalizationInputs;
