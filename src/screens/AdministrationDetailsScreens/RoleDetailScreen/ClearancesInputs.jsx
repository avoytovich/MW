import React, { useState, useEffect } from 'react';
import { Box, Grid, IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import PropTypes from 'prop-types';

import { createKey } from './utils';
import { SelectWithChip, SelectCustom } from '../../../components/Inputs';

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
      {Object.keys(curRole.rights).map((right) => (
        <Grid container key={right}>
          <Grid item md={4}>
            {right}
          </Grid>
          <Grid item md={8}>
            {curRole.rights[right].map((item, index) => (
              <Box display='flex' width={1} key={item.key} flexDirection='row'>
                <Box width={1}>
                  <SelectWithChip
                    label='privileges'
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
                </Box>
                <Box width={1}>
                  <SelectWithChip
                    label='conditionsOfAvailabilty'
                    value={item.availabilityConditions}
                    selectOptions={selectOptions.conditionsOfAvailabilty}
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
                </Box>
                <Box>
                  <IconButton
                    color='primary'
                    onClick={() => handleRemove(right, index)}
                  >
                    <ClearIcon color='secondary' />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Grid>
        </Grid>
      ))}
      <SelectCustom
        label='serviceName'
        value={newServiceName}
        selectOptions={selectOptions.serviceNames}
        onChangeSelect={(e) => setNewServiceName(e.target.value)}
      />
    </>
  );
};

ClearancesInputs.propTypes = {
  selectOptions: PropTypes.object,
  curRole: PropTypes.object,
  setCurRole: PropTypes.func,
};

export default ClearancesInputs;
