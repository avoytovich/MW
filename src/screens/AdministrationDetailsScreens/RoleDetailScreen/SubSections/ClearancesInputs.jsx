import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import PropTypes from 'prop-types';
import localization from '../../../../localization';
import { createKey } from '../utils';
import {
  AutocompleteCustom, AutocompleteWithChips,
} from '../../../../components/Inputs';
import './ClearancesInputs.scss';

const ClearancesInputs = ({ selectOptions, curRole, setCurRole }) => {
  const [newServiceName, setNewServiceName] = useState('');
  const handleRemove = (key, index) => {
    const newRights = { ...curRole.rights };
    if (curRole.rights[key].length < 2) {
      delete newRights[key];
    } else {
      newRights[key].splice(index, 1);
    }
    setCurRole({ ...curRole, rights: newRights });
  };

  useEffect(() => {
    if (newServiceName !== '') {
      let newArray = [];
      const newObj = {
        key: createKey(curRole, newServiceName),
        actions: [],
        availabilityConditions: [],
      };
      if (curRole.rights[newServiceName]) {
        newArray = [...curRole.rights[newServiceName], newObj];
      } else {
        newArray = [newObj];
      }
      setCurRole({
        ...curRole,
        rights: { ...curRole.rights, [newServiceName]: newArray },
      });
    }
    return () => setNewServiceName('');
  }, [newServiceName]);

  return (
    <>
      {Object.keys(curRole.rights).length > 0
        && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow style={{ background: '#eee' }}>
                  <TableCell data-test='tableHeader'>{localization.t('labels.serviceName')}</TableCell>
                  <TableCell data-test='tableHeader' className='tableCellWithBorder'>{localization.t('labels.privileges')}</TableCell>
                  <TableCell data-test='tableHeader' className='tableCellWithBorder'>{localization.t('labels.conditionsOfAvailability')}</TableCell>
                  <TableCell align="right" />
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(curRole.rights).map((right) => (
                  curRole.rights[right].map((item, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <TableRow data-test='tableRow' data-index={index} key={`${right}_${index}`}>
                      {index === 0 && (
                        <TableCell data-test='right' component="th" rowSpan={curRole.rights[right].length} scope="row">
                          {right}
                        </TableCell>
                      )}
                      <TableCell className='tableCellWithBorder'>
                        <AutocompleteWithChips
                          data-test='privileges'
                          label='privileges'
                          arrayTypeValue
                          arrayValue={item.actions}
                          selectOptions={selectOptions.privileges?.[right] || []}
                          onChange={(newValue) => {
                            const newArray = [...curRole.rights[right]];
                            newArray[index].actions = newValue;
                            setCurRole({
                              ...curRole,
                              rights: { ...curRole.rights, [right]: newArray },
                            });
                          }}
                        />
                      </TableCell>
                      <TableCell className='tableCellWithBorder'>
                        <AutocompleteWithChips
                          data-test='conditionsOfAvailability'
                          label='conditionsOfAvailability'
                          arrayTypeValue
                          arrayValue={item.availabilityConditions}
                          selectOptions={selectOptions.conditionsOfAvailability || []}
                          onChange={(newValue) => {
                            const newArray = [...curRole.rights[right]];
                            newArray[index].availabilityConditions = newValue;
                            setCurRole({
                              ...curRole,
                              rights: { ...curRole.rights, [right]: newArray },
                            });
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Box>
                          <IconButton
                            color='primary'
                            onClick={() => handleRemove(right, index)}
                            size='large'
                          >
                            <ClearIcon color='secondary' />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      <Box py={3} width='25%'>
        <AutocompleteCustom
          data-test='serviceName'
          optionLabelKey='value'
          label='serviceName'
          onSelect={(newValue) => setNewServiceName(newValue)}
          selectOptions={selectOptions.serviceNames}
          curValue={newServiceName}
        />
      </Box>
    </>
  );
};

ClearancesInputs.propTypes = {
  selectOptions: PropTypes.object,
  curRole: PropTypes.object,
  setCurRole: PropTypes.func,
};

export default ClearancesInputs;
