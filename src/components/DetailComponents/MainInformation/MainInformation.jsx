import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { Typography, Box, Zoom } from '@material-ui/core';
import DetailRow from '../DetailRow';
import './MainInformation.scss';

const MainInformation = ({ left, setHasChanges }) => {
  const [editable, setEditable] = useState(false);
  const [hoverBlock, setHoverBlock] = useState(false);
  const handleDeleteAll = () => {};

  return (
    <Box
      pb={5}
      pl={7}
      display="flex"
      flexDirection="column"
      className="mainContainer"
      onMouseOver={() => setHoverBlock(true)}
      onMouseLeave={() => setHoverBlock(false)}
    >
      <Box
        pb={10}
        justifyContent="space-between"
        display="flex"
        flexDirection="row"
        alignItems="flex-end"
      >
        {left?.titles && (
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
        )}
        {left?.main && (
          <Box
            display="flex"
            className="mainRow"
            flexDirection="column"
            flexWrap="nowrap"
          >
            {left.main.map((item) => (
              <DetailRow
                setHasChanges={setHasChanges}
                key={item.id}
                item={item}
                inputType="text"
                editable={editable}
              />
            ))}
          </Box>
        )}
      </Box>
      {left?.other && (
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          pb={5}
          justifyContent="space-between"
        >
          {left.other.map((item) => (
            <DetailRow
              setHasChanges={setHasChanges}
              key={item.id}
              item={item}
              inputType="text"
              editable={editable}
            />
          ))}
        </Box>
      )}
      <Zoom in={hoverBlock}>
        <Box className="actionBlock">
          <EditIcon
            color="primary"
            className="editIcon icons"
            onClick={() => setEditable(true)}
          />
          <DeleteIcon
            color="primary"
            onClick={handleDeleteAll}
            className="deleteIcon icons"
          />
        </Box>
      </Zoom>
    </Box>
  );
};
MainInformation.propTypes = {
  left: PropTypes.object,
  setHasChanges: PropTypes.func,
};

export default MainInformation;
