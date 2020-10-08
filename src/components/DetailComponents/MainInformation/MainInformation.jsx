import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@material-ui/core';
import './MainInformation.scss';

const MainInformation = ({ left }) => (
  <Box pl={5} display="flex" flexDirection="column" className="mainContainer">
    <Box pb={2} display="flex" flexDirection="row" alignItems="flex-end">
      <Box className="mainRow" pb={20} display="flex" flexDirection="column">
        {left.titles.map((item) => (
          <Box key={item.id} pt={3}>
            <Typography variant="h4">{item.value}</Typography>
          </Box>
        ))}
      </Box>
      <Box
        display="flex"
        className="mainRow"
        flexDirection="column"
        flexWrap="wrap"
      >
        {left.main.map((item) => (
          <Box
            className={` ${item.row}`}
            key={item.id}
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
          >
            <Box pr={2}>
              <Typography variant="body2">{item.id}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">{item.value}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
    <Box display="flex" flexDirection="row" flexWrap="wrap" pb={5}>
      {left.other.map((item) => (
        <Box
          flexWrap="wrap"
          className={`mainRow ${item.row}`}
          key={item.id}
          display="flex"
          flexDirection="row"
        >
          <Box pr={2}>
            <Typography variant="body2">{item.id}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2">{item.value}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
);

MainInformation.propTypes = {
  left: PropTypes.object,
};

export default MainInformation;
