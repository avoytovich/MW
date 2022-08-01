import React from 'react';
import PropTypes from 'prop-types';

import {
  Grid,
  CardContent,
  Divider,
  DialogContent,
} from '@mui/material';

import LangItem from './LangItem';
import { SelectCustom } from '../../../Inputs';
import localization from '../../../../localization';
import { getLanguagesOptions } from '../../OptionsFetcher/OptionsFetcher';

const EditValueItem = ({
  setCurDescriptions,
  productDetails,
  curDescription,
}) => {
  const availableLocales = getLanguagesOptions();

  return (
    <DialogContent>
      <CardContent style={{ paddingTop: 0 }}>
        <Grid
          container
          width={1}
          ml={0}
          columnSpacing={2}
          borderBottom={1}
          borderColor='#b9b1b1'
          bgcolor='#ececed'
          borderRadius='4px'
          py={2}
        >
          <Grid item xs={2} borderRight={1} borderColor='#b9b1b1'>{localization.t('labels.language')}</Grid>
          <Grid item xs={10}>{localization.t('labels.displayString')}</Grid>
        </Grid>

        <Grid container width={1} ml={0} spacing={2} py={2}>
          <LangItem
            isDefault
            lang={productDetails?.fallbackLocale}
            type='params'
            curDescription={curDescription}
            setCurDescriptions={setCurDescriptions}
          />

          {curDescription?.localizedValue && Object.keys(curDescription?.localizedValue)
            .filter((l) => l !== (productDetails?.fallbackLocale || 'en-US'))
            .map((l) => (
              <LangItem
                lang={l}
                type='params'
                curDescription={curDescription}
                setCurDescriptions={setCurDescriptions}
              />
            ))}
        </Grid>

        <Divider style={{ marginBottom: '20px' }} />

        <SelectCustom
          label='addLanguage'
          selectOptions={availableLocales
            .filter((l) => curDescription?.localizedValue
              && Object.keys(curDescription?.localizedValue).indexOf(l.id) < 0)}
          onChangeSelect={(e) => {
            setCurDescriptions(() => ({
              ...curDescription,
              localizedValue: {
                ...curDescription?.localizedValue,
                [e.target.value]: '',
              },
            }));
          }}
        />
      </CardContent>
    </DialogContent>
  );
};

EditValueItem.propTypes = {
  setCurDescriptions: PropTypes.func,
  productDetails: PropTypes.object,
  curDescription: PropTypes.object,
};

export default EditValueItem;
