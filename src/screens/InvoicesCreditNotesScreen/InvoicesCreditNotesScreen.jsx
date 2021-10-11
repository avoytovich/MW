import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Box, Button } from '@material-ui/core';
import { InputCustom, SelectCustom } from '../../components/Inputs';
import SectionHeader from '../../components/SectionHeader';

import api from '../../api/getOneByIdApi';

const InvoicesCreditNotesScreen = () => {
  const [typeOfID, setTypeOfID] = useState('');
  const [id, setId] = useState('');
  const location = useLocation();
  const selectTypeOfIDOptions = [
    { id: 'order', value: 'Order ID' },
    { id: 'invoice', value: 'Invoice ID' },
    { id: 'credit-note', value: 'Credit Note ID' },
  ];

  const downloadFile = () => {
    if (typeOfID === 'order') {
      api.getOrderById(id).then((respons) => {
        const data = respons.data.invoice.id;

        const orderInvoice = () => {
          api.getInvoices(data).then(((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${id}` + '.pdf');
            document.body.appendChild(link);
            link.click();
          }));
        };
        orderInvoice();
      });
    } else if (typeOfID === 'credit-note') {
      api.getCreditNote(id).then(((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${id}` + '.pdf');
        document.body.appendChild(link);
        link.click();
      }));
    } else if (typeOfID === 'invoice') {
      api.getInvoices(id).then(((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${id}` + '.pdf');
        document.body.appendChild(link);
        link.click();
      }));
    }
  };

  return (
    <>
      <SectionHeader pathname={location.pathname} />
      <Box width='250px' pt={2}>
        <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' mb='20px'>
          <Box width='250px'>
            <SelectCustom
              label="invoiceCreditNotesTypeOfId"
              value={typeOfID}
              selectOptions={selectTypeOfIDOptions}
              onChangeSelect={(e) => setTypeOfID(e.target.value)}
            />
          </Box>
        </Box>

        <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
          <Box width='250px'>
            <InputCustom
              label="invoiceCreditNotesId"
              value={id}
              onChangeInput={(e) => setId(e.target.value)}
            />
          </Box>
        </Box>

        <Box display='flex' justifyContent='flex-end' mt={2} height='50px'>
          <Button variant="contained" color="primary" onClick={() => downloadFile()}>Download</Button>
        </Box>
      </Box>
    </>
  );
};

export default InvoicesCreditNotesScreen;
