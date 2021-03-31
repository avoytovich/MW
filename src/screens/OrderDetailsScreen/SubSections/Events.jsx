import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Box } from '@material-ui/core';

import {
  generateData,
  defaultShow,
} from '../../../services/useData/tableMarkups/orderDetailsEvents';

import OrderDetailsTableComponent from '../../../components/TableComponent/OrderDetailsTableComponent';

import CustomCard from '../../../components/utils/CustomCard';

const Events = ({ orderData }) => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    const eventsTableData = generateData(orderData?.processingEvent || []);
    setEvents(eventsTableData || []);

    return () => setEvents(null);
  }, []);

  return (
    <CustomCard title="Events" noDivider>
      <Box
        border={1}
        borderRadius="borderRadius"
        borderColor="#c7c7c7"
      >
        <OrderDetailsTableComponent
          showColumn={defaultShow}
          tableData={events}
          isLoading={events === null}
          customPath='disabled'
          errorHighlight='statusError'
          noActions
        />
      </Box>
    </CustomCard>
  );
};

Events.propTypes = {
  orderData: PropTypes.object,
};

export default Events;
