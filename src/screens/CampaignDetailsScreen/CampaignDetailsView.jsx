// ToDo: consider making a common layout for such type of settings screens + refactor
import React from 'react';

import PropTypes from 'prop-types';

import {
  Box,
  TextField,
  Typography,
  FormControlLabel,
  Switch,
} from '@material-ui/core';

import {
  defaultShow,
} from '../../services/useData/tableMarkups/campaignPrices';
import parentPaths from '../../services/paths';
import { InputCustom } from '../../components/Inputs';
import CustomCard from '../../components/utils/CustomCard';
import TableComponent from '../../components/TableComponent';
import DateRangePicker from '../../components/utils/Modals/DateRangePicker';
import './campaignDetailsScreen.scss';

const CampaignDetailsView = ({
  curCampaign, updateReco, pricesData, id, handleSelectDate, handleChange, customerName,
}) => {
  const selectionRange = {
    startDate: new Date(curCampaign?.startDate),
    endDate: new Date(curCampaign?.endDate),
    key: 'selection',
  };

  return (
    <>
      <CustomCard title="General">
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
          <Typography gutterBottom variant="h5">
            Status
          </Typography>

          <Box display="flex" alignItems="center">
            <FormControlLabel
              control={(
                <Switch
                  color="primary"
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
};

export default CampaignDetailsView;
