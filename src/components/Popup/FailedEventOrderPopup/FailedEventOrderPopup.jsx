import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Dialog, DialogTitle, DialogContent, DialogContentText, Divider, Box, makeStyles } from '@material-ui/core';
import { Error as ErrorIcon, Close as CloseIcon } from '@material-ui/icons';
import TableComponent from '../../TableComponent';

import {
  generateData,
  defaultShow,
} from '../../../services/useData/tableMarkups/orderDetailsEvents';

const FailedEventOrderPopup = ({ eventInfo, orderData }) => {
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState(null);
  const scope = 'orderEvents';

  const handleClickOpen = () => {
    const eventsTableData = generateData(orderData || []);
    setEvents(eventsTableData || []);
    setOpen(true);
  };

  const handleClose = () => {
    setEvents(null);
    setOpen(false);
  };

  const useStyles = makeStyles({
    topScrollPaper: {
      alignItems: 'flex-start',
    },
    topPaperScrollBody: {
      verticalAlign: 'top',
    },
  });

  const classes = useStyles();
  return (
    <div>
      <ErrorIcon 
        color='error' 
        style={{ cursor: 'pointer', marginTop: '5px' }} 
        onClick={(e) => { e.stopPropagation(); handleClickOpen(); }} 
      />
      <Dialog 
        open={open} 
        onClose={handleClose}
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
        PaperProps={{ style: { width: eventInfo && '700px', maxWidth: '700px' } }}
      >
        <DialogTitle disableTypography style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px' }}>
          <div>{orderData?.length ? 'Events' : 'Failure message'}</div>
          <CloseIcon onClick={handleClose} style={{ cursor: 'pointer', fontSize: '18px' }} />
        </DialogTitle>
        <Divider />
        {orderData?.length 
        ? 
          <DialogContent>
            <Box>
              <TableComponent
                defaultShowColumn={defaultShow}
                tableData={events}
                scope={scope}
                noActions
                noTableActionsBar
                noEditDeleteActions
                customPath
                errorHighlight='processingError'
                failedOrderEvent
              />
            </Box>
          </DialogContent>
        :
        <DialogContent>
          <DialogContentText color='inherit' style={{ marginBottom: 0 }}>
            {eventInfo.message}
          </DialogContentText>
        </DialogContent>}
      </Dialog>
    </div>
  );
};

FailedEventOrderPopup.propTypes = {
  eventInfo: PropTypes.object,
  orderData: PropTypes.array,
};

export default FailedEventOrderPopup;
