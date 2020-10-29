import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Zoom, Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { languages, status, theme } from '../../services/selectOptions';
import {
  DetailsInputRow,
  DetailsSelectRow,
  DetailsMultipleSelect,
} from '../DetailComponents/DetailInputs';
import PaymentMethods from '../DetailComponents/PaymentMethods';
import ImagesBlock from '../DetailComponents/ImagesBlock';
import './StoreDetails.scss';

const StoreDetails = ({ data }) => {
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

  const handleDeleteBlock = () => {
    const newData = { ...data };
    Object.keys(newData).forEach((key) => {
      if (
        key === 'status'
        || key === 'hostnames'
        || key === 'defaultLanguage'
        || key === 'enduserPortalTheme'
        || key === 'checkoutTheme'
      ) {
        newData[key].value = '';
      } else if (key === 'salesLanguages') {
        newData[key].value = [];
      }
    });
    setCurrentData({ ...newData });
  };
  const saveDetail = () => {
    setEditable(false);
    setHasChanges(false);
  };
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
        <Box className="detailContainer" display="flex" flexDirection="column">
          <Box>
            <Box display="flex" justify="space-between">
              <Box width="60%" sm={9} className="actionBlockWrapper">
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
                      <Box>
                        <Typography variant="h1">
                          {currentData.customer.value}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      display="flex"
                      className="mainRow"
                      flexDirection="column"
                      flexWrap="nowrap"
                    >
                      <DetailsSelectRow
                        rowType="odd"
                        handleEditDetails={handleEditDetails}
                        options={status}
                        item={currentData.status}
                        editable={editable}
                      />
                      <DetailsInputRow
                        handleEditDetails={handleEditDetails}
                        rowType="odd"
                        item={currentData.hostnames}
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
                    <DetailsSelectRow
                      rowType="even"
                      options={languages}
                      handleEditDetails={handleEditDetails}
                      item={currentData.defaultLanguage}
                      editable={editable}
                    />
                    <DetailsMultipleSelect
                      rowType="even"
                      handleEditDetails={handleEditDetails}
                      options={languages}
                      item={currentData.salesLanguages}
                      editable={editable}
                    />
                    <DetailsSelectRow
                      rowType="odd"
                      options={theme}
                      handleEditDetails={handleEditDetails}
                      item={currentData.enduserPortalTheme}
                      editable={editable}
                    />
                    <DetailsSelectRow
                      options={theme}
                      rowType="odd"
                      handleEditDetails={handleEditDetails}
                      item={currentData.checkoutTheme}
                      editable={editable}
                    />
                  </Box>
                  <Zoom in={hoverBlock && !editable}>
                    <Box className="actionBlock">
                      <EditIcon
                        color="primary"
                        className="editIcon icons"
                        onClick={() => setEditable(true)}
                      />
                    </Box>
                  </Zoom>
                  <Zoom in={editable}>
                    <Box className="actionBlock">
                      <DeleteIcon
                        color="primary"
                        onClick={handleDeleteBlock}
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
                alignSelf="flex-end"
                pl="10%"
                pb="10%"
              >
                <PaymentMethods
                  hasChanges={hasChanges}
                  handleEditDetails={handleEditDetails}
                  setHasChanges={setHasChanges}
                  paymentMethods={currentData?.paymentMethods}
                />
              </Box>
            </Box>
          </Box>
          <Box>
            <ImagesBlock
              hasChanges={hasChanges}
              handleEditDetails={handleEditDetails}
              imagesData={currentData.imagesBlock}
            />
          </Box>
        </Box>
      </>
    )
  );
};
StoreDetails.propTypes = {
  data: PropTypes.object,
};

export default StoreDetails;
