import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [quantity, setQuantity] = useState();
  const [remaining, setRemaining] = useState();
  const [refresh, setRefresh] = useState(false);

  const requests = async () => {
    const res = await api.getDiscountsUsagesById(discount.id);
    return generateData(res.data);
  };

  const tableData = useTableData(
    currentPage - 1,
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
                  defaultShowColumn={defaultShow}
                  scope={scope}
                  currentPage={currentPage}
                  tableData={tableData}
                  isLoading={isLoading}
                  noActions
                />
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
