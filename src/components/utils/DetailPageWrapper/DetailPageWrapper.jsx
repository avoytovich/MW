/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  LinearProgress,
  Button,
  Zoom,
  Box,
  Typography,
  Tabs,
  Tab,
} from '@mui/material';
import localization from '../../../localization';
import CustomBreadcrumbs from '../CustomBreadcrumbs';
import LoadingErrorNotification from '../LoadingErrorNotification';
import SelectCustomerNotification from '../SelectCustomerNotification';
import defPath from '../../../services/helpers/routingHelper';

const DetailPageWrapper = ({
  nxStateNotNeeded,
  children,
  nxState,
  id,
  name,
  saveIsDisabled,
  hasChanges,
  isLoading,
  curParentPath,
  curData,
  addFunc,
  updateFunc,
  beforeSend,
  setUpdate,
  extraActions,
  extraHeader,
  noTabsMargin,
  tabs,
}) => {
  const location = useLocation();
  const sections = location.pathname.split(`/${defPath}/`)[0].split('/').slice(1);
  const history = useHistory();
  const handleSave = () => {
    const sendObj = beforeSend ? beforeSend(curData) : curData;
    if (id === 'add') {
      addFunc(sendObj).then((res) => {
        const headersLocation = res.headers.location.split('/');
        const newId = headersLocation[headersLocation.length - 1];
        const detailsPath = location.pathname.split('/add')[0];
        toast(localization.t('general.updatesHaveBeenSaved'));
        history.push(`${detailsPath}/${newId}`);
        setUpdate((u) => u + 1);
      });
    } else {
      updateFunc(id, sendObj).then(() => {
        toast(localization.t('general.updatesHaveBeenSaved'));
        setUpdate((u) => u + 1);
      });
    }
  };

  if (isLoading) return <LinearProgress />;
  if (!isLoading && !curData) return <LoadingErrorNotification />;
  if (id === 'add' && !nxState?.selectedCustomer?.id && !nxStateNotNeeded) {
    return <SelectCustomerNotification />;
  }
  return curData && (
    <>
      <Box>
        <Box mx={2}>
          <CustomBreadcrumbs
            sections={sections}
            url={curParentPath}
            id={id === 'add' ? name : id}
          />
        </Box>
        <Box
          display='flex'
          flexDirection='row'
          m={2}
          justifyContent='space-between'
        >
          <Box alignSelf='center'>
            <Typography data-test='notificationName' gutterBottom variant='h3'>
              {name}
            </Typography>
          </Box>

          <Box display='flex'>
            <Zoom in={hasChanges}>
              <Button
                disabled={saveIsDisabled}
                id='save-notification-button'
                color='primary'
                size='large'
                type='submit'
                variant='contained'
                onClick={handleSave}
              >
                {localization.t('general.save')}
              </Button>
            </Zoom>

            {extraActions}
          </Box>
        </Box>

        {extraHeader}

        {tabs?.tabLabels && (
          <Tabs
            value={tabs?.curTab}
            indicatorColor='primary'
            textColor='primary'
            onChange={(event, newValue) => {
              tabs?.setCurTab(newValue);
            }}
            aria-label='disabled tabs example'
          >
            {tabs?.tabLabels.map((tab) => (
              <Tab key={tab} label={localization.t(`labels.${tab}`)} />
            ))}
          </Tabs>
        )}
      </Box>

      <Box overflow='auto' mt={noTabsMargin ? 0 : 4} p='2px' flexGrow={1}>
        {children}
      </Box>
    </>
  );
};
DetailPageWrapper.propTypes = {
  children: PropTypes.node,
  nxState: PropTypes.object,
  id: PropTypes.string,
  saveIsDisabled: PropTypes.bool,
  hasChanges: PropTypes.bool,
  name: PropTypes.string,
  isLoading: PropTypes.bool,
  curParentPath: PropTypes.string,
  curData: PropTypes.object,
  addFunc: PropTypes.func,
  updateFunc: PropTypes.func,
  setUpdate: PropTypes.func,
  beforeSend: PropTypes.func,
  nxStateNotNeeded: PropTypes.bool,
  extraActions: PropTypes.node,
  extraHeader: PropTypes.node,
  tabs: PropTypes.object,
};

export default DetailPageWrapper;
