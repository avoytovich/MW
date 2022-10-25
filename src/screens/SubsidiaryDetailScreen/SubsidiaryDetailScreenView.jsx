import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import FileCopyIcon from '@mui/icons-material/FileCopy';

import {
  Box, Grid, Typography,
} from '@mui/material';
import localization from '../../localization';
import SectionLayout from '../../components/SectionLayout';
import {
  InputCustom, SwitchInput, AutocompleteCustom, NumberInput, SelectWithDeleteIcon,
} from '../../components/Inputs';
import { copyText } from '../../services/helpers/utils';
import { getTimeZones, exemptionPolicyOptions } from './utils';

const SubsidiaryDetailScreenView = ({
  curSubsidiary,
  setCurSubsidiary,
}) => (
  <SectionLayout label='general'>
    <Grid container>
      {curSubsidiary?.id && (
        <>
          <Grid item md={6} sm={6}>
            <Box display="flex" p={2} flexDirection="row" alignItems="baseline">
              <Box width='30%'>
                <Typography variant='h5'>{localization.t('labels.id')}</Typography>
              </Box>
              <Box>
                <Typography>{curSubsidiary.id}</Typography>
              </Box>
              <Box px={2} alignSelf='center'>
                <FileCopyIcon color='secondary' style={{ marginLeft: '5px', cursor: 'pointer' }} onClick={() => copyText(curSubsidiary.id)} />
              </Box>
            </Box>
          </Grid>
          <Grid item md={6} sm={6}>
            <Box display="flex" p={2} flexDirection="row" alignItems="baseline">
              <Box width='30%'>
                <Typography variant='h5'>{localization.t('labels.creationDate')}</Typography>
              </Box>
              <Box>
                <Typography>{moment(curSubsidiary.createDate).format('D MMM YYYY')}</Typography>
              </Box>
            </Box>
          </Grid>
        </>
      )}
      <Grid item md={6} sm={6} alignSelf='center'>
        <Box p={2}>
          <SwitchInput
            data-test='external'
            label='external'
            handleChange={(e) => {
              setCurSubsidiary({
                ...curSubsidiary,
                external: e.target.checked,
              });
            }}
            isChecked={curSubsidiary.external}
          />
        </Box>
      </Grid>
      {curSubsidiary?.id && (
      <Grid item md={6} sm={6}>
        <Box display="flex" p={2} flexDirection="row" alignItems="baseline">
          <Box width='30%'>
            <Typography variant='h5'>{localization.t('labels.updateDate')}</Typography>
          </Box>
          <Box>
            <Typography>{moment(curSubsidiary.updateDate).format('D MMM YYYY')}</Typography>
          </Box>
        </Box>
      </Grid>
      )}
      <Grid item md={6} sm={6}>
        <Box pt={2} px={2}>
          <NumberInput
            helperText={localization.t('errorNotifications.shouldBeUnique')}
            data-test='subsidiaryId'
            label='subsidiaryId'
            value={curSubsidiary.subsidiaryId}
            isRequired
            onChangeInput={(e) => {
              setCurSubsidiary({
                ...curSubsidiary,
                subsidiaryId: e.target.value,
              });
            }}
          />
        </Box>
      </Grid>
      {curSubsidiary?.id && (
      <Grid item md={6} sm={6}>
        <Box p={2}>
          <InputCustom
            data-test='lastUpdateReason'
            label='lastUpdateReason'
            value={curSubsidiary.lastUpdateReason}
            onChangeInput={(e) => {
              setCurSubsidiary({
                ...curSubsidiary,
                lastUpdateReason: e.target.value,
              });
            }}
          />
        </Box>
      </Grid>
      )}
      <Grid item md={6} sm={6}>
        <Box p={2}>
          <InputCustom
            isRequired
            data-test='name'
            label='name'
            value={curSubsidiary.name}
            onChangeInput={(e) => {
              setCurSubsidiary({
                ...curSubsidiary,
                name: e.target.value,
              });
            }}
          />
        </Box>

        <Box p={2}>
          <InputCustom
            isRequired
            data-test='legalName'
            label='legalName'
            value={curSubsidiary.legalName}
            onChangeInput={(e) => {
              setCurSubsidiary({
                ...curSubsidiary,
                legalName: e.target.value,
              });
            }}
          />
        </Box>
      </Grid>
      <Grid item md={6} sm={6}>
        <Box p={2}>
          <InputCustom
            data-test='adress1'
            label='adress1'
            value={curSubsidiary.adress1}
            onChangeInput={(e) => {
              setCurSubsidiary({
                ...curSubsidiary,
                adress1: e.target.value,
              });
            }}
          />
        </Box>
        <Box p={2}>
          <InputCustom
            data-test='adress2'
            label='adress2'
            value={curSubsidiary.adress2}
            onChangeInput={(e) => {
              setCurSubsidiary({
                ...curSubsidiary,
                adress2: e.target.value,
              });
            }}
          />
        </Box>

      </Grid>
      <Grid item md={6} sm={6}>
        <Box p={2}>
          <InputCustom
            data-test='zipCode'
            label='zipCode'
            value={curSubsidiary.zipCode}
            onChangeInput={(e) => {
              setCurSubsidiary({
                ...curSubsidiary,
                zipCode: e.target.value,
              });
            }}
          />
        </Box>
        <Box p={2}>
          <InputCustom
            data-test='city'
            label='city'
            value={curSubsidiary.city}
            onChangeInput={(e) => {
              setCurSubsidiary({
                ...curSubsidiary,
                city: e.target.value,
              });
            }}
          />
        </Box>
      </Grid>
      <Grid item md={6} sm={6}>
        <Box p={2}>
          <InputCustom
            data-test='countryIso2'
            label='countryIso2'
            value={curSubsidiary.countryIso2}
            onChangeInput={(e) => {
              setCurSubsidiary({
                ...curSubsidiary,
                countryIso2: e.target.value.toUpperCase(),
              });
            }}
          />
        </Box>
        <Box p={2}>
          <InputCustom
            data-test='countryIso3'
            label='countryIso3'
            value={curSubsidiary.countryIso3}
            onChangeInput={(e) => {
              setCurSubsidiary({
                ...curSubsidiary,
                countryIso3: e.target.value.toUpperCase(),
              });
            }}
          />
        </Box>
      </Grid>
      <Grid item md={6} sm={6}>
        <Box p={2}>
          <InputCustom
            data-test='informations1'
            label='informations1'
            value={curSubsidiary.informations1}
            onChangeInput={(e) => {
              setCurSubsidiary({
                ...curSubsidiary,
                informations1: e.target.value,
              });
            }}
          />
        </Box>
        <Box p={2}>
          <InputCustom
            data-test='informations2'
            label='informations2'
            value={curSubsidiary.informations2}
            onChangeInput={(e) => {
              setCurSubsidiary({
                ...curSubsidiary,
                informations2: e.target.value,
              });
            }}
          />
        </Box>
        <Box p={2}>
          <AutocompleteCustom
            optionLabelKey='value'
            label='timeZone'
            uniqueOptionValue={((val) => val.value)}
            onSelect={(newValue) => setCurSubsidiary({
              ...curSubsidiary,
              timeZone: newValue,
              utcOffset: moment()?.tz(newValue)?.format('Z') || '',
            })}
            selectOptions={getTimeZones()}
            curValue={curSubsidiary.timeZone}
          />
        </Box>
      </Grid>
      <Grid item md={6} sm={6}>
        <Box p={2}>
          <NumberInput
            data-test='companyCode'
            label='companyCode'
            value={curSubsidiary?.avalaraConfig?.companyCode}
            onChangeInput={(e) => {
              setCurSubsidiary({
                ...curSubsidiary,
                avalaraConfig: {
                  ...curSubsidiary.avalaraConfig,
                  companyCode: e.target.value,
                },
              });
            }}
          />
        </Box>
        <Box p={2}>
          <InputCustom
            data-test='taxCode'
            label='taxCode'
            value={curSubsidiary.avalaraConfig?.taxCode}
            onChangeInput={(e) => {
              setCurSubsidiary({
                ...curSubsidiary,
                avalaraConfig: {
                  ...curSubsidiary.avalaraConfig,
                  taxCode: e.target.value,
                },
              });
            }}
          />
        </Box>
        <Box p={2}>
          <SelectWithDeleteIcon
            name='exemptionPolicy'
            label='exemptionPolicy'
            onClickDelIcon={() => {
              setCurSubsidiary({
                ...curSubsidiary,
                avalaraConfig: {
                  ...curSubsidiary.avalaraConfig,
                  exemptionPolicy: '',
                },
              });
            }}
            value={curSubsidiary.avalaraConfig?.exemptionPolicy}
            selectOptions={exemptionPolicyOptions}
            onChangeSelect={(e) => {
              setCurSubsidiary({
                ...curSubsidiary,
                avalaraConfig: {
                  ...curSubsidiary.avalaraConfig,
                  exemptionPolicy: e.target.value,
                },
              });
            }}
          />
        </Box>
      </Grid>
    </Grid>
  </SectionLayout>
);

SubsidiaryDetailScreenView.propTypes = {
  curSubsidiary: PropTypes.object,
  setCurSubsidiary: PropTypes.func,
};

export default SubsidiaryDetailScreenView;
