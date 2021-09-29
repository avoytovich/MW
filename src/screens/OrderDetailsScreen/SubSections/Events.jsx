import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Box } from '@material-ui/core';
import TableComponent from '../../../components/TableComponent';

import {
  generateData,
  defaultShow,
} from '../../../services/useData/tableMarkups/orderDetailsEvents';

const Events = ({ orderData }) => {
  const [events, setEvents] = useState(null);
  const scope = 'orderEvents';

  useEffect(() => {
    const eventsTableData = generateData(orderData?.processingEvent || []);
    setEvents(eventsTableData || []);

    return () => setEvents(null);
  }, []);
  return (
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
      />
    </Box>
  );
};

Events.propTypes = {
  orderData: PropTypes.object,
};

export default Events;
