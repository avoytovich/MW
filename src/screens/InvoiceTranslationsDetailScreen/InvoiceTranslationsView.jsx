import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Typography,
} from '@mui/material';
import { toast } from 'react-toastify';
import { FileCopy as FileCopyIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import parentPaths from '../../services/paths';
import JsonEditor from '../../components/JsonEditor';
import { InputCustom } from '../../components/Inputs';
import localization from '../../localization';
import SectionLayout from '../../components/SectionLayout';
import './invoiceTranslationsDetail.scss';

const InvoiceTranslationsView = ({
  curInvoiceTranslation,
  setCurInvoiceTranslation,
  customerName,
  jsonIsValid,
  setJsonIsValid,
}) => {
  const [curTab, setCurTab] = useState(0);
  const handleCopy = (value) => {
    navigator.clipboard.writeText(value)
      .then(() => toast(localization.t('general.itemHasBeenCopied')));
  };

  return (
    <>
      <Box my={2} bgcolor='#fff'>
        <Tabs
          data-test='tabs'
          value={curTab}
          onChange={(e, newTab) => setCurTab(newTab)}
          indicatorColor='primary'
          textColor='primary'
        >
          <Tab label={localization.t('labels.general')} />
          <Tab label={localization.t('labels.data')} />

        </Tabs>
      </Box>
      {
        curTab === 0 && (
          <SectionLayout label='general'>
            <Box display='flex' flexDirection='column' width='60%'>
              {curInvoiceTranslation.id
                && (
                  <Box display="flex" p={2}>
                    <Box pr={2}>
                      <Typography>
                        {localization.t('labels.id')}
                      </Typography>
                    </Box>
                    <Box pr={2}>
                      <Typography color='secondary'>{curInvoiceTranslation.id}</Typography>
                    </Box>
                    <Box>
                      <FileCopyIcon
                        color='secondary'
                        className="copyIcon"
                        onClick={() => handleCopy(curInvoiceTranslation.id)}
                      />
                    </Box>
                  </Box>
                )}

              <Box display="flex" p={2}>
                <Box pr={2}>
                  <Typography>
                    {localization.t('labels.customer')}
                  </Typography>
                </Box>

                <Box pr={2}>
                  <Link to={`${parentPaths.customers}/${curInvoiceTranslation.customerId}`} className='link-to-customer'>
                    <Typography>{customerName}</Typography>
                  </Link>
                </Box>
                <Box>
                  <FileCopyIcon
                    color='secondary'
                    className="copyIcon"
                    onClick={() => handleCopy(curInvoiceTranslation.customerId)}
                  />
                </Box>
              </Box>

              <Box p={2}>
                <InputCustom
                  label='name'
                  isRequired
                  value={curInvoiceTranslation.name}
                  onChangeInput={(e) => setCurInvoiceTranslation(
                    { ...curInvoiceTranslation, name: e.target.value },
                  )}
                />
              </Box>
            </Box>
          </SectionLayout>
        )
      }
      {
        curTab === 1 && (
          <SectionLayout label='data'>
            <JsonEditor
              jsonIsValid={jsonIsValid}
              setJsonIsValid={setJsonIsValid}
              jsonKey='data'
              currentData={curInvoiceTranslation}
              setCurrentData={setCurInvoiceTranslation}
            />
          </SectionLayout>
        )
      }
    </>
  );
};

export default InvoiceTranslationsView;

InvoiceTranslationsView.propTypes = {
  curInvoiceTranslation: PropTypes.object,
  setCurInvoiceTranslation: PropTypes.func,
  customerName: PropTypes.string,
  jsonIsValid: PropTypes.bool,
  setJsonIsValid: PropTypes.func,
};
