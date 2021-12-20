import React from 'react';
import PropTypes from 'prop-types';
import { Close as CloseIcon } from '@mui/icons-material';

import {
  Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer, Box,
} from '@mui/material';
import { InputCustom, SelectCustom } from '../../../components/Inputs';
import localization from '../../../localization';
import { getLanguagesOptions } from '../../../components/utils/OptionsFetcher/OptionsFetcher';

const Labels = ({
  handleUpdateLabel, labels, handleRemoveLabel, isDisabled,
}) => {
  const languageOptions = getLanguagesOptions();
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{localization.t('labels.locale')}</TableCell>
            <TableCell>{localization.t('labels.translation')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(labels).map((key) => (
            <TableRow key={key}>
              <TableCell component="th" scope="row">
                <SelectCustom
                  usedOptions={labels[key].id !== '' ? [] : Object.keys(labels).map((item) => labels[item])}
                  isDisabled={labels[key].id !== '' || isDisabled}
                  value={labels[key].id}
                  label='language'
                  selectOptions={languageOptions}
                  onChangeSelect={(e) => handleUpdateLabel(key, { id: e.target.value })}
                />
              </TableCell>
              <TableCell align="right">
                <Box display='flex' alignItems='center'>
                  <InputCustom
                    isDisabled={labels[key].id === '' || isDisabled}
                    value={labels[key].translation}
                    onChangeInput={(e) => handleUpdateLabel(key, { translation: e.target.value })}
                  />
                  <Box width='24px' pl={1}>{labels[key].id !== '' && <CloseIcon color='primary' onClick={() => handleRemoveLabel(key)} />}</Box>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

Labels.propTypes = {
  labels: PropTypes.object,
  handleUpdateLabel: PropTypes.func,
  handleRemoveLabel: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export default Labels;
