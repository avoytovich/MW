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
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import PropTypes from 'prop-types';
import localization from '../../../../localization';
import { createKey } from '../utils';
import { SelectWithChip, SelectCustom } from '../../../../components/Inputs';
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
                <TableCell>{localization.t('labels.serviceName')}</TableCell>
                <TableCell className='tableCellWithBorder'>{localization.t('labels.privileges')}</TableCell>
                <TableCell className='tableCellWithBorder'>{localization.t('labels.conditionsOfAvailability')}</TableCell>
                <TableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(curRole.rights).map((right) => (
                curRole.rights[right].map((item, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <TableRow key={`${right}_${index}`}>
                    {index === 0 && (
                    <TableCell component="th" rowSpan={curRole.rights[right].length} scope="row">
                      {right}
                    </TableCell>
                    )}
                    <TableCell className='tableCellWithBorder'>
                      <SelectWithChip
                        value={item.actions}
                        selectOptions={selectOptions.privileges?.[right]}
                        onChangeSelect={(e) => {
                          const newArray = [...curRole.rights[right]];
                          newArray[index].actions = e.target.value;
                          setCurRole({
                            ...curRole,
                            rights: { ...curRole.rights, [right]: newArray },
                          });
                        }}
                        onClickDelIcon={(chip) => {
                          const newArray = [...curRole.rights[right]];
                          const newValue = [...newArray[index].actions].filter(
                            (val) => val !== chip,
                          );
                          newArray[index].actions = newValue;
                          setCurRole({
                            ...curRole,
                            rights: { ...curRole.rights, [right]: newArray },
                          });
                        }}
                      />
                    </TableCell>
                    <TableCell className='tableCellWithBorder'>
                      <SelectWithChip
                        value={item.availabilityConditions}
                        selectOptions={selectOptions.conditionsOfAvailability}
                        onChangeSelect={(e) => {
                          const newArray = [...curRole.rights[right]];
                          newArray[index].availabilityConditions = e.target.value;
                          setCurRole({
                            ...curRole,
                            rights: { ...curRole.rights, [right]: newArray },
                          });
                        }}
                        onClickDelIcon={(chip) => {
                          const newArray = [...curRole.rights[right]];
                          const newValue = [
                            ...newArray[index].availabilityConditions,
                          ].filter((val) => val !== chip);
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
                        <IconButton color='primary' onClick={() => handleRemove(right, index)}>
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
        <SelectCustom
          label='serviceName'
          value={newServiceName}
          selectOptions={selectOptions.serviceNames}
          onChangeSelect={(e) => setNewServiceName(e.target.value)}
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
