import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  Box,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Switch,
  RadioGroup,
  Radio,
} from '@mui/material';
import localization from '../../../localization';
import { SelectCustom } from '../../../components/Inputs';
import { getLanguagesOptions } from '../../../components/utils/OptionsFetcher/OptionsFetcher';
import CustomCard from '../../../components/utils/CustomCard';
import LocalizedContent from '../../../components/utils/LocalizedContent';

const Basic = ({
  curReco,
  updateReco,
  handleChange,
  setCurReco,
  localizedErrors,
  setLocalizedErrors,
}) => {
  const i18nFieldsReco = useSelector(
    ({ tempData }) => tempData.i18nFieldsReco,
  ) || curReco.localizedDesc;

  const availableLocales = getLanguagesOptions();

  useEffect(() => {
    setCurReco({
      ...curReco,
      localizedDesc: i18nFieldsReco,
    });
  }, [i18nFieldsReco]);

  return curReco && (
    <CustomCard mt={0}>
      <Box mx={2} py={1} display='flex' alignItems='center'>
        <Typography variant='h5'>
          {`${localization.t(
            'labels.status',
          )} *`}
        </Typography>

        <Box display='flex' alignItems='center' ml={4}>
          <FormControlLabel
            control={(
              <Switch
                color={curReco.status === 'ENABLED' ? 'success' : 'primary'}
                checked={curReco.status === 'ENABLED'}
                name='status'
              />
            )}
            onChange={() => updateReco(
              'status',
              curReco.status === 'ENABLED' ? 'DISABLED' : 'ENABLED',
            )}
            label={
              curReco.status === 'ENABLED'
                ? localization.t('labels.enabled')
                : localization.t('labels.disabled')
            }
          />
        </Box>
      </Box>

      <Box display='flex' py={5} pb={2}>
        <Box px={1} width=' 100%'>
          <TextField
            required
            fullWidth
            label={localization.t('labels.recommendationName')}
            name='name'
            type='text'
            value={curReco.name}
            onChange={handleChange}
            variant='outlined'
          />
        </Box>
      </Box>

      <Box display='flex'>
        <Box px={1} py={3} width='100%' maxWidth='200px'>
          <TextField
            fullWidth
            label={localization.t('labels.weight')}
            name='weight'
            type='number'
            value={curReco.weight}
            onChange={handleChange}
            InputProps={{ inputProps: { min: 0 } }}
            variant='outlined'
          />
        </Box>

        <Box px={1} width='100%' py={3}>
          <SelectCustom
            label='fallbackLocale'
            onChangeSelect={(e) => setCurReco({ ...curReco, fallbackLocale: e.target.value })}
            selectOptions={availableLocales}
            value={curReco.fallbackLocale || ''}
          />
        </Box>
      </Box>
      <Box display='flex' width='100%' m={2}>
        <Typography gutterBottom variant='h5'>
          {localization.t('labels.recomendationDescription')}
        </Typography>
      </Box>
      <LocalizedContent
        defaultLocale={curReco?.fallbackLocale}
        setLocalizedData={(newValue) => {
          setCurReco((c) => ({
            ...c,
            localizedDesc: newValue,
          }));
        }}
        errors={localizedErrors}
        setErrors={setLocalizedErrors}
        localizedData={curReco.localizedDesc}
      />
      <Box display='flex' m={2} pb={2}>
        <div>
          <Typography gutterBottom variant='h5'>
            {localization.t('labels.type')}
          </Typography>

          <Box>
            <RadioGroup
              row
              aria-label='Type'
              name='Type'
              value={curReco.type}
              onChange={(e) => updateReco('type', e.target.value)}
            >
              <FormControlLabel
                value='CROSS_SELL'
                control={<Radio color='primary' />}
                label={localization.t('labels.crossSell')}
              />
              <FormControlLabel
                value='UP_SELL'
                control={<Radio color='primary' />}
                label={localization.t('labels.upSell')}
              />
              <FormControlLabel
                value='UPGRADE'
                control={<Radio color='primary' />}
                label={localization.t('labels.upgrade')}
              />
            </RadioGroup>
          </Box>
        </div>
      </Box>

      <Box display='flex' m={2} pb={2}>
        <div>
          <Typography gutterBottom variant='h5'>
            Level(s)
          </Typography>

          <Box display='flex' alignItems='center'>
            <FormControlLabel
              control={(
                <Checkbox
                  name='PRODUCT'
                  color='primary'
                  checked={curReco?.levels?.indexOf('PRODUCT') >= 0}
                />
              )}
              onChange={() => updateReco('levels', 'PRODUCT', 'multiple')}
              label={localization.t('labels.product')}
            />

            <FormControlLabel
              control={(
                <Checkbox
                  name='CART'
                  color='primary'
                  checked={curReco?.levels?.indexOf('CART') >= 0}
                />
              )}
              onChange={() => updateReco('levels', 'CART', 'multiple')}
              label={localization.t('labels.cart')}
            />

            <FormControlLabel
              control={(
                <Checkbox
                  name='INTERSTITIAL'
                  color='primary'
                  checked={curReco?.levels?.indexOf('INTERSTITIAL') >= 0}
                />
              )}
              onChange={() => updateReco('levels', 'INTERSTITIAL', 'multiple')}
              label={localization.t('labels.interstitial')}
            />

            <FormControlLabel
              control={(
                <Checkbox
                  name='PURCHASE'
                  disabled
                  color='primary'
                  checked={curReco?.levels?.indexOf('PURCHASE') >= 0}
                />
              )}
              // onClick={updateReco('levels', 'PURCHASE', 'multiple')}
              label={localization.t('labels.purchase')}
            />
          </Box>
        </div>
      </Box>

      <Box display='flex' m={2}>
        <div>
          <Typography gutterBottom variant='h5'>
            {localization.t('labels.sources')}
          </Typography>

          <Box display='flex' alignItems='center'>
            <FormControlLabel
              control={(
                <Checkbox
                  name='MANUAL_RENEWAL'
                  color='primary'
                  checked={curReco?.sources?.indexOf('MANUAL_RENEWAL') >= 0}
                />
              )}
              onChange={() => updateReco('sources', 'MANUAL_RENEWAL', 'empty')}
              label={localization.t('labels.manualRenewal')}
            />

            <FormControlLabel
              control={(
                <Checkbox
                  name='PURCHASE'
                  color='primary'
                  checked={curReco?.sources?.indexOf('PURCHASE') >= 0}
                />
              )}
              onChange={() => updateReco('sources', 'PURCHASE', 'empty')}
              label={localization.t('labels.purchase')}
            />
          </Box>

          <Typography style={{ fontStyle: 'italic' }}>
            {localization.t('general.selectNoSourceMeans')}
          </Typography>
        </div>
      </Box>
    </CustomCard>
  );
};

Basic.propTypes = {
  curReco: PropTypes.object,
  updateReco: PropTypes.func,
  handleChange: PropTypes.func,
  setCurReco: PropTypes.func,
  localizedErrors: PropTypes.object,
  setLocalizedErrors: PropTypes.func,
};

export default Basic;
