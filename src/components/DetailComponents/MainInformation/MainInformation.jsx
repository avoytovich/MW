import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@material-ui/core';
import './MainInformation.scss';

const MainInformation = ({ left }) => (
  <Box
    pb={5}
    pl={7}
    display="flex"
    flexDirection="column"
    className="mainContainer"
  >
    <Box
      pb={10}
      justifyContent="space-between"
      display="flex"
      flexDirection="row"
      alignItems="flex-end"
    >
      <Box
        className="mainRow"
        pb={20}
        pt={7}
        display="flex"
        flexDirection="column"
      >
        {left.titles.map((item) => (
          <Box key={item.id}>
            <Typography variant="h1">{item.value}</Typography>
          </Box>
        ))}
      </Box>
      <Box
        display="flex"
        className="mainRow"
        flexDirection="column"
        flexWrap="nowrap"
      >
        {left.main.map((item) => (
          <Box
            width="100%"
            className={`${item.row}`}
            key={item.id}
            display="flex"
            flexDirection="row"
            flexWrap="nowrap"
          >
            <Box width="40%" pr={2}>
              <Typography color="secondary" variant="body2">
                {item.id}
              </Typography>
            </Box>
            <Box width='60%'>
              <Typography variant="body2">{item.value}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      pb={5}
      justifyContent="space-between"
    >
      {left.other.map((item) => (
        <Box
          width="100%"
          flexWrap="nowrap"
          className={`mainRow ${item.row}`}
          key={item.id}
          display="flex"
          flexDirection="row"
        >
          <Box width="40%" pr={4}>
            <Typography color="secondary" variant="body2">
              {item.id}
            </Typography>
          </Box>
          <Box width="60%">
            <Typography variant="body2">{item.value}</Typography>
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
