import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Typography,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import { FileCopy as FileCopyIcon } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import parentPaths from '../../services/paths';
import JsonEditor from '../../components/JsonEditor';
import { InputCustom } from '../../components/Inputs';
import localization from '../../localization';
import SectionLayout from '../../components/SectionLayout';
import './invoiceTranslationsDetail.scss';

const InvoiceTranslationsView = ({
  cuInvoiceTranslation,
  setCurInvoiceTranslation,
  customerName,
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
              {cuInvoiceTranslation.id
                && (
                  <Box display="flex" p={2}>
                    <Box pr={2}>
                      <Typography>
                        {localization.t('labels.id')}
                      </Typography>
                    </Box>
                    <Box pr={2}>
                      <Typography color='secondary'>{cuInvoiceTranslation.id}</Typography>
                    </Box>
                    <Box>
                      <FileCopyIcon
                        color='secondary'
                        className="copyIcon"
                        onClick={() => handleCopy(cuInvoiceTranslation.id)}
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
                  <Link to={`${parentPaths.customers}/${cuInvoiceTranslation.customerId}`} className='link-to-customer'>
                    <Typography>{customerName}</Typography>
                  </Link>
                </Box>
                <Box>
                  <FileCopyIcon
                    color='secondary'
                    className="copyIcon"
                    onClick={() => handleCopy(cuInvoiceTranslation.customerId)}
                  />
                </Box>
              </Box>

              <Box p={2}>
                <InputCustom
                  label='name'
                  isRequired
                  value={cuInvoiceTranslation.name}
                  onChangeInput={(e) => setCurInvoiceTranslation(
                    { ...cuInvoiceTranslation, name: e.target.value },
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
              currentData={cuInvoiceTranslation}
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
  cuInvoiceTranslation: PropTypes.object,
  setCurInvoiceTranslation: PropTypes.func,
  customerName: PropTypes.string,
};
