import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';
import moment from 'moment';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
} from '@material-ui/core';
import TableComponent from '../../../components/TableComponent';
import useTableData from '../../../services/useData/useTableData';
import {
  generateData,
  defaultShow,
  markUp,
} from '../../../services/useData/tableMarkups/generateCodes';
import localization from '../../../localization';
import api from '../../../api';

const CodeGeneration = ({
  discount,
  usedDiscounts,
  prevSaveSingleUseCode,
}) => {
  const scope = 'generateCodes';
  const [isLoading, setLoading] = useState(false);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [quantity, setQuantity] = useState();
  const [remaining, setRemaining] = useState();
  const [refresh, setRefresh] = useState(false);
  const csvLinkUsed = useRef();
  const csvLinkNotUsed = useRef();
  const csvLinkAll = useRef();

  const csvHeaders = markUp?.headers ? [...markUp?.headers].map((header) => ({
    label: header.value,
    key: header.id,
  })) : [];

  const requests = async () => {
    const res = await api.getDiscountsUsagesById(discount.id);
    return generateData(res.data);
  };

  const tableData = useTableData(
    setLoading,
    makeUpdate,
    scope,
    requests,
    refresh,
  );
  const generateCode = async () => {
    api.generateCodes(discount.id, { quantity })
      .then((data) => {
        setRemaining(data.data.remaining);
        setRefresh(!refresh);
      });
  };
  const formateData = (data, usedStatus = null) => {
    let filtered = [...data];
    if (usedStatus !== null) {
      filtered = [...data].filter((val) => val.used === usedStatus);
    }
    const res = filtered.map((item) => {
      const netItem = { ...item };
      if (netItem.createDate) {
        netItem.createDate = moment(netItem.createDate).format('D MMM YYYY');
      }
      if (netItem.updateDate) {
        netItem.updateDate = moment(netItem.updateDate).format('D MMM YYYY');
      }
      return netItem;
    });
    return res;
  };
  return (
    <>
      <Grid item md={4} xs={12}>
        <Box pt={2} pl={2}>
          <Typography>{localization.t('labels.generationCodeLimit')}</Typography>
        </Box>
      </Grid>
      <Grid item md={8} sm={12}>
        <Box p={2}>
          {prevSaveSingleUseCode ? (
            <>
              <Grid container alignItems='center'>
                <Box m={1}>
                  <TextField
                    variant='outlined'
                    size='small'
                    inputProps={{ type: 'number', max: '750' }}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </Box>
                <Box m={1}>
                  <Button
                    color='primary'
                    size='large'
                    variant='contained'
                    onClick={() => generateCode()}
                  >
                    {localization.t('general.generateCodes')}
                  </Button>
                </Box>
                <Box m={1}>
                  {`${localization.t('labels.remainingCodes')} ${remaining || (discount?.maxUsages - usedDiscounts)}`}
                </Box>
              </Grid>
              <Box m={1}>
                <TableComponent
                  customPath='disabled'

                  defaultShowColumn={defaultShow}
                  scope={scope}
                  tableData={tableData}
                  isLoading={isLoading}
                  noActions
                />
                <CSVLink
                  onClick={(!markUp.headers)
                    ? (e) => e.preventDefault() : () => { }}
                  className="CSVLinkBlock"
                  data={tableData?.values ? formateData(tableData?.values, true) : []}
                  headers={csvHeaders}
                  ref={csvLinkUsed}
                  filename="table-export.csv"
                  target="_blank"
                />
                <CSVLink
                  onClick={(!markUp.headers)
                    ? (e) => e.preventDefault() : () => { }}
                  className="CSVLinkBlock"
                  data={tableData?.values ? formateData(tableData?.values, false) : []}
                  headers={csvHeaders}
                  ref={csvLinkNotUsed}
                  filename="table-export.csv"
                  target="_blank"
                />
                <CSVLink
                  onClick={(!markUp.headers)
                    ? (e) => e.preventDefault() : () => { }}
                  className="CSVLinkBlock"
                  data={tableData?.values ? formateData(tableData?.values) : []}
                  headers={csvHeaders}
                  ref={csvLinkAll}
                  filename="table-export.csv"
                  target="_blank"
                />
                <Box display='flex' justifyContent='flex-end' py={2}>
                  <Box p={1}>
                    <Button
                      onClick={() => csvLinkUsed.current.link.click(true)}
                      color='primary'
                      variant='contained'
                    >
                      {localization.t('labels.exportUsed')}
                    </Button>
                  </Box>
                  <Box p={1}>
                    <Button
                      onClick={() => csvLinkNotUsed.current.link.click(false)}
                      color='primary'
                      variant='contained'
                    >
                      {localization.t('labels.exportNotUsed')}
                    </Button>
                  </Box>
                  <Box p={1}>
                    <Button
                      onClick={() => csvLinkAll.current.link.click()}
                      color='primary'
                      variant='contained'
                    >
                      {localization.t('labels.exportAll')}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </>
          ) : (
            <Typography>{localization.t('labels.prevSaveGenerationCode')}</Typography>
          )}
        </Box>
      </Grid>
    </>
  );
};

CodeGeneration.propTypes = {
  discount: PropTypes.object,
  usedDiscounts: PropTypes.number,
  prevSaveSingleUseCode: PropTypes.bool,
};

export default CodeGeneration;
