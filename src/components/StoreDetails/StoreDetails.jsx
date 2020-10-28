import React, { useState } from 'react';
import {
  Box,
  Typography,
  Zoom,
  Button,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import DetailsInputRow from './DetailsInputRow';
import PaymentMethods from '../DetailComponents/PaymentMethods';
import DetailsSelectRow from './DetailsSelectRow';
import ImagesBlock from '../DetailComponents/ImagesBlock';
import './StoreDetails.scss';

const StoreDetails = ({ data }) => {
  const [hasChanges, setHasChanges] = useState(false);
  const [editable, setEditable] = useState(false);
  const [hoverBlock, setHoverBlock] = useState(false);
  const handleDeleteAll = () => {};
  const handleChange = () => {};
  const saveDetail = () => {};
  return (
    data && (
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
              <Box sm={9} item className="actionBlockWrapper">
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
                        <Typography variant="h1">{data.name.value}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="h1">
                          {data.customer.value}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      display="flex"
                      className="mainRow"
                      flexDirection="column"
                      flexWrap="nowrap"
                    >
                      <FormControlLabel
                        control={
                          (
                            <Switch
                              checked={!data.status.value}
                              onChange={handleChange}
                              name={data.status.id}
                              color="primary"
                            />
                          )
                        }
                        label={data.status.id}
                      />
                      <DetailsInputRow
                        rowType="odd"
                        setHasChanges={setHasChanges}
                        item={data.hostnames}
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
                      setHasChanges={setHasChanges}
                      item={data.defaultLanguage}
                      editable={editable}
                    />
                    <DetailsSelectRow
                      rowType="even"
                      setHasChanges={setHasChanges}
                      item={data.salesLanguages}
                      editable={editable}
                    />
                    <DetailsSelectRow
                      rowType="odd"
                      setHasChanges={setHasChanges}
                      item={data.enduserPortalTheme}
                      editable={editable}
                    />
                    <DetailsSelectRow
                      rowType="odd"
                      setHasChanges={setHasChanges}
                      item={data.checkoutTheme}
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
                <PaymentMethods
                  setHasChanges={setHasChanges}
                  paymentMethods={data?.paymentMethods}
                />
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
StoreDetails.propTypes = {
  data: PropTypes.object,
};

export default StoreDetails;
