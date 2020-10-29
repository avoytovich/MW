import React, { useState, useEffect } from 'react';
import { Box, Typography, Zoom, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { DetailsInputRow } from '../DetailComponents/DetailInputs';

import ImagesBlock from '../DetailComponents/ImagesBlock';
import './ProductDetails.scss';

const ProductDetails = ({ data }) => {
  const [hasChanges, setHasChanges] = useState(false);
  const [editable, setEditable] = useState(false);
  const [hoverBlock, setHoverBlock] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const handleEditDetails = (editValue) => {
    setCurrentData({
      ...currentData,
      [editValue.name]: editValue.value,
    });
  };

  useEffect(() => {
    setCurrentData({ ...data });
    return () => setCurrentData(null);
  }, [data]);

  useEffect(() => {
    setHasChanges(JSON.stringify(currentData) !== JSON.stringify(data));
    return () => setHasChanges(false);
  }, [currentData]);

  const handleDeleteAll = () => {};
  const saveDetail = () => {};
  return (
    currentData && (
      <>
        <Zoom in={hasChanges}>
          <Button
            id="save-detail-button"
            color="primary"
            size="large"
            type="submit"
            variant="contained"
            onClick={saveDetail}
          >
            Save
          </Button>
        </Zoom>
        <Box className="detailContainer" display="flex" flexDirection="row">
          <Box>
            <Box display="flex" justify="space-between">
              <Box sm={9} className="actionBlockWrapper">
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
                    <Box
                      className="mainRow"
                      pb={20}
                      pt={7}
                      display="flex"
                      flexDirection="column"
                    >
                      <Box>
                        <Typography variant="h1">
                          {currentData.name.value}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      display="flex"
                      className="mainRow"
                      flexDirection="column"
                      flexWrap="nowrap"
                    >
                      <DetailsInputRow
                        handleEditDetails={handleEditDetails}
                        rowType="odd"
                        item={currentData.type}
                        inputType="text"
                        editable={editable}
                      />
                      <DetailsInputRow
                        handleEditDetails={handleEditDetails}
                        rowType="odd"
                        item={currentData.sellingStores}
                        inputType="text"
                        editable={editable}
                      />
                      <DetailsInputRow
                        handleEditDetails={handleEditDetails}
                        rowType="odd"
                        item={currentData.currency}
                        inputType="text"
                        editable={editable}
                      />
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="row"
                    flexWrap="wrap"
                    pb={5}
                    justifyContent="space-between"
                  >
                    <DetailsInputRow
                      handleEditDetails={handleEditDetails}
                      rowType="odd"
                      item={currentData.updateDate}
                      inputType="text"
                      editable={editable}
                    />
                    <DetailsInputRow
                      handleEditDetails={handleEditDetails}
                      rowType="odd"
                      item={currentData.lifeTime}
                      inputType="text"
                      editable={editable}
                    />
                    <DetailsInputRow
                      handleEditDetails={handleEditDetails}
                      rowType="odd"
                      item={currentData.trialAllowed}
                      inputType="text"
                      editable={editable}
                    />
                  </Box>
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
              </Box>
              <Box
                className="paymentBlock"
                display="flex"
                flexDirection="column"
                flexWrap="wrap"
                justifyContent="space-around"
              >
                <Box
                  onMouseOver={() => setHoverBlock(true)}
                  onMouseLeave={() => setHoverBlock(false)}
                  className="paymentItem actionBlockWrapper"
                  alignSelf="center"
                >
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
                  <Box
                    my={2}
                    display="flex"
                    flexDirection="column"
                    flexWrap="wrap"
                  >
                    <Box p={3}>
                      {currentData.prices.map((price) => (
                        <DetailsInputRow
                          key={price.id}
                          handleEditDetails={handleEditDetails}
                          rowType="odd"
                          item={price}
                          inputType="number"
                          editable={editable}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box>
            <ImagesBlock
              setHasChanges={setHasChanges}
              bottom={data.imagesBlock}
            />
          </Box>
        </Box>
      </>
    )
  );
};
ProductDetails.propTypes = {
  data: PropTypes.object,
};

export default ProductDetails;
