import React, { useState } from 'react';
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
}) => {
  const [labelLangVal, setLabelLangVal] = useState(curDescription?.labels ? curDescription?.labels[lang] : '');

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
          onBlur={() => setCurDescriptions((c) => ({
            ...c,
            labels: {
              ...c.labels,
              [lang]: labelLangVal,
            },
          }))}
        />

        {!isDefault && (
          <Box textAlign='center' width='75px' m='auto' height='48px'>
            <IconButton
              color='secondary'
              aria-label='clear'
              size='large'
              onClick={() => {
                setCurDescriptions((c) => {
                  const newLabels = { ...c?.labels };

                  delete newLabels[lang];

                  return { ...c, labels: { ...newLabels } };
                });
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
};

export default LangItem;
