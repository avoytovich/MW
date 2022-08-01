// ToDo: consider making a common layout for such type of settings screens + refactor
import React from 'react';

import PropTypes from 'prop-types';

import {
  Box,
  TextField,
  Typography,
  FormControlLabel,
  Switch,
} from '@mui/material';

import {
  defaultShow,
} from '../../services/useData/tableMarkups/campaignPrices';
import parentPaths from '../../services/paths';
import { InputCustom } from '../../components/Inputs';
import CustomCard from '../../components/utils/CustomCard';
import TableComponent from '../../components/TableComponent';
import DateRangePicker from '../../components/utils/Modals/DateRangePicker';

import localization from '../../localization';

import './campaignDetailsScreen.scss';

const CampaignDetailsView = ({
  curCampaign, updateReco, pricesData, id, handleSelectDate, handleChange, customerName, testing,
}) => {
  const selectionRange = {
    startDate: new Date(curCampaign?.startDate),
    endDate: new Date(curCampaign?.endDate),
    key: 'selection',
  };

  return (
    <>
      <CustomCard title="General" mt={0}>
        <Box display="flex" py={5} pb={2}>
          <Box px={1} width=" 100%">
            <TextField
              fullWidth
              label="Customer"
              name="customerId"
              type="text"
              disabled
              value={customerName || ''}
              variant="outlined"
            />
          </Box>
          <Box px={1} width=" 100%">
            <TextField
              fullWidth
              label="Name"
              name="name"
              type="text"
              value={curCampaign.name}
              onChange={handleChange}
              variant="outlined"
            />
          </Box>
          <Box px={1} width='100%'>
            <InputCustom
              testing={testing}
              data-test='description'
              label='description'
              isMultiline
              value={curCampaign.description}
              onChangeInput={handleChange}
            />
          </Box>
        </Box>

        <Box display="flex" pb={2} flexDirection="column">
          <Typography gutterBottom variant="h5">
            Date range:
          </Typography>
          <Box display="flex" alignItems="baseline">
            {'Between '}
            <DateRangePicker
              values={selectionRange}
              handleChange={handleSelectDate}
            />
          </Box>
        </Box>

        <Box pb={2}>
          <Typography color='secondary'>
            {`${localization.t(
              'labels.status',
            )} *`}
          </Typography>

          <Box display="flex" alignItems="center">
            <FormControlLabel
              control={(
                <Switch
                  color={curCampaign.status === 'ENABLED' ? 'success' : 'primary'}
                  checked={curCampaign.status === 'ENABLED'}
                  name="status"
                />
              )}
              onChange={() => updateReco(
                'status',
                curCampaign.status === 'ENABLED' ? 'DISABLED' : 'ENABLED',
              )}
              label={curCampaign.status === 'ENABLED' ? 'Enabled' : 'Disabled'}
            />
          </Box>
        </Box>
      </CustomCard>

      {id !== 'add' && (
        <CustomCard title="Products Price Table">
          <Box pt={4}>
            <TableComponent
              isAutoHeight
              defaultShowColumn={defaultShow}
              tableData={pricesData}
              isLoading={pricesData === null}
              customPath={`${parentPaths.productlist}/:productId`}
              noActions
            />
          </Box>
        </CustomCard>
      )}
    </>
  );
};
CampaignDetailsView.propTypes = {
  updateReco: PropTypes.func,
  curCampaign: PropTypes.object,
  pricesData: PropTypes.object,
  handleSelectDate: PropTypes.func,
  id: PropTypes.string,
  handleChange: PropTypes.func,
  customerName: PropTypes.string,
  testing: PropTypes.bool,
};

export default CampaignDetailsView;
