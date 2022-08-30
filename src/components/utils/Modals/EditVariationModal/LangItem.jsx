import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Grid,
  IconButton,
} from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';

import { InputCustom } from '../../../Inputs';

const LangItem = ({
  isDefault,
  lang = 'en-US',
  curDescription,
  setCurDescriptions,
  type,
}) => {
  const [labelLangVal, setLabelLangVal] = useState('');

  useEffect(() => {
    // eslint-disable-next-line no-nested-ternary
    setLabelLangVal(curDescription?.localizedValue ? curDescription?.localizedValue[lang] : curDescription?.labels ? curDescription?.labels[lang] : '');
  }, []);

  return (
    <>
      <Grid
        display='flex'
        justifyContent='center'
        xs={2}
        pl={2}
        flexDirection='column'
      >
        <i>{lang}</i>
        {isDefault && <i style={{ fontSize: '10px', color: '#b9b1b1' }}>default locale</i>}
      </Grid>

      <Grid item xs={10} display='flex'>
        <InputCustom
          value={labelLangVal}
          onChangeInput={(e) => setLabelLangVal(e.target.value)}
          onBlur={() => {
            if (type === 'params') {
              setCurDescriptions((c) => ({
                ...c,
                localizedValue: {
                  ...c.localizedValue,
                  [lang]: labelLangVal,
                },
              }));
            } else {
              setCurDescriptions((c) => ({
                ...c,
                labels: {
                  ...c.labels,
                  [lang]: labelLangVal,
                },
              }));
            }
          }}
        />

        {!isDefault && (
          <Box textAlign='center' width='75px' m='auto' height='48px'>
            <IconButton
              color='secondary'
              aria-label='clear'
              size='large'
              onClick={() => {
                if (type === 'params') {
                  setCurDescriptions((c) => {
                    const newLabels = { ...c?.localizedValue };

                    delete newLabels[lang];

                    return { ...c, localizedValue: { ...newLabels } };
                  });
                } else {
                  setCurDescriptions((c) => {
                    const newLabels = { ...c?.labels };

                    delete newLabels[lang];

                    return { ...c, labels: { ...newLabels } };
                  });
                }
              }}
            >
              <ClearIcon />
            </IconButton>
          </Box>
        )}
      </Grid>
    </>
  );
};

LangItem.propTypes = {
  curDescription: PropTypes.object,
  isDefault: PropTypes.bool,
  lang: PropTypes.string,
  setCurDescriptions: PropTypes.func,
  type: PropTypes.string,
};

export default LangItem;
