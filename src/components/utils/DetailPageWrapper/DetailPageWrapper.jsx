/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';

import { toast } from 'react-toastify';

import {
  Box, Button, LinearProgress, Tab, Tabs, Typography, Zoom,
} from '@mui/material';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ScrollingTabs from '../ScrollingTabs';
import localization from '../../../localization';
import CustomBreadcrumbs from '../CustomBreadcrumbs';
import LoadingErrorNotification from '../LoadingErrorNotification';
import SelectCustomerNotification from '../SelectCustomerNotification';
import defPath from '../../../services/helpers/routingHelper';
import { copyText } from '../../../services/helpers/utils';

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
  noTabsMargin,
  customSave,
  headerTitleCopy,
  tabs,
  errors,
  parentId,
  sectionRefs,
  setBackToParent,
  selectedSection,
  setSelectedSection,
}) => {
  const location = useLocation();
  const sections = location.pathname.split(`/${defPath}/`)[0].split('/').slice(1);
  const history = useHistory();
  const handleSave = () => {
    if (customSave) {
      customSave();
    } else {
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
    }
  };
  if (isLoading) return <LinearProgress />;
  if (!isLoading && !curData) return <LoadingErrorNotification />;
  if (id === 'add' && !nxState?.selectedCustomer?.id && !nxStateNotNeeded) {
    return <SelectCustomerNotification />;
  }

  const handleChange = (event, newValue) => tabs?.setCurTab(newValue);

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
          ml={2}
          justifyContent='space-between'
          alignItems='center'
        >
          <Box alignSelf='center'>
            <Typography data-test='notificationName' gutterBottom variant='h3' style={{ fontSize: '20px' }} mb={0}>
              {name}
              {headerTitleCopy && (
                <ContentCopyIcon
                  onClick={(e) => { e.stopPropagation(); copyText(headerTitleCopy); }}
                  color="secondary"
                  style={{ marginLeft: '5px', fontSize: '20px' }}
                  className="copyIcon"
                />
              )}
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
        {sectionRefs
          && (
            <ScrollingTabs
              setBackToParent={setBackToParent}
              parentId={parentId}
              sectionRefs={sectionRefs}
              errors={errors}
              selectedSection={selectedSection}
              setSelectedSection={setSelectedSection}
            />
          )}

        {tabs?.tabLabels && (
          <Tabs
            value={tabs?.curTab}
            indicatorColor='primary'
            textColor='primary'
            onChange={handleChange}
            aria-label='disabled tabs example'
          >
            {tabs?.tabLabels.map((tab) => (
              <Tab
                style={errors?.[tab] ? { color: '#ff6341' } : {}}
                key={tab}
                label={localization.t(`labels.${tab}`)}
              />
            ))}
          </Tabs>
        )}
      </Box>
      <Box
        overflow='auto'
        mt={noTabsMargin ? 0 : 2}
        p='2px'
        flexGrow={1}
        display='block'
      >
        {children}
      </Box>
    </>
  );
};
DetailPageWrapper.propTypes = {
  children: PropTypes.node,
  nxState: PropTypes.array,
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
  tabs: PropTypes.object,
  customSave: PropTypes.func,
  headerTitleCopy: PropTypes.any,
  sectionRefs: PropTypes.any,
  setBackToParent: PropTypes.func,
};

export default DetailPageWrapper;
