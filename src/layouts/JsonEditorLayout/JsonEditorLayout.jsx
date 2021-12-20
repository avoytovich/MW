/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Typography, TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import CustomCard from '../../components/utils/CustomCard';
import JsonEditor from '../../components/JsonEditor';
import localization from '../../localization';
import parentPaths from '../../services/paths';
import './jsonEditorLayout.scss';

const JsonEditorLayout = ({
  currentData,
  setCurrentData,
  customer,
  isNew,
  jsonKey,
  jsonIsValid,
  setJsonIsValid,
}) => (
  <div className='json-editor-screen'>
    <CustomCard title='General' mt={0}>
      <Box py={5} pb={2}>
        <Box width="100%" flexWrap="nowrap" display="flex" flexDirection="row">
          <Box width="50%">
            <TextField
              fullWidth
              label={localization.t('labels.name')}
              name="name"
              type="text"
              value={currentData.name}
              onChange={(e) => setCurrentData({ ...currentData, name: e.target.value })}
              variant="outlined"
            />
          </Box>

          <Box display='flex' flexDirection="row" width="50%">
            <Box width="100%" display="flex" flexDirection='column'>
              {currentData.id
                && (
                  <Box display="flex">
                    {!isNew && (
                      <Box pr={4} pt="0" pl={6}>
                        <Typography color="secondary">
                          {localization.t('labels.id')}
                        </Typography>
                      </Box>
                    )}

                    <Box pr={4} pt="0" pl={2}>
                      <Typography>{currentData.id}</Typography>
                    </Box>
                  </Box>
                )}

              <Box display="flex">
                <Box pr={4} pt="7px" pl={6}>
                  <Typography color="secondary">
                    {localization.t('labels.customer')}
                  </Typography>
                </Box>

                <Box pr={4} pt="7px" pl={2}>
                  <Link to={`${parentPaths.customers}/${currentData.customerId}`} className='link-to-customer'>
                    <Typography>{customer}</Typography>
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </CustomCard>
    <JsonEditor
      jsonIsValid={jsonIsValid}
      setJsonIsValid={setJsonIsValid}
      jsonKey={jsonKey}
      currentData={currentData}
      setCurrentData={setCurrentData}
    />
  </div>
);

JsonEditorLayout.propTypes = {
  currentData: PropTypes.object,
  setCurrentData: PropTypes.func,
  isNew: PropTypes.bool,
  customer: PropTypes.string,
  jsonKey: PropTypes.string,
  jsonIsValid: PropTypes.bool,
  setJsonIsValid: PropTypes.func,
};

export default JsonEditorLayout;
