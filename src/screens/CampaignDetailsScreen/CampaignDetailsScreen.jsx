// ToDo: consider making a common layout for such type of settings screens + refactor
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  Box,
  TextField,
  LinearProgress,
  Zoom,
  Button,
  Tabs,
  Tab,
  Typography,
  FormControlLabel,
  Switch,
} from '@material-ui/core';

import moment from 'moment';

import {
  generateData,
  defaultShow,
} from '../../services/useData/tableMarkups/campaignPrices';

import api from '../../api';
import { showNotification } from '../../redux/actions/HttpNotifications';
import CustomCard from '../../components/utils/CustomCard';
import TableComponent from '../../components/TableComponent';
import DateRangePicker from '../../components/utils/Modals/DateRangePicker';
import localization from '../../localization';

import './campaignDetailsScreen.scss';

const CampaignDetailsScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [curCampaign, setCurCampaign] = useState(null);
  const [pricesData, setPricesData] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (e) => {
    e.persist();
    const { name, value } = e.target;
    setCurCampaign({ ...curCampaign, [name]: value });
  };

  const saveIdentity = () => {
    api.updateCampaignById(id, curCampaign).then(() => {
      dispatch(
        showNotification(localization.t('general.updatesHaveBeenSaved')),
      );
      setCampaign(curCampaign);
    });
  };

  useEffect(() => {
    setHasChanges(JSON.stringify(curCampaign) !== JSON.stringify(campaign));

    return () => setHasChanges(false);
  }, [curCampaign, campaign]);

  useEffect(() => {
    api.getCampaignById(id).then(({ data }) => {
      setCampaign(data);
      setCurCampaign(data);
    });

    api.getPricesByCampaignId(id).then(({ data }) => {
      const pricesTableData = generateData(data);
      setPricesData(pricesTableData || []);
    });
  }, []);

  const updateReco = (type, value) => setCurCampaign((c) => ({ ...c, [type]: value }));

  const handleSelectDate = (ranges) => {
    const { startDate, endDate } = ranges;
    setCurCampaign((c) => ({
      ...c,
      startDate: moment(startDate).valueOf(),
      endDate: moment(endDate).valueOf(),
    }));
  };

  const selectionRange = {
    startDate: new Date(curCampaign?.startDate),
    endDate: new Date(curCampaign?.endDate),
    key: 'selection',
  };

  if (curCampaign === null) return <LinearProgress />;

  return (
    <div className="campaign-details-screen">
      <Tabs value={0} indicatorColor="primary" textColor="primary">
        <Tab label={campaign.name} />
      </Tabs>

      <Zoom in={hasChanges}>
        <Button
          id="save-campaign-button"
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          onClick={saveIdentity}
        >
          Save
        </Button>
      </Zoom>

      <CustomCard title="General">
        <Box display="flex" py={5} pb={2}>
          <Box px={1} width=" 100%">
            <TextField
              fullWidth
              label="Customer"
              name="customerId"
              type="text"
              disabled
              value={curCampaign.customerId}
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

      <CustomCard title="Products Price Table">
        <Box pt={4}>
          <TableComponent
            showColumn={defaultShow}
            tableData={pricesData}
            isLoading={pricesData === null}
            customPath="/overview/products/:productId"
            noActions
          />
        </Box>
      </CustomCard>
    </div>
  );
};

export default CampaignDetailsScreen;
