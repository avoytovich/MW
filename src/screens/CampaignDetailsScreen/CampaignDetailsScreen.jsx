// ToDo: consider making a common layout for such type of settings screens + refactor
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import {
  Box,
  TextField,
  LinearProgress,
  Zoom,
  Button,
  Typography,
  FormControlLabel,
  Switch,
} from '@material-ui/core';

import moment from 'moment';
import { toast } from 'react-toastify';

import {
  generateData,
  defaultShow,
} from '../../services/useData/tableMarkups/campaignPrices';

import api from '../../api';
import CustomCard from '../../components/utils/CustomCard';
import TableComponent from '../../components/TableComponent';
import DateRangePicker from '../../components/utils/Modals/DateRangePicker';
import SelectCustomerNotification from '../../components/utils/SelectCustomerNotification';
import CustomBreadcrumbs from '../../components/utils/CustomBreadcrumbs';
import localization from '../../localization';

import './campaignDetailsScreen.scss';

const CampaignDetailsScreen = () => {
  const history = useHistory();
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [curCampaign, setCurCampaign] = useState(null);
  const [pricesData, setPricesData] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const handleChange = (e) => {
    e.persist();
    const { name, value } = e.target;
    setCurCampaign({ ...curCampaign, [name]: value });
  };

  const saveIdentity = () => {
    if (id === 'add') {
      api.addNewCampaign(curCampaign).then(() => {
        toast(localization.t('general.updatesHaveBeenSaved'));
        history.goBack();
      });
    } else {
      api.updateCampaignById(id, curCampaign).then(() => {
        toast(localization.t('general.updatesHaveBeenSaved'));
        setCampaign(curCampaign);
      });
    }
  };

  useEffect(() => {
    setHasChanges(JSON.stringify(curCampaign) !== JSON.stringify(campaign));

    return () => setHasChanges(false);
  }, [curCampaign, campaign]);

  useEffect(() => {
    if (id !== 'add') {
      api.getCampaignById(id).then(({ data }) => {
        setCampaign(data);
        setCurCampaign(data);
      });

      api.getPricesByCampaignId(id).then(({ data }) => {
        const pricesTableData = generateData(data);
        setPricesData(pricesTableData || []);
      });
    } else {
      const data = {
        startDate: moment().valueOf(),
        endDate: moment().add(1, 'days').valueOf(),
        customerId: nxState?.selectedCustomer?.id,
        name: '',
        status: 'DISABLED',
      };

      setCampaign(data);
      setCurCampaign(data);
    }
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

  if (id === 'add' && !nxState?.selectedCustomer?.id) return <SelectCustomerNotification />;

  if (curCampaign === null) return <LinearProgress />;

  return (
    <div className="campaign-details-screen">
      {id !== 'add' && (
        <CustomBreadcrumbs
          url='/marketing/campaigns'
          section={localization.t('general.campaign')}
          id={campaign?.id ? campaign.id : localization.t('general.addCampaign')}
        />
      )}
      <Box py={2}>
        <Typography gutterBottom variant='h3'>
          {campaign?.customerId}
        </Typography>
      </Box>

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

      {id !== 'add' && (
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
      )}
    </div>
  );
};

export default CampaignDetailsScreen;
