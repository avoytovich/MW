import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import FileCopyIcon from '@mui/icons-material/FileCopy';

import {
  Box, Grid, Typography,
} from '@mui/material';
import localization from '../../localization';
import SectionLayout from '../../components/SectionLayout';
import {
  InputCustom,
  SwitchInput,
  NumberInput,
  SelectCustom,
} from '../../components/Inputs';
import { copyText } from '../../services/helpers/utils';
import { zipCodeStatusOptions } from '../../services/selectOptions/selectOptions';

const CurrencyDetailScreenView = ({
  curCountry,
  setCurCountry,
}) => (
  <SectionLayout label='general'>
    <Grid container>
      {curCountry?.id && (
        <>
          <Grid item md={6}>
            <Box display="flex" p={2} flexDirection="row" alignItems="baseline">
              <Box width='30%'>
                <Typography variant='h5'>{localization.t('labels.id')}</Typography>
              </Box>
              <Box>
                <Typography>{curCountry.id}</Typography>
              </Box>
              <Box px={2} alignSelf='center'>
                <FileCopyIcon color='secondary' style={{ marginLeft: '5px', cursor: 'pointer' }} onClick={() => copyText(curCountry.id)} />
              </Box>
            </Box>
          </Grid>
          <Grid item md={6}>
            <Box display="flex" p={2} flexDirection="row" alignItems="baseline">
              <Box width='30%'>
                <Typography variant='h5'>{localization.t('labels.creationDate')}</Typography>
              </Box>
              <Box>
                <Typography>{moment(curCountry.createDate).format('D MMM YYYY')}</Typography>
              </Box>
            </Box>

          </Grid>
        </>
      )}
      <Grid item md={6}>
        <Box p={2}>
          <InputCustom
            isRequired
            data-test='name'
            label='name'
            value={curCountry.name}
            onChangeInput={(e) => {
              setCurCountry({
                ...curCountry,
                name: e.target.value,
              });
            }}
          />
        </Box>
        <Box p={2}>
          <InputCustom
            isRequired
            data-test='alpha2Code'
            label='alpha2Code'
            value={curCountry.alpha2Code}
            onChangeInput={(e) => {
              setCurCountry({
                ...curCountry,
                alpha2Code: e.target.value,
              });
            }}
          />
        </Box>
        <Box p={2}>
          <InputCustom
            isRequired
            data-test='alpha3Code'
            label='alpha3Code'
            value={curCountry.alpha3Code}
            onChangeInput={(e) => {
              setCurCountry({
                ...curCountry,
                alpha3Code: e.target.value,
              });
            }}
          />
        </Box>
      </Grid>
      <Grid item md={6}>
        <Box p={2}>
          <NumberInput
            isRequired
            data-test='numericCode'
            minMAx={{ min: 1, max: 10080 }}
            label='numericCode'
            value={curCountry.numericCode}
            onChangeInput={(e) => {
              setCurCountry({
                ...curCountry,
                numericCode: e.target.value
                ,
              });
            }}
          />
        </Box>
        <Box p={2}>
          <SelectCustom
            isRequired
            selectOptions={zipCodeStatusOptions}
            value={curCountry.zipCodeStatus}
            onChangeSelect={(e) => {
              setCurCountry({
                ...curCountry,
                zipCodeStatus: e.target.value,
              });
            }}
            label='zipCodeStatus'
          />
        </Box>
        <Box p={2} display='flex'>
          <Box p={2}>
            <SwitchInput
              data-test='inEEC'
              label='inEEC'
              handleChange={(e) => {
                setCurCountry({
                  ...curCountry,
                  inEEC: e.target.checked,
                });
              }}
              isChecked={curCountry.inEEC}
            />
          </Box>
          <Box p={2}>
            <SwitchInput
              data-test='inEU'
              label='inEU'
              handleChange={(e) => {
                setCurCountry({
                  ...curCountry,
                  inEU: e.target.checked,
                });
              }}
              isChecked={curCountry.inEU}
            />
          </Box>
        </Box>
      </Grid>
      {curCountry?.id && (
        <>
          <Grid item md={6} alignSelf='center'>
            <Box display="flex" p={2} flexDirection="row" alignItems="baseline">
              <Box width='30%'>
                <Typography variant='h5'>{localization.t('labels.updateDate')}</Typography>
              </Box>
              <Box>
                <Typography>{moment(curCountry.updateDate).format('D MMM YYYY')}</Typography>
              </Box>
            </Box>

          </Grid>
          <Grid item md={6}>
            <Box p={2}>
              <InputCustom
                data-test='lastUpdateReason'
                label='lastUpdateReason'
                value={curCountry.lastUpdateReason}
                onChangeInput={(e) => {
                  setCurCountry({
                    ...curCountry,
                    lastUpdateReason: e.target.value,
                  });
                }}
              />
            </Box>

          </Grid>
        </>
      )}
    </Grid>
  </SectionLayout>
);

CurrencyDetailScreenView.propTypes = {
  curCountry: PropTypes.object,
  setCurCountry: PropTypes.func,
};

export default CurrencyDetailScreenView;
